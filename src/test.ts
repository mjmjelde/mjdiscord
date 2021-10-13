import * as echarts from "echarts";
import { writeFileSync } from "fs";
import { JSDOM } from 'jsdom';
import sharp from "sharp";
import FinnhubClient from "./lib/stocks/finnhub";
import { formatAMPM, get24HoursAgoTimestamp } from "./util/time";

const upColor = '#00da3c';
const downColor = '#ec0000';

function generateOptions(title: string, dates: string[], data: number[][]) {
  return {
    animation: false,
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
}

const defaultOpts = {
  devicePixelRatio: 1,
  renderer: 'svg',
  width: 600,
  height: 480
};

function wrapperDocument(document) {
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

async function renderSvg(echartOption, opts, svgOptions): Promise<string> {
  const initOption = {...defaultOpts, ...opts};
  const {width, height} = initOption;
  const oldDocument = global.document;

  try {
      const {window} = new JSDOM('<!DOCTYPE html><html><body></body></html>');
      const document = wrapperDocument(window.document);
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

async function test() {
  const client = FinnhubClient;
  const symbols = await client.crypto.symbols('binance');
  symbols.forEach(async symbol => {
    if (symbol.displaySymbol == 'BTC/USDT') {
      const candle = await client.crypto.candles(symbol, get24HoursAgoTimestamp(), new Date().getTime(), 15);

      let dates = [];
      let data = [];
      for (var i = 0; i < candle.t.length; i++) {
        dates.push(formatAMPM(new Date(candle.t[i] * 1000)));
        data.push([candle.o[i], candle.c[i], candle.l[i], candle.h[i]]);
      }

      const svg = await renderSvg(generateOptions(symbol.description, dates, data), {}, {});
      await sharp(Buffer.from(svg)).jpeg().toFile(`${symbol.displaySymbol.replace('/', '-')}.jpg`);
      writeFileSync(`${symbol.displaySymbol.replace('/', '-')}.svg`, svg, 'utf-8');
    }
  });
  // exit();
}

test()