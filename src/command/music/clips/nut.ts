import { AbstractCommand } from "../../abstract_command";

import { getCommand, commandCharacter } from "../../../util/command";
import { MjGuildInterface } from "../../../lib/guild_types";
import { Message, PartialMessage, DMChannel } from "discord.js";

export class NutCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return ['nut'].includes(getCommand(msg).toLowerCase());
  }
  execute(msg: Message | PartialMessage): void {
    if (msg.channel instanceof DMChannel) {
      msg.reply("Please use this command in a guild channel");
      return;
    }

    if (!msg.member.voice.channel) {
      msg.reply("You must be in a voice channel to use this command!");
      return;
    }

    const command = getCommand(msg).toLowerCase();

    const guild = msg.guild as MjGuildInterface;
    guild.music.addQueue({
      textChannel: msg.channel,
      voiceChannel: msg.member.voice.channel,
      sendToText: false,
      song: {
        id: '0',
        site: 'file',
        url: 'nut'
      }
    });
    guild.music.play();
  }
  help(): string {
    return commandCharacter() + "nut : Plays a nut sound";
  }
}