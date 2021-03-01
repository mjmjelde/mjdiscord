import { Message, MessageEmbed, PartialMessage } from "discord.js";
import FinnhubClient, { Finnhub } from "../../lib/stocks/finnhub";
import { AbstractCommand } from "../abstract_command";
import * as config from 'config';
import { FinnhubCryptoSymbol, FinnhubSymbol } from "../../lib/stocks/types/finnhub_symbol";
import { getCandlestickChart } from "../../util/google_charts";
import { formatAMPM, get24HoursAgoTimestamp } from "../../util/time";
import { CommandArgs } from "../../util/command_args";

export class CryptoCommand implements AbstractCommand {

  private client: Finnhub;
  private stock_symbols: FinnhubCryptoSymbol[];


  constructor() {
    // this.client = new Finnhub(config.get('finnhub.apikey'));
    this.client = FinnhubClient;
    this.updateSymbols();
    setInterval(() => this.updateSymbols(), 24 * 60 * 60 * 1000);
    
  }

  async updateSymbols() {
    this.stock_symbols = await this.client.crypto.symbols("binance");
  }

  should_execute(msg: Message | PartialMessage): boolean {
    return msg.content.startsWith('#');
  }

  async execute(msg: Message | PartialMessage) {
    const args = new CommandArgs(msg.client, msg.content);
    args.pop();
    const stock = args.pop().replace(/\#/, '').trim().toUpperCase();
    const symbol = this.stock_symbols.find(c => (c.displaySymbol == stock || `${stock}/USDT` == c.displaySymbol));
    if (!symbol) {
      msg.reply('Invalid stock symbol.');
      return;
    }
    if (!args.atEnd()) {
      switch(args.pop()) {
        case 'alert':

          break;
        default:
          msg.reply('Invalid subcommand.  Please try again');
          return;
      }
    }
    const candles = await this.client.crypto.candles(symbol, get24HoursAgoTimestamp(), new Date().getTime(), 15);
    //Generate Candlestick Graph
    let data = [];
    for (var i = 0; i < candles.t.length; i++) {
      data[i] = [
        formatAMPM(new Date(candles.t[i] * 1000)),
        candles.l[i],
        candles.o[i],
        candles.c[i],
        candles.h[i]
      ]
    }
    const candleImage = await getCandlestickChart(data);
    const embed = new MessageEmbed();
    embed.setTitle(symbol.displaySymbol);
    embed.attachFiles([{
      attachment: candleImage,
      name: 'candle.jpg',
      
    }]);

    const increase = candles.c[candles.c.length - 1] - candles.c[0];
    const percentChange = (increase / candles.c[0] * 100).toFixed(2);

    embed.addFields(
      { name: 'Current Price', value: candles.c[candles.t.length - 1] },
      { name: 'Change 24h', value: `${percentChange}%`}
    );
    embed.setImage(`attachment://candle.jpg`)
    msg.channel.send(embed).catch(err => {
      console.log(err);
    });
  }

  help(): string {
    return "#<symbol> : Get current price information about a cryptocurrency";
  }

}