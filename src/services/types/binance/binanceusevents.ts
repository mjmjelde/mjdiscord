import { BinanceUSTrade } from "./binance_ws_trade";

export interface BinanceUSEvents {
  'trade': (trade: BinanceUSTrade) => void;
  'open': () => void;
}
