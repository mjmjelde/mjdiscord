import { AbstractCommand } from "./abstract_command";
import { Message, PartialMessage, DMChannel } from "discord.js";
import { getCommand, commandCharacter } from "../util/command";

export class RemindCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return getCommand(msg).toLocaleLowerCase() == "remind";
  }
  execute(msg: Message | PartialMessage): void {
    msg.reply("Do I look like your slave?  Remind yourself");
    return;
  }
  help(): string {
    return commandCharacter() + "remind <msg>: Remind yourself of something"
  }
  
}