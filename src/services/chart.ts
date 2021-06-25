import { Page } from "puppeteer";
import browser from "./browser";

const globalAny:any = global;

export class GoogleChartService {
  private page: Page;
  private RENDER_TIMEOUT_MS = 5000;

  constructor() {
    this.init();
  }

  async init() {
    this.page = await browser.getPage();
  }

  public async renderChart(contentRaw: string, optsRaw?: any) {
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