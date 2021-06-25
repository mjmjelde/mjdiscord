import browser from "./services/browser";
import { InventoryAlerts } from "./services/inventoryalert";
import log from "./util/logger";
import { sleep } from "./util/time";

async function test() {
  const b = browser;
  const page = await b.getPage();
  // await sleep(20000);
  await page.goto("https://www.newegg.com/p/pl?N=100007709%208000", {timeout: 0});
  const items = await page.$$eval('.item-cell', (items) => {
    let ret = [];
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
  console.log(items);
}

const ia = new InventoryAlerts()
ia.monitorPage("https://www.newegg.com/p/pl?N=100007709%208000");
ia.on('item', item => {
  log.info(`Item in stock: ${item.name}`);
});
ia.forceRun();

process.on('exit', () => {
  browser.close();
})