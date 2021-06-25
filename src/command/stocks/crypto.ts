import { Message, MessageEmbed, PartialMessage } from "discord.js";
import FinnhubClient, { Finnhub } from "../../lib/stocks/finnhub";
import { FinnhubCryptoSymbol } from "../../lib/stocks/types/finnhub_symbol";
import { BinanceUS } from "../../services/binanceus";
import GoogleChart from "../../services/chart";
import { BinanceSymbols } from "../../services/types/binance/binance_exchange_info";
import { CommandArgs } from "../../util/command_args";
import { formatAMPM, get24HoursAgoTimestamp } from "../../util/time";
import { DiscordCommand } from "../discord_command";

export class CryptoCommand extends DiscordCommand {
  
  private client: Finnhub;
  private stock_symbols: FinnhubCryptoSymbol[];

  constructor() {
    super();
    this.client = FinnhubClient;
    this.updateSymbols();
    setInterval(() => this.updateSymbols(), 24 * 60 * 60 * 1000);
    this.updateSymbols();
  }

  async updateSymbols() {
    this.stock_symbols = await this.client.crypto.symbols("binance");
  }

  shouldExecute(msg: Message | PartialMessage, args: CommandArgs): boolean {
    return args.peek().startsWith("#");
  }

  async execute(msg: Message | PartialMessage, args: CommandArgs) {
    const symbolRaw = args.pop().replace(/\#/, '').trim().toUpperCase();
    const symbol = this.stock_symbols.find(c => (c.displaySymbol == symbolRaw || `${symbolRaw}/USDT` == c.displaySymbol));
    if (!symbol) {
      msg.reply(`Invalid crypto symbol provided: ${symbolRaw}`);
      return;
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
    const candleImage = await GoogleChart.renderChart(data.toString());
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