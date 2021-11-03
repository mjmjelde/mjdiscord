export interface ExchangeEvents {
  'trade': (trade: TradeEvent) => void;
  'open': () => void;
}

export interface ExchangeSymbol {
  symbol: string;
  exchange: string;
  baseAsset: string;
  quoteAsset: string;
}

export enum ExchangeInterval {
  ONE_MIN = 60,
  FIVE_MIN = 5 * 60,
  FIFTEEN_MIN = 15 * 60,
}

export interface ExchangeCandle {
  time: number;
  low: number;
  high: number;
  open: number;
  close: number;
  volume: number;
}

export interface TradeEvent {
  symbol: string; // Symbol name
  exchange: string; // Exchange id
  volume: number; // Amount in trade
  price: number; // Price of trade
  time: number; // Timestamp of trade
}

