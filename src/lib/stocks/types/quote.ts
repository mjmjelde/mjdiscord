export interface SocketQuote {
  symbol: string;
  price: number;
  time: number;
  volume: number;
  conditions?: any;
}