import { InventoryItem } from "./inventoryitem";

export interface InventoryAlertEvents {
  'item': (item: InventoryItem) => void;
}