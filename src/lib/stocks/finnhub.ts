import Axios, { AxiosInstance } from "axios";
import config = require("config");
import { EventEmitter } from "events";
import WebSocket = require("ws");
import { getDayTimestamp } from "../../util/time";
import ratelimiter from "../axios/axios_rate_limit";
import { FinnhubCryptoCandle } from "./types/finnhub_candle";
import { FinnhubProfile } from "./types/finnhub_profile";
import { FinnhubQuote } from "./types/finnhub_quote";
import { FinnhubCryptoSymbol, FinnhubSymbol } from "./types/finnhub_symbol";

export interface FinnhubStockWebsocketMessage {
  type: 'subscribe' | 'unsubscribe';
  symbol: string;
}

export interface FinnhubSocketTrade {
  type: string;
  data: {
    s: string;
    p: number;
    t: number;
    v: number;
    c: any;
  }[]
}

export interface FinnhubSocketEvents {
  'message': (data: FinnhubSocketTrade) => void;
}

export declare interface FinnhubSocket {
  on<U extends keyof FinnhubSocketEvents>(
    event: U, listener: FinnhubSocketEvents[U]
  ): this;

  emit<U extends keyof FinnhubSocketEvents>(
    event: U, ...args: Parameters<FinnhubSocketEvents[U]>
  ): boolean;
}

export class FinnhubSocket extends EventEmitter {
  private socket: WebSocket;
  private debug: boolean;

  constructor(key: string, debug: boolean = false) {
    super();
    this.debug = debug;
    this.socket = new WebSocket(`wss://ws.finnhub.io?token=${key}`);
    this.socket.on('open', function() {
      if(debug) {
        console.log('Socket opened');
      }
    });
    this.socket.on('error', (event) => {
      console.log(event);
    });
    this.socket.addEventListener('message', (data) => {
      this.onMessage(data);
    });
  }

  private onMessage(event: WebSocket.MessageEvent) {
    if(this.debug) {
      console.log(`Message Received: ${event.data}`);
    }
    this.emit('message', JSON.parse(event.data.toString()) as FinnhubSocketTrade);
  }

  public subscribe(symbol: string) {
    this.socket.send(JSON.stringify({type: 'subscribe', symbol: symbol}));
  }

  public unsubscribe(symbol: string) {
    this.socket.send(JSON.stringify({type: 'unsubscribe', symbol: symbol}));
  }
  
}

export class Finnhub {
  private client: AxiosInstance;
  public socket: FinnhubSocket;

  constructor(key: string) {
    this.socket = new FinnhubSocket(key);
    this.client = Axios.create({
      params: {
        token: key
      },
      baseURL: 'https://finnhub.io/api/v1',
      adapter: ratelimiter({
        key: (method, url) => url, // return the ratelimit bucket key
        headers: { // headers from the API that provide ratelimiting data
          global: 'X-Ratelimit-Global',
          limit: 'X-Ratelimit-Limit',
          reset: 'X-Ratelimit-Reset',
          remaining: 'X-Ratelimit-Remaining',
          retry: 'X-Ratelimit-Retry',
        },
      })
    });
  }

  symbols(exchange: string = "US"): Promise<FinnhubSymbol[]> {
    return new Promise<FinnhubSymbol[]>((resolve, reject) => {
      this.client.get("/stock/symbol", {
        params: {
          exchange: exchange
        }
      }).then((resp) => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      })
    });
  }

  profile2(symbol: FinnhubSymbol): Promise<FinnhubProfile> {
    return new Promise<FinnhubProfile>((resolve, reject) => {
      this.client.get("/stock/profile2", {
        params: {
          symbol: symbol.symbol
        }
      }).then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      })
    })
  }

  quote(symbol: FinnhubSymbol): Promise<FinnhubQuote> {
    return new Promise<FinnhubQuote>((resolve, reject) => {
      this.client.get("/quote", {
        params: {
          symbol: symbol.symbol
        }
      }).then((resp) => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      })
    });
  }

  get crypto(): FinnhubCrypto {
    return new FinnhubCrypto(this.client);
  }
}

export class FinnhubCrypto {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  public exchanges(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.client.get("/crypto/exchange").then((resp) => {
        resolve(resp.data);
      }).catch((err) => {
        reject(err);
      })
    })
  }

  public symbols(exchange: string): Promise<FinnhubCryptoSymbol[]> {
    return new Promise((resolve, reject) => {
      this.client.get("/crypto/symbol", {
        params: {
          exchange: exchange
        }
      }).then((resp) => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      })
    })
  }

  public candles(symbol: FinnhubCryptoSymbol, from: number = getDayTimestamp(), to: number = Date.now(), resolution: number = 5,): Promise<FinnhubCryptoCandle> {
    return new Promise((resolve, reject) => {
      this.client.get("/crypto/candle", {
        params: {
          symbol: symbol.symbol,
          resolution: resolution,
          from: from,
          to: to,
        }
      }).then((resp) => {
        resolve(resp.data);
      }).catch((err) => {
        reject(err);
      })
    })
  }
}

export default new Finnhub(config.get('finnhub.apikey'));