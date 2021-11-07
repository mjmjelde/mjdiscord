import { ExchangeSymbol } from "../services/crypto/types/exchange_types";
import config from 'config';
import axios from "axios";

interface CoinMarketCapMap {
  data: {
    id: number,
    name: string,
    symbol: string,
    slug: string,
    rank: number,
    is_active: number,
    first_historical_data: string,
    last_historical_data: string,
    platform?: {
      id: number,
      name: string,
      symbol: string,
      slug: string,
      token_address: string
    }
  }[];
}

export class CoinMarketCap {

  private static lastUpdateTime = 0;
  private static mapData: CoinMarketCapMap;

  private static async updateSymbols() {
    if (this.lastUpdateTime < (Date.now() - 24 * 60 * 60 * 1000)) {
      this.lastUpdateTime = Date.now();
      const apiResp = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
        headers: {
          'X-CMC_PRO_API_KEY': config.get('coinmarketcap.apikey')
        }
      });
      this.mapData = apiResp.data as CoinMarketCapMap;
    }
  }
  static async symbolToURL(symbol: ExchangeSymbol): Promise<string> {
    await this.updateSymbols();
    const d = this.mapData.data.find(c => c.symbol.toLowerCase() == symbol.baseAsset.toLowerCase());
    return `https://coinmarketcap.com/currencies/${d.slug}/`;
  }
}