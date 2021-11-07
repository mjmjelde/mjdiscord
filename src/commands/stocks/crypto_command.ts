import FinnhubClient, { Finnhub } from "../../lib/stocks/finnhub";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { AbstractCommand } from "../abstract_command";
import { FinnhubCryptoSymbol } from "../../lib/stocks/types/finnhub_symbol";
import { formatAMPM, get24HoursAgoTimestamp } from "../../util/time";
import { echartService } from "../../services/chart";
import sharp from "sharp";
import cryptoManager from "../../services/crypto/crypto_manager";
import log from "../../util/logger";
import { CoinMarketCap } from "../../util/coinmarketcap";

export class CryptoCommand extends AbstractCommand {

  get name(): string {
    return "crypto"
  }

  constructor() {
    super();
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
    const symbolString = interaction.options.getString('symbol').trim().toLowerCase();
    const symbol = cryptoManager.getSymbolFromString(symbolString);
    if (!symbol) {
      await interaction.reply({ephemeral: true, content: 'Invalid stock symbol.'});
      return;
    }

    await interaction.deferReply();

    const candles = await cryptoManager.getCandles(symbol);
    const stats = await cryptoManager.getPrice(symbol);
    let dates = [];
    let data = [];
    for (var i = 0; i < candles.length; i++) {
      dates.push(formatAMPM(new Date(candles[i].time)));
      data.push([candles[i].open, candles[i].close, candles[i].low, candles[i].high]);
    }
    const candleImageSVG = await echartService.renderCandlestickChart(symbol.symbol, dates, data);
    const candleImage = await sharp(Buffer.from(candleImageSVG)).jpeg().toBuffer();
    const embed = new MessageEmbed();
    embed.setTitle(symbol.symbol);

    const increase = stats.last - stats.open;
    const percentChange = (increase / stats.open * 100).toFixed(2);

    embed.addFields(
      { name: 'Current', value: `$${stats.last.toString()}` },
      { name: 'High', value: `$${stats.high.toString()}`, inline: true},
      { name: 'Low', value: `$${stats.low.toString()}`, inline: true},
      { name: 'Volume 24h', value: `$${stats.volume.toString()}`, inline: true},
      { name: 'Change 24h', value: `${percentChange}%`, inline: true},
      { name: 'CoinMarketCap', value: (await CoinMarketCap.symbolToURL(symbol))},
    );

    embed.setImage(`attachment://candle.jpg`);
    interaction.editReply({embeds: [embed], files: [{ attachment: candleImage, name: 'candle.jpg' }]});
  }

}