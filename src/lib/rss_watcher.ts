import { EventEmitter } from "events";
import Parser = require('rss-parser');

export class RSSWatcher extends EventEmitter {

  private feedURL: string;
  private interval: number = 60 * 1000;
  private lastDate: number = 0;
  private titleArray: string[] = [];
  private timer;
  private rssParser: Parser;

  constructor(url: string) {
    super();
    this.feedURL = url;
    this.rssParser = new Parser();
    this.lastDate = Date.now();
    this.timer = setInterval(this.fetchFeed.bind(this), this.interval);
  }

  public run() {
    if(!this.timer) {
      this.timer = setInterval(this.fetchFeed.bind(this), this.interval);
    }
  }

  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private async fetchFeed() {
    const feed = await this.rssParser.parseURL(this.feedURL);
    const items = feed.items.sort((a,b) => {
      return Date.parse(a.pubDate) - Date.parse(b.pubDate);
    });
    
    for (const item of items) {
      if(this.isNewItem(item)) {
        console.log(`got item ${item.title}`);
        this.emit('item', item);
        this.updateLastDate(item);
      }
    }
  }

  private isNewItem(item: Parser.Item) {
    return (this.lastDate == undefined) || (this.lastDate <= Date.parse(item.pubDate) && !this.titleArray.includes(item.title));
  }

  private updateLastDate(item: Parser.Item) {
    this.lastDate = Date.parse(item.pubDate);
    this.titleArray.push(item.title);
    if (this.titleArray.length > 10) {
      this.titleArray.shift();
    }
  }

}