import { getCommand, commandCharacter } from "../../util/command";
import { MjGuildInterface } from "../../lib/guild_types";
import { Message, PartialMessage, DMChannel } from "discord.js";
import { DiscordCommand } from "../discord_command";
import { CommandArgs } from "../../util/command_args";

export class StopCommand extends DiscordCommand {
  shouldExecute(msg: Message | PartialMessage, args: CommandArgs): boolean {
    return getCommand(args.peek()) == "stop";
  }
  execute(msg: Message | PartialMessage, args: CommandArgs): void {
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