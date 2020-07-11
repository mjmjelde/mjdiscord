import { AbstractCommand } from "../abstract_command";
import { getCommand, commandCharacter } from "../../util/command";
import { MjGuildInterface } from "../../lib/guild_types";
import { Message, PartialMessage, DMChannel } from "discord.js";

export class SkipCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return getCommand(msg) == "skip";
  }
  execute(msg: Message | PartialMessage): void {
    if (msg.channel instanceof DMChannel) {
      msg.reply("Please use this command in a guild channel");
      return;
    }

    const guild = msg.guild as MjGuildInterface;
    guild.music.skip();
    msg.channel.send("Song has been skipped");
  }
  help(): string {
    return commandCharacter() + "skip : Skip current playing song";
  }
}

