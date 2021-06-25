import { Page } from "puppeteer";
import { InventoryItem } from "./inventoryitem";

export abstract class InventoryParser {
  abstract validURL(url: string): boolean;
  abstract getItems(url: string): Promise<InventoryItem[]>;
}