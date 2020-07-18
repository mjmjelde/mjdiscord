import { AbstractCommand } from "./abstract_command";

import { Message, PartialMessage, MessageEmbed, User, MessageReaction } from "discord.js";
import { commandCharacter, getCommand } from "../util/command";
import { delay } from "../util/time";

const frames = [
  '(-°□°)-  ┬─┬',
  '(╯°□°)╯    ]',
  '(╯°□°)╯  ︵  ┻━┻',
  '(╯°□°)╯       [',
  '(╯°□°)╯           ┬─┬'
]

export class TableFlipCommand implements AbstractCommand {

  should_execute(msg: Message | PartialMessage): boolean {
    return getCommand(msg).toLowerCase() == "tableflip";
  }

  async execute(msg: Message | PartialMessage) {
    const message = await msg.channel.send('(\\\\°□°)\\\\  ┬─┬');
    for (const frame of frames) {
      await delay(100);
      await message.edit(frame);
    }
  }

  help(): string {
    return commandCharacter() + "tableflip : Flips a table";
  }

}