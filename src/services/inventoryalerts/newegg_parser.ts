import { Page } from "puppeteer";
import log from "../../util/logger";
import browser from "../browser";
import { InventoryItem } from "../types/inventoryalerts/inventoryitem";
import { InventoryParser } from "../types/inventoryalerts/inventoryparser";

export class NeweggParser extends InventoryParser {

  validURL(url: string): boolean {
    return url.startsWith("https://www.newegg.com/p/pl");
  }

  async getItems(url: string): Promise<InventoryItem[]> {
    const page = await browser.getPage();
    await page.goto(url, {timeout: 0});
    const items = await page.$$eval<InventoryItem[]>('.item-cell', (items) => {
      let ret: InventoryItem[] = [];
      items.forEach(item => {
        if ((item.querySelector('.item-promo') == null) || (item.querySelector(".item-promo") as HTMLParagraphElement).innerText.toLowerCase().trim() != "out of stock") {
          ret.push({
            name: (item.querySelector('.item-title') as HTMLAnchorElement).innerHTML,
            url: (item.querySelector('.item-title') as HTMLAnchorElement).href,
            picture: (item.querySelector('.item-img > img') as HTMLImageElement).src
          })
        }
      });
      return ret;
    });
    await page.close();
    return items;
  }

}