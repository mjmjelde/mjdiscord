import { AbstractCommand } from "./abstract_command";
import { Message, PartialMessage, DMChannel } from "discord.js";
import { getCommand, commandCharacter } from "../util/command";

export class RemindCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return getCommand(msg).toLowerCase() == "remind";
  }
  execute(msg: Message | PartialMessage): void {
    if (msg.author.id == "134485404576514048") {
      msg.reply("Sure thing! I will remind you later.");
      return;
    }
    msg.reply("Do I look like your slave?  Remind yourself");
    return;
  }
  help(): string {
    return commandCharacter() + "remind <msg>: Remind yourself of something"
  }
  
}