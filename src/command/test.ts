import { AbstractCommand } from "./abstract_command";
import { Message, PartialMessage } from "discord.js";
import { getCommand } from "../util/command";

export class TestCommand implements AbstractCommand {
  help(): string {
    return '';
  }

  should_execute(msg: Message | PartialMessage): boolean {
    return getCommand(msg) == 'test';
  }

  execute(msg: Message | PartialMessage) {
    msg.react('715608842255466578');
  }
}