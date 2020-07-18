import { resolve } from "path";

export function delay(ms: number): Promise<undefined> {
  return new Promise(resolve => setTimeout(resolve, ms));
}