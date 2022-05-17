import axios from "axios";
import { load } from "cheerio";
import EventEmitter from "events";
import LRUCache from "lru-cache";
import { resolve } from "url";
import log from "./logger";

export namespace FantasyPros {
  export interface NewsItem {
    title: string;
    date: string;
    correspondent: string;
    url: string;
    picture: string;
    description: string;
    fantasyImpact?: string;
    sport: Sport;
    type: NewsType;
  }

  export enum Sport {
    NFL = 'nfl',
    MLB = 'mlb',
    NBA = 'nba',
    NHL = 'nfl',
    PGA = 'pga',
  }

  export enum NewsType {
    ALL = 'player-news.php',
    BREAKING_NEWS = 'breaking-news.php',
    RUMORS = 'rumors.php',
    DRAFT = 'draft-coverage.php',
    GAME_RECAPS = 'game-recaps.php',
    INJURY = 'injury-news.php',
    TRANSACTIONS = 'transactions.php'
  }

  function newsTypeFromString(str: string) {
    for(const t of Object.keys(FantasyPros.NewsType)) {
      if (FantasyPros.NewsType[t] == str) {
        return FantasyPros.NewsType[t];
      }
    }
  }

  export function newsNameFromString(str: string) {
    for(const t of Object.keys(FantasyPros.NewsType)) {
      if (FantasyPros.NewsType[t] == str) {
        return t;
      }
    }
  }

  export declare interface NewsMonitor {
    on(event: 'news', listener: (item: NewsItem) => void): this;
  }
  
  export class NewsMonitor extends EventEmitter {
    private readonly sport: Sport;
    private cache: LRUCache<string, NewsItem>;
    private baseUrl: string = 'https://www.fantasypros.com';
    private loaded: boolean = false;

    constructor(sport: Sport) {
      super();
      this.sport = sport;
      this.cache = new LRUCache({
        max: 150
      });
      void this.parseNews().then(() => {
        this.loaded = true;
      });
      setInterval(this.parseNews.bind(this), 10 * 60 * 1000);
    }

    private async parseNews() {
      const resp = await axios(`${this.baseUrl}/${this.sport.toString()}/player-news.php`);
      const html = load(resp.data);
      const items = html('.player-news-item');
      for (const itemElement of items){
        try {
          const item = load(itemElement);
          const picture = item('.player-news-image img').attr('src');
          const title = item('.player-news-header a').contents().first().text().trim();
          const url = new URL(item('.player-news-header a').attr('href'), this.baseUrl).toString();
          const dateItem = item('.player-news-header p');
          const date = dateItem.text().split('\n')[0];
          const correspondent = dateItem.find('a').text();
          const description = item('.ten > p:nth-child(2)').text();
          const fantasyImpactItem = item('div:nth-child(1) > div:nth-child(2) > p:nth-child(3)')
          fantasyImpactItem.find('b').remove();
          const fantasyImpact = fantasyImpactItem.text().trim();
          const categoryLink = item('div:nth-child(1) > div:nth-child(2) > span:nth-child(4) a').attr('href').split('/');
          this.checkNewItem({
            title: title,
            date: date,
            correspondent,
            description,
            fantasyImpact,
            url,
            picture,
            sport: this.sport,
            type: newsTypeFromString(categoryLink[categoryLink.length - 1])
          })
        } catch(e) {
          log.info(e);
        }
      }
    }

    private checkNewItem(item: NewsItem) {
      if (!this.cache.has(item.url)) {
        this.cache.set(item.url, item);
        if (this.loaded) {
          this.emit('news', item);
        }
      }
    }
  }
  

}

