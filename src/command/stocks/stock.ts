import { Message, MessageEmbed, PartialMessage } from "discord.js";
import FinnhubClient, { Finnhub } from "../../lib/stocks/finnhub";
import { AbstractCommand } from "../abstract_command";
import * as config from 'config';
import { FinnhubSymbol } from "../../lib/stocks/types/finnhub_symbol";

export class StockCommand implements AbstractCommand {

  private client: Finnhub;
  private stock_symbols: FinnhubSymbol[];

  constructor() {
    // this.client = new Finnhub(config.get('finnhub.apikey'));
    this.client = FinnhubClient;
    this.updateSymbols();
    setInterval(() => this.updateSymbols(), 60 * 60 * 1000)
  }

  async updateSymbols() {
    this.stock_symbols = await this.client.symbols();
  }

  should_execute(msg: Message | PartialMessage): boolean {
    return msg.content.startsWith('$');
  }

  async execute(msg: Message | PartialMessage) {
    const stock = msg.content.replace(/\$/, '').trim().toUpperCase();
    const symbol = this.stock_symbols.find(c => c.symbol == stock);
    if (!symbol) {
      msg.reply('Invalid stock symbol.');
      return;
    }
    const profile = await this.client.profile2(symbol);
    this.client.quote(symbol).then((quote) => {
      const embed = new MessageEmbed();
      embed.setTitle(profile.name);
      embed.setThumbnail(profile.logo);
      embed.addFields(
        {name: 'Current Price', value: `$${quote.c.toString()}\n`},
        // {name: '', value: ''},
        // {name: '\u200B', value: '\u200B' },
        {name: 'Open', value: `$${quote.o.toString()}`, inline: true},
        {name: 'Close', value: `$${quote.c.toString()}`, inline: true},
        // {name: '\u200B', value: '\u200B' },
        {name: 'Low', value: `$${quote.l.toString()}`, inline: true},
        {name: 'High', value: `$${quote.h.toString()}`, inline: true},
        {name: 'Trading View', value: `https://www.tradingview.com/symbols/${symbol.symbol}/`}
        
      );
      embed.setImage(`https://elite.finviz.com/chart.ashx?t=${symbol.symbol}&ty=c&ta=st_c,sch_200p&p=i5&s=1&x=${Math.random().toString(36).substr(2,9)}`)
      msg.channel.send(embed);
    }).catch(err => {
      msg.reply(`There was an error looking up ${stock}, please try again later`);
      console.log(err);
    })
  }
  help(): string {
    return "$<symbol> : Get current information about a stock";
  }

}