import axios, { AxiosInstance } from "axios";
import { CryptoExchange } from "./abstract_exchange";
import { BinanceUSExchangeInfo } from "./types/binance_exchange_info";
import { ExchangeSymbol, ExchangeInterval, ExchangeCandle, SymbolPrice } from "./types/exchange_types";
import WebSocket from "ws";
import { randomInt } from "crypto";
import log from "../../util/logger";

export class BinanceExchange extends CryptoExchange {
  private client: AxiosInstance;
  private ws: WebSocket;
  private channels: ExchangeSymbol[] = [];

  constructor() {
    super();
    this.client = axios.create({
      baseURL: 'https://api.binance.us/api/v3'
    })
  }

  async getSymbols(): Promise<ExchangeSymbol[]> {
    const apiResp = await this.client.get('/exchangeInfo');
    const apiData = apiResp.data as BinanceUSExchangeInfo;
    return apiData.symbols.map(f => {return {
      symbol: f.symbol,
      exchange: 'binance',
      baseAsset: f.baseAsset,
      quoteAsset: f.quoteAsset
    }});
  }

  async getCandlesticks(symbol: ExchangeSymbol, interval: ExchangeInterval): Promise<ExchangeCandle[]> {
    const apiResp = await this.client.get('/klines', {
      params: {
        symbol: symbol.symbol,
        interval: this.intervalToString(interval)
      }
    });
    return apiResp.data.map(candle => {
      return {
        time: candle[0],
        low: parseFloat(candle[3]),
        high: parseFloat(candle[2]),
        open: parseFloat(candle[1]),
        close: parseFloat(candle[4]),
        volume: parseFloat(candle[7])
      }
    });
  }

  async getStats(symbol: ExchangeSymbol): Promise<SymbolPrice> {
    const apiResp = await this.client.get('/ticker/24hr', {
      params: {
        symbol: symbol.symbol
      }
    });
    return {
      open: parseFloat(apiResp.data.openPrice),
      high: parseFloat(apiResp.data.highPrice),
      low: parseFloat(apiResp.data.lowPrice),
      volume: parseFloat(apiResp.data.quoteVolume),
      last: parseFloat(apiResp.data.lastPrice)
    }
  }
  subscribeToTrades(symbols: ExchangeSymbol[]) {
    throw new Error("Method not implemented.");
  }

  private intervalToString(interval: ExchangeInterval) {
    switch (interval) {
      case ExchangeInterval.ONE_MIN:
        return "1m";
      case ExchangeInterval.FIVE_MIN:
        return "5m";
      case ExchangeInterval.FIFTEEN_MIN:
        return "15m";
    }
    return "15m";
  }

  private openSocketConnection(): void {
    if (this.ws && this.ws.readyState != WebSocket.CLOSED) {
      this.ws.terminate();
    }

    this.ws = new WebSocket('wss://stream.binance.us:9443/ws')
    this.ws.on('open', () => {
      this.emit('open');
      if (this.channels.length > 0) {
        this.ws.send(JSON.stringify({
          method: "SUBSCRIBE",
          params: this.channels.map(m => m.symbol.toLowerCase()),
          id: randomInt(0, 100)
        }))
      }
    });
    this.ws.on('close', (code: number, reason:string) => {
      log.info(`BinanceUS Socket Closed: ${code} - ${reason}`);
      this.openSocketConnection();
    });
    this.ws.on('message', this.onSocketMessage.bind(this));
  }

  private onSocketMessage(data: WebSocket.Data) {
    const jsonData = JSON.parse(data.toString('utf-8'));
    switch (jsonData.e) {
      case 'trade':
        this.emit('trade', {
          symbol: jsonData.s,
          exchange: 'binance',
          price: parseFloat(jsonData.p),
          volume: parseFloat(jsonData.q),
          time: jsonData.T
        })
        break;
    }
  }

}