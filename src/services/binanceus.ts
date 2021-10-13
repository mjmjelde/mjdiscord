import Axios, { AxiosInstance } from "axios";
import { randomInt } from "crypto";
import EventEmitter from "events";
import WebSocket from "ws";
import log from "../util/logger";
import { BinanceUSEvents } from "./types/binance/binanceusevents";
import { BinanceUSExchangeInfo } from "./types/binance/binance_exchange_info";
import { BinanceUSTrade } from "./types/binance/binance_ws_trade";

export declare interface BinanceUS {
  on<U extends keyof BinanceUSEvents>(
    event: U, listener: BinanceUSEvents[U]
  ): this;

  emit<U extends keyof BinanceUSEvents>(
    event: U, ...args: Parameters<BinanceUSEvents[U]>
  ): boolean;
}

export class BinanceUS extends EventEmitter {
  private client: AxiosInstance;
  private ws: WebSocket;
  private channels: string[] = [];

  constructor(){
    super();
    this.client = Axios.create({
      baseURL: 'https://api.binance.us/api/v3'
    });
    this.openSocketConnection();
  }

  private openSocketConnection(): void {
    if (this.ws) {
      this.ws.terminate();
    }
    this.ws = new WebSocket('wss://stream.binance.us:9443/ws');
    this.ws.on('message', this.onSocketMessage.bind(this));
    this.ws.on('open', () => {
      this.emit('open');
      // Reconnect to channels we were already in if they exist
      if (this.channels.length > 0) {
        this.ws.send(JSON.stringify({
          method: "SUBSCRIBE",
          params: this.channels,
          id: randomInt(0, 100)
        }));
      }
    });
    this.ws.on('close', (code: number, reason: string) => {
      log.info(`BinanceUS Socket Closed: ${code} - ${reason}`);
      this.openSocketConnection();
    })
  }

  public subscribeToTrade(symbol: string) {
    this.ws.send(JSON.stringify({
      method: "SUBSCRIBE",
      params: [
        `${symbol.toLowerCase()}@trade`
      ],
      id: randomInt(1, 100)
    }));
    this.channels.push(`${symbol}@trade`);
  }

  public getExchangeInfo(): Promise<BinanceUSExchangeInfo> {
    return new Promise<BinanceUSExchangeInfo>((resolve, reject) => {
      this.client.get('/exchangeInfo').then((resp) => {
        return resolve(resp.data);
      }).catch(err => {
        return reject(err);
      });
    });
  }

  private onSocketMessage(data: WebSocket.Data) {
    const jsonData = JSON.parse(data.toString());
    switch (jsonData.e) {
      case 'trade':
        this.emit('trade', jsonData);
        break;
    }
  }
}

const BinanceUSInstance = new BinanceUS();
export default BinanceUSInstance;