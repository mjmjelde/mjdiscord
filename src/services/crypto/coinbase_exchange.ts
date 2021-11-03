import { CryptoExchange } from "./abstract_exchange";
import { ExchangeSymbol, ExchangeInterval, ExchangeCandle } from "./types/exchange_types";
import axios from 'axios';
import WebSocket from 'ws';

export class CoinbaseExchange extends CryptoExchange {

  private ws: WebSocket;
  private const wsURL = 'wss://ws-feed.exchange.coinbase.com';

  constructor() {
    super();
  }
  
  async getSymbols(): Promise<ExchangeSymbol[]> {
    const apiResp = await axios.get('https://api.exchange.coinbase.com/products');
    const resp: ExchangeSymbol[] = [];
    apiResp.data.forEach(element => {
      resp.push({
        symbol: element.id,
        exchange: 'coinbase',
        baseAsset: element.base_currency,
        quoteAsset: element.quote_currency
      })
    });
    return resp;
  }

  async getCandlesticks(symbol: ExchangeSymbol, interval: ExchangeInterval): Promise<ExchangeCandle[]> {
    const apiResp = await axios.get(`https://api.exchange.coinbase.com/products/${symbol.symbol}/candles`, {
      params: {
        granularity: interval
      }
    });
    const resp: ExchangeCandle[] = [];
    apiResp.data.forEach(element => {
      resp.push({
        time: element[0],
        low: element[1],
        high: element[2],
        open: element[3],
        close: element[4],
        volume: element[5]
      })
    });
    return resp;
  }

  subscribeToTrades(symbol: ExchangeSymbol) {
    throw new Error("Method not implemented.");
  }

  private _checkWSConnection(): Promise<void> {
    if (!this.ws) {
      return new Promise<void>((resolve, reject) => {
        this.ws = new WebSocket(this.wsURL);
        this.ws.on('open', () => {
          resolve();
        });
      });
    }
  }
  
}