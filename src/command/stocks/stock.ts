import { Message, MessageEmbed, PartialMessage } from "discord.js";
import { Finnhub } from "../../lib/stocks/finnhub";
import { AbstractCommand } from "../abstract_command";
import * as config from 'config';
import { FinnhubSymbol } from "../../lib/stocks/types/finnhub_symbol";

export class StockCommand implements AbstractCommand {

  private client: Finnhub;
  private stock_symbols: FinnhubSymbol[];

  constructor() {
    this.client = new Finnhub(config.get('finnhub.apikey'));
    this.updateSymbols();
    setInterval(() => this.updateSymbols(), 24 * 60 * 60 * 1000)
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
    const profile = await this.client.profile2(symbol);
    if (!symbol) {
      msg.reply('Invalid stock symbol.');
      return;
    }
    this.client.quote(symbol).then((quote) => {
      const embed = new MessageEmbed();
      embed.setTitle(profile.name);
      embed.setThumbnail(profile.logo);
      embed.addFields(
        {name: 'Current Price', value: quote.c.toString()},
        {name: '', value: ''},
        {name: '\u200B', value: '\u200B' },
        {name: 'Open', value: quote.o.toString()},
        {name: 'Close', value: quote.c.toString()},
      );
      msg.channel.send(embed);
    }).catch(err => {
      msg.reply(`There was an error looking up ${stock}, please try again later`);
    })
  }
  help(): string {
    return "$<symbol> : Get current information about a stock";
  }

}