import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import FinnhubClient, { Finnhub } from "../../lib/stocks/finnhub";
import { FinnhubSymbol } from "../../lib/stocks/types/finnhub_symbol";
import log from "../../util/logger";
import { AbstractCommand } from "../abstract_command";

export class StockCommand extends AbstractCommand {
  
  private client: Finnhub;
  private stock_symbols: FinnhubSymbol[];
  get name(): string {
    return 'stock'
  }

  constructor() {
    super();
    this.client = FinnhubClient;
    void this.updateSymbols();
    setInterval(this.updateSymbols.bind(this), 60 * 60 * 1000);
  }

  async updateSymbols() {
    this.stock_symbols = await this.client.symbols();
  }

  guildCommands(): SlashCommandBuilder[] {
    const stockCommand = new SlashCommandBuilder().setName('stock').setDescription('Get stock information')
    stockCommand.addStringOption(option => option.setName('symbol').setDescription('Stock symbol').setRequired(true));
    return [
      stockCommand,
    ]
  }

  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == 'stock';
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    const symbolString = interaction.options.getString('symbol');
    const symbol = this.stock_symbols.find(c => c.symbol == symbolString);

    if(!symbol) {
      await interaction.reply({ephemeral: true, content: 'Invalid stock symbol'});
      return;
    }
    await interaction.deferReply();
    const profile = await this.client.profile2(symbol);
    this.client.quote(symbol).then(async (quote) => {
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
      embed.setImage(`https://elite.finviz.com/chart.ashx?t=${symbol.symbol}&ty=c&ta=st_c,sch_200p&p=i5&s=1&x=${Math.random().toString(36).substr(2,9)}`);
      await interaction.editReply({embeds: [embed]});
    }).catch(async err => {
      log.error(err);
      await interaction.editReply({content: `There was an error looking up ${symbolString}, please try again later`});
    })
  }

}