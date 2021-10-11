import { Page } from "puppeteer";
import browser from "./browser";
import { AbstractService } from "./abstract_service";
import { JSDOM } from "jsdom";
import * as echarts from "echarts";

const globalAny:any = global;

export class EChartService {

  private defaultOpts = {
    devicePixelRatio: 1,
    renderer: 'svg',
    width: 1920,
    height: 1080
  };
  
  private wrapperDocument(document) {
    const oldCreateElement = document.createElement;
    document.createElement = function createElement(name, ...args) {
        if (name === 'canvas') {
            return {
                getContext() {
                    return {
                        measureText(text) {
                            const fontSize = parseInt(this.font.match(/\b(\d+)px\b/) ? RegExp.$1 : '12', 10);
                            let width = 0;
                            for (let i = 0, l = text.length; i < l; i++) {
                                width += fontSize;
                                if (text.charCodeAt(i) > 0x7f) {
                                    width += fontSize;
                                }
                            }
                            return {width};
                        }
                    };
                }
            };
        }
        return oldCreateElement.call(document, name, ...args);
    };
  
    return document;
  }

  public async renderSvg(echartOption, opts, svgOptions): Promise<string> {
    const initOption = {...this.defaultOpts, ...opts};
    const {width, height} = initOption;
    const oldDocument = global.document;
  
    try {
        const {window} = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        const document = this.wrapperDocument(window.document);
        document.body.insertAdjacentHTML(
            'beforeEnd', `<div id="chart" style="width: ${width}px; height: ${height}px"></div>`
        );
  
        const chartDom = document.body.lastElementChild;
        document.clientWidth = width;
        document.clientHeight = height;
  
        global.document = document;
  
        const svgText = await new Promise<string>((resolve, reject) => {
            const chart = echarts.init(chartDom, null, initOption);
            chart.on('finished', () => {
                if (!chartDom.firstElementChild || !chartDom.firstElementChild.firstElementChild) {
                    reject(new Error('no echarts rendered dom!'));
                    return;
                }
                const svgDom = chartDom.firstElementChild.firstElementChild;
                svgDom.style = `width: ${width}px;height:${height}px;font-size:${svgOptions.fontSize}`;
                resolve(svgDom.outerHTML);
            });
            chart.on('error', e => reject(e));
            chart.setOption(echartOption);
        });
  
        return svgText;
    }
    finally {
        if (null == oldDocument) {
            global.document = null;
        }
        else {
            global.document = oldDocument;
        }
    }
  }

  public async renderCandlestickChart(title: string, dates: string[], data: number[][]) {
    const option = {
      animation: false,
      backgroundColor: "rgb(255, 255, 255)",
      title: {
        text: title,
        left: 'center'
      },
      xAxis: {
        data: dates
      },
      yAxis: {
        scale: true
      },
      series: [
        {
          type: 'candlestick',
          data: data,
          itemStyle: {
            color:  "rgba(0,218,60, 0.3)",
            color0: "rgba(236,0,0,0.3)",
            borderColor:  "rgb(0,218,60)",
            borderColor0: "rgb(236,0,0)",
            borderWidth: 1
          },
        }
      ]
    };

    return this.renderSvg(option, {}, {});
  }
}

const echartService = new EChartService();
export {echartService};

export class GoogleChartService {
  private page: Page;
  private RENDER_TIMEOUT_MS = 5000;

  constructor() {
    this.init();
  }

  async init() {
    this.page = await browser.getPage();
  }

  public async getCandlestickChart(data: any): Promise<Buffer> {
    const t = `function drawChart() {
        var data = google.visualization.arrayToDataTable(${JSON.stringify(data)}, true);
        var options = {
            legend: 'none',
            bar: { groupWidth: '100%' }, // Remove space between bars.
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714', stroke: 'black' }, // red
                risingColor: { strokeWidth: 0, fill: '#0f9d58', stroke: 'black' }   // green
            },
            colors: ['black']
  
        };
        var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'))
        chart.draw(data, options);
    }`

    return await this.renderChart(t, {
        width: 1920,
        height: 1080
    });
}

  public async renderChart(contentRaw: string, optsRaw?: any): Promise<Buffer> {
    let content = contentRaw;

    let opts = Object.assign(
      {
        packages: ['corechart'],
        mapsApiKey: '',
        width: '100%',
        height: '100%',
      },
      optsRaw || {},
    );

    this.page.setDefaultTimeout(this.RENDER_TIMEOUT_MS);

    this.page.on('pageerror', function(err) {
      console.log('Page error: ' + err.toString());
    });

    const renderCode = this.getRenderCode(content, opts);
    await this.page.setContent(renderCode);

    const imageBase64 = await this.page.evaluate(() => {
      let w = window as any;
      if (!w.chart || typeof w.chart.getImageURI === 'undefined') {
        return null;
      }
      return w.chart.getImageURI();
    });

    let buf;
    if (imageBase64) {
      // Exported the chart via Google Charts API.
      buf = Buffer.from(imageBase64.slice('data:image/png;base64,'.length), 'base64');
    } else {
      const elt = await this.page.$('#chart_div');
      // Chart doesn't support export, take a screenshot
      buf = await elt.screenshot();
    }

    return buf;
  }

  private getRenderCode(content: string, opts: any) {
    const packages = opts.packages.map(p => {
      return `'${p}',`;
    });
    return `
    <div id="chart_div" style="width: ${opts.width}; height: ${opts.height};"></div>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      const container = document.getElementById('chart_div');
      google.charts.load('current', {
        packages:[${packages}],
        mapsApiKey: '${opts.mapsApiKey}',
      });
      google.charts.setOnLoadCallback(getDrawChart());
  
      function getDrawChart() {
        const drawChartFn = function(window, document) {
          ${content}
          if (typeof drawChart === 'function') {
            drawChart();
          }
          if (typeof chart !== 'undefined') {
            return chart;
          }
        }
        return function() {
          window.chart = drawChartFn({}, {
            getElementById: () => { return container; },
          });
        }
      }
    </script>
    `;
  }
}

const GoogleChart = new GoogleChartService();
export default GoogleChart;