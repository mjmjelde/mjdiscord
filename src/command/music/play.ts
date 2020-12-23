import { AbstractCommand } from "../abstract_command";
import { Message, PartialMessage, DMChannel } from "discord.js";
import { CommandArgs } from "../../util/command_args";
import * as ytpl from "ytpl";
import * as ytdl from "ytdl-core";
import { MusicItem } from "../../lib/music_types";
import { MjGuildInterface } from "../../lib/guild_types";
import { getCommand, commandCharacter } from "../../util/command";

export class PlayCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return getCommand(msg) == "play";
  }

  async execute(msg: Message | PartialMessage) {
    if (msg.channel instanceof DMChannel) {
      msg.reply("Please use this command in a guild channel");
      return;
    }

    if (!msg.member.voice.channel) {
      msg.reply("You must be in a voice channel to use this command!");
      return;
    }

    const args = new CommandArgs(msg.client, msg.content);
    args.pop();
    const song = args.pop();
    let url: URL;
    try {
      url = new URL(song);
    } catch (e) {
      msg.reply('Invalid song request.  Please send a valid URL');
    }

    if (/(music.)?youtu(be.com|.be)/.test(url.host)) {
      if (ytpl.validateID(url.toString())) {
        await this.askToAddYoutubePlaylist(msg, url);
      } else {
        await this.addYoutubeSong(msg, url);
      }
    } else {
      msg.reply("Invalid song.  Please try a valid URL");
    }
  }

  private async askToAddYoutubePlaylist(msg: Message | PartialMessage, url: URL) {
    const reply = await msg.reply("This URL contains a playlist.  Would you like to add the entire playlist?");
    await reply.react('👍');
    await reply.react('👎');
    const filter = (reaction, user) => {
      return ['👍', '👎'].includes(reaction.emoji.name) && user.id == msg.author.id;
    }
    reply.awaitReactions(filter, {time: 15 * 1000, max: 1}).then( async (collected) => {
      if (!collected.first() || (collected.first().emoji.name == '👍')) {
        await this.addYoutubePlaylist(msg, url);
      } else {
        await this.addYoutubeSong(msg, url);
      }
      await reply.reactions.removeAll();
    });
  }

  private async addYoutubePlaylist(msg: Message | PartialMessage, url: URL) {
    const id = await ytpl.getPlaylistID(url.toString());
    const results = await ytpl(id);
    const songs: MusicItem[] = [];
    results.items.forEach((item) => {
      songs.push({
        textChannel: msg.channel,
        voiceChannel: msg.member.voice.channel,
        sendToText: true,
        song: {
          id: item.id,
          site: 'youtube',
          url: item.url
        }
      });
    });
    const guild = msg.guild as MjGuildInterface;
    guild.music.addQueue(...songs);
    msg.reply("Playlist has been added to the queue");
    guild.music.play();
  }

  private async addYoutubeSong(msg: Message | PartialMessage, url: URL) {
    const guild = msg.guild as MjGuildInterface;
    guild.music.addQueue({
      textChannel: msg.channel,
      voiceChannel: msg.member.voice.channel,
      sendToText: true,
      song: {
        id: ytdl.getVideoID(url.toString()),
        site: 'youtube',
        url: url.toString()
      }
    });
    msg.reply("Song has been added to the queue");
    guild.music.play();
  }

  help(): string {
    return commandCharacter() + "play : Add a URL to the queue (and start playing if nothing is queued in front of it)";
  }

}