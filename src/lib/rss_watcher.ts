import axios from "axios";
import { EventEmitter } from "events";
import Parser = require('rss-parser');
import log from "../util/logger";

export class RSSWatcher extends EventEmitter {

  private feedURL: string;
  private guidArray: string[] = [];
  private timer;
  private rssParser: Parser;

  constructor(url: string) {
    super();
    this.feedURL = url;
    this.rssParser = new Parser();
    void this.setupFeed();
    // this.timer = setInterval(this.fetchFeed.bind(this), this.interval);
  }

  public run() {
    if(!this.timer) {
      void this.setupFeed();
    }
  }

  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private async setupFeed() {
    this.guidArray = [];
    const resp = await axios(this.feedURL);
    const feed = await this.rssParser.parseString(resp.data);
    this.timer = setInterval(this.fetchFeed.bind(this), feed.ttl * 60 * 1000);
    feed.items.forEach(item => {
      this.guidArray.push(item.guid);
    });
  }

  private async fetchFeed() {
    try {
      const resp = await axios(this.feedURL)
      const feed = await this.rssParser.parseString(resp.data);
      const items = feed.items.sort((a,b) => {
        return Date.parse(a.pubDate) - Date.parse(b.pubDate);
      });
      
      for (const item of items) {
        if(this.isNewItem(item)) {
          log.debug(`got item ${item.title}`);
          this.emit('item', item);
          this.guidArray.push(item.guid);
        }
      }
    } catch (e) {
      log.error('Error fetching NFL news feed.  Will try again later.', e);
    }
  }

  private isNewItem(item: Parser.Item) {
    return this.guidArray.includes(item.guid);
  }

}