import { Client, Message, PartialMessage } from "discord.js";
import { MjDiscord } from "../main";
import { getCommand } from "../util/command";
import { CommandArgs } from "../util/command_args";
import { DiscordCommand } from "./discord_command";

export class HelpCommand extends DiscordCommand {

  private client: MjDiscord;

  constructor(client: MjDiscord) {
    super();
    this.client = client;
  } 

  shouldExecute(msg: Message | PartialMessage, args: CommandArgs): boolean {
    return getCommand(args.peek()) == 'help';
  }
  
  execute(msg: Message | PartialMessage, args: CommandArgs): void {
    let helpStr = '';
    this.client.commands.forEach(command => {
      const h = command.help();
      if (h != undefined) {
        helpStr += `${h}\n`;
      }
    });
    msg.author.send(helpStr);
    msg.reply('Check your messages for command help');
  }

  help(): string {
    return undefined;
  }

}