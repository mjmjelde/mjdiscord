import * as puppeteer from 'puppeteer';

import { getRenderCode } from './helpers';

const RENDER_TIMEOUT_MS = 5000;

declare var window: any;

export async function renderGoogleChart(contentRaw: string, optsRaw) {
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

  const browser = await puppeteer.launch({
      args: [
        // Required for Docker version of Puppeteer
        '--no-sandbox',
        '--disable-setuid-sandbox',
        // This will write shared memory files into /tmp instead of /dev/shm,
        // because Docker’s default for /dev/shm is 64MB
        '--disable-dev-shm-usage'
      ]
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(RENDER_TIMEOUT_MS);

  page.on('pageerror', function(err) {
    console.log('Page error: ' + err.toString());
  });

  const renderCode = getRenderCode(content, opts);
  await page.setContent(renderCode);

  const imageBase64 = await page.evaluate(() => {
    if (!window.chart || typeof window.chart.getImageURI === 'undefined') {
      return null;
    }
    return window.chart.getImageURI();
  });

  let buf;
  if (imageBase64) {
    // Exported the chart via Google Charts API.
    buf = Buffer.from(imageBase64.slice('data:image/png;base64,'.length), 'base64');
  } else {
    const elt = await page.$('#chart_div');
    // Chart doesn't support export, take a screenshot
    buf = await elt.screenshot();
  }

  await browser.close();

  return buf;
}
