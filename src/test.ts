import WebSocket from "ws";
import { CoinbaseExchange } from "./services/crypto/coinbase_exchange";
import { ExchangeSymbol, TradeEvent } from "./services/crypto/types/exchange_types";
import { average } from "./util/numbers";

class TimedArray<T> {
  private data: {data: T, time: number}[] = [];
  private maxTime: number;

  constructor(maxTime: number) {
    this.maxTime = maxTime;
  }

  public push(data: T, time: number = Date.now()) {
    this.data.push({
      data: data,
      time: time,
    });
  }

  public toArray(): T[] {
    this.purgeOldData();
    return this.data.map(t => t.data);
  }

  private purgeOldData() {
    const currTime = Date.now();
    this.data = this.data.filter(t => t.time > (currTime - this.maxTime))
  }
}

class StockAverage {
  private price15 = new TimedArray<number>(15 * 60 * 1000);
  private price5 = new TimedArray<number>(5 * 60 * 1000);
  private symbol: ExchangeSymbol;

  constructor(symbol: ExchangeSymbol) {
    this.symbol = symbol;
  }

  public addTrade(trade: TradeEvent) {
    this.price15.push(trade.price);
    this.price5.push(trade.price);
  }

  public printAverage() {
    console.log('################');
    console.log(`Crypto: ${this.symbol.symbol}`);
    console.log(`15 minute average: ${average(this.price15.toArray())}`)
    console.log(`5 minute average: ${average(this.price5.toArray())}`)
    console.log('################');
    console.log();
  }
}

async function test() {
  const cb = new CoinbaseExchange();
  const symbols = await cb.getSymbols();
  const filtered = symbols.filter(s => s.quoteAsset == "USD");
  let sa: {[name: string]: StockAverage} = {};
  filtered.forEach(s => {
    sa[s.symbol] = new StockAverage(s)
  });
  cb.subscribeToTrades(filtered);
  cb.on('trade', trade => {
    sa[trade.symbol].addTrade(trade);
  });

  setInterval(() => {
    for (const s in sa) {
      sa[s].printAverage();
    }
  }, 5 * 60 * 1000);
}

test();