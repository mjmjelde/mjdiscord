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
