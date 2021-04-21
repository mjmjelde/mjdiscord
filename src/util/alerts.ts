import EventEmitter = require("node:events");
import { readFileSync, Stats, watchFile, writeFileSync } from "node:fs";
import { SocketQuote } from "../lib/stocks/types/quote";

export interface StockAlertInfo {
  discord: {
    user: string;
    channel: string;
  }
  type: 'lt'|'gt';
  stock: string;
  price: number;
}

export interface StockAlertMonitorEvents {
  'alert': (alert: StockAlertInfo, lastQuote: SocketQuote) => void;
}

export declare interface StockAlertMonitor {
  on<U extends keyof StockAlertMonitorEvents>(
    event: U, listener: StockAlertMonitorEvents[U]
  ): this;

  emit<U extends keyof StockAlertMonitorEvents>(
    event: U, ...args: Parameters<StockAlertMonitorEvents[U]>
  ): boolean;
}

export class StockAlertMonitor extends EventEmitter {
  private file: string;
  private alerts: StockAlertInfo[];

  constructor(file: string) {
    super();
    this.alerts = JSON.parse(readFileSync(this.file, 'utf-8'));
  }

  private saveAlerts() {
    writeFileSync(this.file, JSON.stringify(this.alerts));
  }

  public getAlerts(userId: string): StockAlertInfo[] {
    return this.alerts.filter(a => a.discord.user == userId);
  }

  public removeAlert(alert: StockAlertInfo) {

  }
}