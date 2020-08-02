import { AbstractCommand } from "../abstract_command";

import { getCommand, commandCharacter } from "../../util/command";
import { MjGuildInterface } from "../../lib/guild_types";
import { Message, PartialMessage, DMChannel } from "discord.js";

export class WTFCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return ['wtf', 'wtfs'].includes(getCommand(msg).toLowerCase());
  }
  execute(msg: Message | PartialMessage): void {
    if (msg.channel instanceof DMChannel) {
      msg.reply("Please use this command in a guild channel");
      return;
    }

    const command = getCommand(msg).toLowerCase();

    const guild = msg.guild as MjGuildInterface;
    if (command == 'wtf') {
      guild.music.addQueue({
        textChannel: msg.channel,
        voiceChannel: msg.member.voice.channel,
        sendToText: false,
        song: {
          id: '0',
          site: 'file',
          url: 'wtf-long'
        }
      });
    } else {
      guild.music.addQueue({
        textChannel: msg.channel,
        voiceChannel: msg.member.voice.channel,
        sendToText: false,
        song: {
          id: '0',
          site: 'file',
          url: 'wtf-short'
        }
      });
    }
    guild.music.play();
  }
  help(): string {
    return commandCharacter() + "<wtf|wtfs> : Plays a long or short wtf sound";
  }
}