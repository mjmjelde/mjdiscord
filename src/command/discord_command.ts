import { Message, MessageReaction, PartialMessage } from "discord.js";
import { CommandArgs } from "../util/command_args";

export abstract class DiscordCommand {

  abstract shouldExecute(msg: Message | PartialMessage, args: CommandArgs): boolean;

  abstract execute(msg: Message | PartialMessage, args: CommandArgs): void;
  
  abstract help(): string | undefined;

  onMessageReactionAdded(msg: MessageReaction): void {

  }
}