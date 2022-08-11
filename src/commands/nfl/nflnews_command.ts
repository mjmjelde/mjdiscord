import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, DMChannel, EmbedBuilder, GuildMember, Snowflake, TextChannel } from "discord.js";
import { readFileSync, writeFileSync } from "fs";
import { camelCase } from "lodash";
import { join } from "path";
import Parser from "rss-parser";
import { RSSWatcher } from "../../lib/rss_watcher";
import { dataDir } from "../../util/data";
import { FantasyPros } from "../../util/fantasyproparser";
import log from "../../util/logger";
import { camelize } from "../../util/string";
import { AbstractCommand } from "../abstract_command";

interface NFLChannel {
  channel: Snowflake;
  types: FantasyPros.NewsType[];
}

export class NFLNewsCommand extends AbstractCommand {

  private readonly client: Client;
  // private channels: NFLChannel[];
  private channels: Map<Snowflake, NFLChannel> = new Map();
  // private rsswatcher: RSSWatcher;
  private fantasypros: FantasyPros.NewsMonitor;
  public readonly name: string = 'nflnews';

  constructor(client: Client) {
    super();
    this.client = client;
    this.client.once('ready', this.loadData.bind(this));
    // this.rsswatcher = new RSSWatcher('https://www.rotowire.com/rss/news.php?sport=NFL');
    // this.rsswatcher.on('item', this.sendItem.bind(this));
    this.fantasypros = new FantasyPros.NewsMonitor(FantasyPros.Sport.NFL);
    this.fantasypros.on('news', this.newsItem.bind(this));

  }

  guildCommands(): SlashCommandBuilder[] {
    const command = new SlashCommandBuilder().setName('nflnews').setDescription('Toggle NFL news in this channel');
    command.addStringOption(option => {
      option.setName('newstype');
      option.setDescription('Type of new items to listen for');
      option.addChoices(...Object.keys(FantasyPros.NewsType).map(x => { return {name: camelCase(x), value: x}}));
      return option;
    });
    command.addBooleanOption(option => {
      option.setName('remove');
      option.setDescription('Remove all nfl notifications from the channel');
      return option;
    })
    return [
      command,
    ]
  }

  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == 'nflnews';
  }
  
  async execute(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    const typeString = interaction.options.getString('newstype');
    log.debug(typeString);
    const type: FantasyPros.NewsType = interaction.options.getString('newstype') == undefined ? FantasyPros.NewsType.ALL : FantasyPros.NewsType[interaction.options.getString('newstype')];
    log.debug(type);
    const remove = interaction.options.getBoolean('remove');

    if (!(interaction.member instanceof GuildMember)) {
      // This should never happen
      log.error(`Invalid member got when running nflnews`);
      await interaction.reply({ephemeral: true, content: 'There was an error processing your command.  Please try again later'});
      return;
    }

    if (this.channels.has(interaction.channelId)) {
      if (remove) {
        this.channels.delete(interaction.channelId);
        await interaction.reply({content: 'This channel has been removed from the NFL News notifications'});
      } else {
        const nflChannel = this.channels.get(interaction.channelId);
        if (type == FantasyPros.NewsType.ALL) {
          nflChannel.types = [type];
        } else {
          nflChannel.types.push(type);
        }
        await interaction.reply({content: `This channel will now receive NFL News notifications for: ${nflChannel.types.map(m => camelCase(FantasyPros.newsNameFromString(m))).join(', ')}`});
      }
    } else {
      this.channels.set(interaction.channelId, {
        channel: interaction.channelId,
        types: [type]
      });
      await interaction.reply({content: `This channel will now receive NFL News notifications for: ${camelCase(FantasyPros.newsNameFromString(type))}`});
    }
    this.saveData();
  }

  // private async sendItem(item: Parser.Item) {
  //   const msg = new MessageEmbed();
  //   msg.setTitle(item.title);
  //   msg.setURL(item.link);
  //   msg.setDescription(item.content.replace('Visit RotoWire.com for more analysis on this update.', '').trim());
  //   for (const channelId of this.channels) {
  //     const channel = this.client.channels.fetch(channelId);
  //     if (channel instanceof TextChannel || channel instanceof DMChannel) {
  //       await channel.send({embeds: [msg]});
  //     }
  //   }
  // }

  private async newsItem(item: FantasyPros.NewsItem) {
    log.debug(item);
    const msg = new EmbedBuilder();
    msg.setTitle(item.title);
    if (item.picture) {
      msg.setImage(item.picture);
    }
    msg.setDescription(item.description);
    msg.setURL(item.url);
    // msg.setFooter(item.fantasyImpact);
    if (item.fantasyImpact) {
      msg.addFields([
        {name: 'Fantasy Impact', value: item.fantasyImpact}
      ]);
    }

    for (const channel of this.channels.values()) {
      if (channel.types.includes(FantasyPros.NewsType.ALL) || (channel.types.includes(item.type))) {
        const chan = await this.client.channels.fetch(channel.channel);
        if (chan instanceof TextChannel || chan instanceof DMChannel) {
          await chan.send({embeds: [msg]});
        }
      }
    }
  }

  private loadData() {
    try {
      const data = readFileSync(join(dataDir(), "nflnews.json"), "utf8");
      const channelIds = JSON.parse(data) as NFLChannel[];
      for (const id of channelIds) {
        this.client.channels.fetch(id.channel).then((channel) => {
          this.channels.set(channel.id, {
            channel: channel.id,
            types: id.types
          });
        });
      }
    } catch(e) {
      this.channels.clear();
    }
    
  }

  private saveData() {
    log.debug(this.channels);
    log.debug(Array.from(this.channels.values()));
    writeFileSync(join(dataDir(), "nflnews.json"), JSON.stringify(Array.from(this.channels.values())));
  }

}