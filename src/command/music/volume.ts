import { AbstractCommand } from "../abstract_command";
import { getCommand, commandCharacter } from "../../util/command";
import { MjGuildInterface } from "../../lib/guild_types";
import { Message, PartialMessage, DMChannel } from "discord.js";
import { CommandArgs } from "../../util/command_args";

export class VolumeCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return getCommand(msg) == "volume";
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

    const commandArgs = new CommandArgs(msg.client, msg.content);
    commandArgs.pop();
    const vol = parseFloat(commandArgs.pop());

    const guild = msg.guild as MjGuildInterface;
    guild.music.setVolume(vol);
  }
  help(): string {
    return commandCharacter() + "volume <number> : Sets the volume of the bot";
  }

}