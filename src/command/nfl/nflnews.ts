import { AbstractCommand } from "../abstract_command";
import { Message, PartialMessage, Client, Channel, GuildChannel, MessageEmbed, TextChannel, DMChannel } from 'discord.js'
import { getCommand, commandCharacter } from "../../util/command";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { dataDir } from "../../util/data";
import { RSSWatcher } from "../../lib/rss_watcher";
import Parser = require("rss-parser");

export class NFLNewsCommand implements AbstractCommand {

  private botClient: Client;
  private channels: Channel[];
  private rsswatcher: RSSWatcher;

  constructor(client: Client) {
    this.botClient = client;
    this.loadData();
    this.rsswatcher = new RSSWatcher('https://www.rotowire.com/rss/news.php?sport=NFL');
    this.rsswatcher.on('item', this.sendItem.bind(this));
  }

  should_execute(msg: Message | PartialMessage): boolean {
    return ['nflnews'].includes(getCommand(msg).toLowerCase());
  }

  execute(msg: Message | PartialMessage): void {
    if (msg.channel instanceof GuildChannel && !msg.member.hasPermission('MANAGE_CHANNELS')) {
      msg.reply("Sorry you do not have permission to toggle NFL news in this channel");
      return;
    }
    
    if (this.channels.includes(msg.channel)) {
      this.channels.splice(this.channels.indexOf(msg.channel, 1));
      msg.reply('This channel has been removed from the NFL News notifications');
    } else {
      this.channels.push(msg.channel);
      msg.reply('This channel will now receive NFL News notifications');
    }
  }

  help(): string {
    return `${commandCharacter()}nflnews : Toggles NFL News in the channel`;
  }

  private sendItem(item: Parser.Item) {
    const msg = new MessageEmbed();
    msg.setTitle(item.title);
    msg.setURL(item.link);
    msg.setDescription(item.content.replace('Visit RotoWire.com for more analysis on this update.', '').trim());
    for (const channel of this.channels) {
      if (channel instanceof TextChannel || channel instanceof DMChannel) {
        channel.send(msg);
      }
    }
  }

  private loadData() {
    try {
      const data = readFileSync(join(dataDir(), "nflnews.json"), "utf8");
      const channelIds = JSON.parse(data);
      this.channels = [];
      for (const id of channelIds) {
        this.botClient.channels.fetch(id).then((channel) => {
          this.channels.push(channel);
        });
      }
    } catch(e) {
      this.channels = [];
    }
    
  }

  private saveData() {
    const channelIds = this.channels.map(channel => channel.id);
    writeFileSync(join(dataDir(), "nflnews.json"), JSON.stringify(channelIds));
  }

}