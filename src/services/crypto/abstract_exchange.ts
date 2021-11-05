import { EventEmitter } from "stream";
import { ExchangeCandle, ExchangeEvents, ExchangeInterval, ExchangeSymbol } from "./types/exchange_types";

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

  abstract getCandlesticks(symbol: ExchangeSymbol, interval: ExchangeInterval): Promise<ExchangeCandle[]>;

  abstract subscribeToTrades(symbols: ExchangeSymbol[]);
}