import { DiscordCommand } from "../discord_command";
import { getCommand, commandCharacter } from "../../util/command";
import { MjGuildInterface } from "../../lib/guild_types";
import { Message, PartialMessage, DMChannel } from "discord.js";
import { CommandArgs } from "../../util/command_args";

export class SkipCommand extends DiscordCommand {
  shouldExecute(msg: Message | PartialMessage, args: CommandArgs): boolean {
    return getCommand(args.peek()) == "skip";
  }
  execute(msg: Message | PartialMessage, args: CommandArgs): void {
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

