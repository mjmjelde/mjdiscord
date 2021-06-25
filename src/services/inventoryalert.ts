import EventEmitter = require("events");
import { BestbuyParser } from "./inventoryalerts/bestbuy_parser";
import { NeweggParser } from "./inventoryalerts/newegg_parser";
import { InventoryAlertEvents } from "./types/inventoryalerts/inventoryevents";
import { InventoryItem } from "./types/inventoryalerts/inventoryitem";
import { InventoryParser } from "./types/inventoryalerts/inventoryparser";
import { isEqual } from "underscore";

export declare interface InventoryAlerts {
  on<U extends keyof InventoryAlertEvents>(
    event: U, listener: InventoryAlertEvents[U]
  ): this;

  emit<U extends keyof InventoryAlertEvents>(
    event: U, ...args: Parameters<InventoryAlertEvents[U]>
  ): boolean;
}

export class InventoryAlerts extends EventEmitter {
  private lastInventory: InventoryItem[] = [];
  private pages: string[] = [];
  private parsers: InventoryParser[] = [
    new NeweggParser(),
    new BestbuyParser()
  ]

  constructor() {
    super();
    setInterval(this.run.bind(this), 5 * 60 * 1000);
  }

  public monitorPage(url: string) {
    this.pages.push(url);
  }

  public forceRun() {
    this.run();
  }

  private async run() {
    const tmpItems: InventoryItem[] = [];
    for (const url of this.pages) {
      for (const parser of this.parsers) {
        if (parser.validURL(url)) {
          const items = await parser.getItems(url);
          if (items.length > 0) {
            tmpItems.push(...items);
          }
        }
      }
    }

    const newItems: InventoryItem[] = [];

    for (const item of tmpItems) {
      if (!this.inInventoryList(this.lastInventory, item)) {
        newItems.push(item);
      }
    }

    for (const item of newItems) {
      this.emit("item", item);
    }

    this.lastInventory = tmpItems;
  }

  private inInventoryList(itemList: InventoryItem[], item: InventoryItem): boolean {
    let inList = false;
    for(let i of itemList) {
      if (isEqual(i, item)) {
        inList = true;
      }
    }
    return inList;
  }
}