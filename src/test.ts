import { exit } from "process";
import WebSocket from "ws";
import { BinanceExchange } from "./services/crypto/binance_exchange";
import { CoinbaseExchange } from "./services/crypto/coinbase_exchange";
import { ExchangeSymbol, TradeEvent } from "./services/crypto/types/exchange_types";
import { average, percentChange } from "./util/numbers";

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
    const avg15 = average(this.price15.toArray());
    const avg5 = average(this.price5.toArray());
    console.log('################');
    console.log(`Crypto: ${this.symbol.symbol}`);
    console.log(`15 minute average: ${avg15}`)
    console.log(`5 minute average: ${avg5}`)
    console.log(`% change: ${percentChange(avg15, avg5)}`)
    console.log('################');
    console.log();
  }
}

async function test() {
  const cb = new CoinbaseExchange();
  const bn = new BinanceExchange();
  const bnSymbols = await bn.getSymbols();
  const usdBNSymbols = bnSymbols.filter(f => f.quoteAsset == "USD");
  usdBNSymbols.forEach(s => {
    console.log(`Binance Symbol: ${s.symbol}`);
  })
  exit(0)


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