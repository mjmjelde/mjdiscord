import { EventEmitter } from "stream";
import { ExchangeCandle, ExchangeEvents, ExchangeInterval, ExchangeSymbol, SymbolPrice } from "./types/exchange_types";

export declare interface CryptoExchange {
  on<U extends keyof ExchangeEvents>(
    event: U, listener: ExchangeEvents[U]
  ): this;

  emit<U extends keyof ExchangeEvents>(
    event: U, ...args: Parameters<ExchangeEvents[U]>
  ): boolean;
}

export abstract class CryptoExchange extends EventEmitter {
  constructor() {
    super();
  }

  abstract getSymbols(): Promise<ExchangeSymbol[]>;

  abstract getCandlesticks(symbol: ExchangeSymbol, interval: ExchangeInterval, start?: number, end?: number): Promise<ExchangeCandle[]>;

  abstract getStats(symbol: ExchangeSymbol): Promise<SymbolPrice>;

  abstract subscribeToTrades(symbols: ExchangeSymbol[]);
}