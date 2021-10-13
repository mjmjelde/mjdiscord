import FinnhubClient, { Finnhub } from "../../lib/stocks/finnhub";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { AbstractCommand } from "../abstract_command";
import { FinnhubCryptoSymbol } from "../../lib/stocks/types/finnhub_symbol";
import { formatAMPM, get24HoursAgoTimestamp } from "../../util/time";
import { echartService } from "../../services/chart";
import sharp from "sharp";

export class CryptoCommand extends AbstractCommand {

  private client: Finnhub;
  private stockSymbols: FinnhubCryptoSymbol[];
  
  get name(): string {
    return "crypto"
  }

  constructor() {
    super();
    this.client = FinnhubClient;
    void this.updateSymbols();
    setInterval(this.updateSymbols.bind(this), 24 * 60 * 60 * 1000);
  }

  async updateSymbols() {
    this.stockSymbols = await this.client.crypto.symbols('binance');
  }

  guildCommands(): SlashCommandBuilder[] {
    const cryptoCommand = new SlashCommandBuilder().setName('crypto').setDescription('Get information of Crypto coins');
    cryptoCommand.addStringOption(option => option.setName('symbol').setDescription('Symbol to search for').setRequired(true));
    return [
      cryptoCommand
    ]
  }

  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == 'crypto'
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    const symbolString = interaction.options.getString('symbol').trim().toUpperCase();
    const symbol = this.stockSymbols.find(c => (c.displaySymbol == symbolString || `${symbolString}/USDT` == c.displaySymbol));
    if (!symbol) {
      await interaction.reply({ephemeral: true, content: 'Invalid stock symbol.'});
      return;
    }

    await interaction.deferReply();

    const candles = await this.client.crypto.candles(symbol, get24HoursAgoTimestamp(), new Date().getTime(), 15);
    let dates = [];
    let data = [];
    for (var i = 0; i < candles.t.length; i++) {
      dates.push(formatAMPM(new Date(candles.t[i] * 1000)));
      data.push([candles.o[i], candles.c[i], candles.l[i], candles.h[i]]);
    }
    const candleImageSVG = await echartService.renderCandlestickChart(symbol.description, dates, data);
    const candleImage = await sharp(Buffer.from(candleImageSVG)).jpeg().toBuffer();
    const embed = new MessageEmbed();
    embed.setTitle(symbol.displaySymbol);

    const increase = candles.c[candles.c.length - 1] - candles.c[0];
    const percentChange = (increase / candles.c[0] * 100).toFixed(2);

    embed.addFields(
      { name: 'Current Price', value: candles.c[candles.t.length - 1].toString() },
      { name: 'Change 24h', value: `${percentChange}%`}
    );

    embed.setImage(`attachment://candle.jpg`);
    interaction.editReply({embeds: [embed], files: [{ attachment: candleImage, name: 'candle.jpg' }]});
  }

}