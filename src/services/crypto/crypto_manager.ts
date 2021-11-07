import { Guild } from "discord.js";
import { get24HoursAgoTimestamp } from "../../util/time";
import { AbstractService } from "../abstract_service";
import { CryptoExchange } from "./abstract_exchange";
import { BinanceExchange } from "./binance_exchange";
import { CoinbaseExchange } from "./coinbase_exchange";
import { ExchangeCandle, ExchangeInterval, ExchangeSymbol, SymbolPrice } from "./types/exchange_types";

export class CryptoManager {
  private exchanges: {[name: string]: CryptoExchange} = {};
  private cryptoSymbols: {[name: string]: ExchangeSymbol} = {};
  constructor() {
    this.exchanges['coinbase'] = new CoinbaseExchange();
    this.exchanges['binance'] = new BinanceExchange();
    void this.updateSymbols();
    setInterval(this.updateSymbols.bind(this), 60 * 60 * 1000);
  }

  private async updateSymbols() {
    let updatedSymbols: {[name: string]: ExchangeSymbol} = {};
    for (const exName in this.exchanges) {
      const symbols = (await this.exchanges[exName].getSymbols()).filter(s => s.quoteAsset == "USD");
      symbols.forEach(symbol => {
        if(!updatedSymbols.hasOwnProperty(symbol.baseAsset.toLowerCase())) {
          updatedSymbols[symbol.baseAsset.toLowerCase()] = symbol;
        }
      })
    }
    this.cryptoSymbols = updatedSymbols;
  }

  public getSymbolFromString(symbolString: string): ExchangeSymbol {
    return this.cryptoSymbols.hasOwnProperty(symbolString.toLowerCase()) ? this.cryptoSymbols[symbolString.toLowerCase()] : null;
  }

  public async getPrice(symbol: ExchangeSymbol): Promise<SymbolPrice> {
    return await this.exchanges[symbol.exchange].getStats(symbol);
  }

  public async getCandles(symbol: ExchangeSymbol, interval: ExchangeInterval = ExchangeInterval.FIFTEEN_MIN, start: number = get24HoursAgoTimestamp() * 1000, end: number = Date.now()): Promise<ExchangeCandle[]> {
    return await this.exchanges[symbol.exchange].getCandlesticks(symbol, interval, start, end);
  }
}

const cryptoManager = new CryptoManager();
export default cryptoManager;