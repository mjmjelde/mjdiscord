export interface BinanceUSExchangeInfo {
  timezone: string;
  serverTime: number;
  rateLimits?: (RateLimitsEntity)[] | null;
  exchangeFilters?: (null)[] | null;
  symbols: (BinanceSymbols)[];
}
export interface RateLimitsEntity {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
}
export interface BinanceSymbols {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes?: (string)[] | null;
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters?: (FiltersEntity)[] | null;
  permissions?: (string)[] | null;
}
export interface FiltersEntity {
  filterType: string;
  minPrice?: string | null;
  maxPrice?: string | null;
  tickSize?: string | null;
  multiplierUp?: string | null;
  multiplierDown?: string | null;
  avgPriceMins?: number | null;
  minQty?: string | null;
  maxQty?: string | null;
  stepSize?: string | null;
  minNotional?: string | null;
  applyToMarket?: boolean | null;
  limit?: number | null;
  maxNumOrders?: number | null;
  maxNumAlgoOrders?: number | null;
}
