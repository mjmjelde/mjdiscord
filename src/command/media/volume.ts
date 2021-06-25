import { DiscordCommand } from "../discord_command";
import { getCommand, commandCharacter } from "../../util/command";
import { MjGuildInterface } from "../../lib/guild_types";
import { Message, PartialMessage, DMChannel } from "discord.js";
import { CommandArgs } from "../../util/command_args";

export class VolumeCommand extends DiscordCommand {
  shouldExecute(msg: Message | PartialMessage, args: CommandArgs): boolean {
    return getCommand(args.peek()) == "volume";
  }

  async execute(msg: Message | PartialMessage, args: CommandArgs): Promise<void> {
    if (msg.channel instanceof DMChannel) {
      msg.reply("Please use this command in a guild channel");
      return;
    }

    if (!msg.member.voice.channel) {
      msg.reply("You must be in a voice channel to use this command!");
      return;
    }

    const guild = msg.guild as MjGuildInterface;

    args.pop();
    if (args.atEnd()) {
      msg.reply(`Volume is currently ${guild.music.volume}`);
      return;
    }
    
    const vol = parseFloat(args.pop());
    await guild.music.setVolume(vol);
    msg.reply(`Volume set to ${vol}`);
  }

  help(): string {
    return commandCharacter() + "volume <number> : Sets the volume of the bot";
  }

}