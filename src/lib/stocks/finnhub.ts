import Axios, { AxiosInstance } from "axios";
import { EventEmitter } from "events";
import WebSocket = require("ws");
import ratelimiter from "../axios/axios_rate_limit";
import { FinnhubProfile } from "./types/finnhub_profile";
import { FinnhubQuote } from "./types/finnhub_quote";
import { FinnhubSymbol } from "./types/finnhub_symbol";

export interface FinnhubStockWebsocketMessage {
  type: 'subscribe' | 'unsubscribe';
  symbol: string;
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
  private socket: FinnhubSocket;

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
}