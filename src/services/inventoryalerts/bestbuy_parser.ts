import { Page } from "puppeteer";
import browser from "../browser";
import { InventoryItem } from "../types/inventoryalerts/inventoryitem";
import { InventoryParser } from "../types/inventoryalerts/inventoryparser";

export class BestbuyParser extends InventoryParser {

  validURL(url: string): boolean {
    return url.startsWith("https://www.bestbuy.com/site/searchpage.jsp");
  }

  async getItems(url: string): Promise<InventoryItem[]> {
    const page = await browser.getPage();
    await page.goto(url, {timeout: 0});
    const items = await page.$$eval<InventoryItem[]>('.sku-item', (items) => {
      let ret: InventoryItem[] = [];
      items.forEach(item => {
        if ((item.querySelector("button.add-to-cart-button") as HTMLButtonElement).innerText.toLowerCase().trim() != "sold out") {
          ret.push({
            name: (item.querySelector('.sku-title') as HTMLDivElement).innerText,
            url: item.querySelectorAll('a')[1].href,
            picture: (item.querySelector('.image-link') as HTMLAnchorElement).href
          })
        }
      });
      return ret;
    });
    await page.close();
    return items;
  }

}