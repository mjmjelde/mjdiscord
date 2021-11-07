import { CryptoExchange } from "./abstract_exchange";
import { ExchangeSymbol, ExchangeInterval, ExchangeCandle, SymbolPrice } from "./types/exchange_types";
import axios from 'axios';
import WebSocket from 'ws';

export class CoinbaseExchange extends CryptoExchange {

  private ws: WebSocket;
  private wsURL = 'wss://ws-feed.exchange.coinbase.com';

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

  async getCandlesticks(symbol: ExchangeSymbol, interval: ExchangeInterval, start?: number, end?: number): Promise<ExchangeCandle[]> {
    const apiResp = await axios.get(`https://api.exchange.coinbase.com/products/${symbol.symbol}/candles`, {
      params: {
        granularity: interval,
        start: start ? new Date(start) : undefined,
        end: end ? new Date(end) : undefined
      }
    });
    const resp: ExchangeCandle[] = [];
    apiResp.data.reverse().forEach(element => {
      resp.push({
        time: element[0] * 1000,
        low: element[1],
        high: element[2],
        open: element[3],
        close: element[4],
        volume: element[5]
      })
    });
    return resp;
  }

  async getStats(symbol: ExchangeSymbol): Promise<SymbolPrice> {
    const apiResp = await axios.get(`https://api.exchange.coinbase.com/products/${symbol.symbol}/stats`)
    return {
      open: parseFloat(apiResp.data.open),
      high: parseFloat(apiResp.data.high),
      low: parseFloat(apiResp.data.low),
      volume: parseFloat(apiResp.data.volume),
      last: parseFloat(apiResp.data.last)
    }
  }

  async subscribeToTrades(symbols: ExchangeSymbol[]) {
    await this._checkWSConnection();
    this.ws.send(JSON.stringify({
      type: "subscribe",
      product_ids: [
        ...symbols.map(m => m.symbol)
      ],
      channels: [
        "ticker"
      ]
    }))
  }

  private _checkWSConnection(): Promise<void> {
    if (!this.ws || this.ws.readyState == WebSocket.CLOSED) {
      return new Promise<void>((resolve, reject) => {
        this.ws = new WebSocket(this.wsURL);
        this.ws.on('open', () => {
          resolve();
          this.ws.on('message', this.onSocketReceive.bind(this))
        });
        this.ws.on("error", () => {
          reject();
        })
      });
    }
  }

  private onSocketReceive(event: WebSocket.RawData) {
    const jsonData = JSON.parse(event.toString('utf-8'));
    if (jsonData.type == "ticker") {
      this.emit("trade", {
        symbol: jsonData.product_id,
        exchange: "coinbase",
        volume: parseFloat(jsonData.last_size),
        price: parseFloat(jsonData.price),
        time: Date.parse(jsonData.time)
      })
    } else {
      console.error('Invalid message receieved: ');
      console.error(jsonData);
    }
  }
  
}