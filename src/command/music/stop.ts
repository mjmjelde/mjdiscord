import { AbstractCommand } from "../abstract_command";
import { getCommand, commandCharacter } from "../../util/command";
import { MjGuildInterface } from "../../lib/guild_types";
import { Message, PartialMessage, DMChannel } from "discord.js";

export class StopCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return getCommand(msg) == "stop";
  }
  execute(msg: Message | PartialMessage): void {
    if (msg.channel instanceof DMChannel) {
      msg.reply("Please use this command in a guild channel");
      return;
    }

    const guild = msg.guild as MjGuildInterface;
    guild.music.stop();
  }
  help(): string {
    return commandCharacter() + "stop : Stop playing music and clear queue";
  }

}