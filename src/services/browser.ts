import { PuppeteerBlocker } from "@cliqz/adblocker-puppeteer";
import { Browser, launch, Page } from "puppeteer";
import fetch from 'cross-fetch';

export class ChromeBrowser {
  private browser: Browser = undefined;
  constructor() {
    launch({
      args: [
        // Required for Docker version of Puppeteer
        '--no-sandbox',
        '--disable-setuid-sandbox',
        // This will write shared memory files into /tmp instead of /dev/shm,
        // because Docker’s default for /dev/shm is 64MB
        '--disable-dev-shm-usage'
      ],
      headless: false,
    }).then(b => {
      this.browser = b;
    });
  }

  async getPage(): Promise<Page> {
    while (this.browser == null) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    const page = await this.browser.newPage();
    PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
      blocker.enableBlockingInPage(page);
    });
    return page;
  }

  async close() {
    this.browser.close();
  }
}

const browser = new ChromeBrowser();
export default browser;