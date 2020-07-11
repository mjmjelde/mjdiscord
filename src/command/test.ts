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
    msg.client.emojis.cache.each((val, key, collection) => {
      console.log(val.id);
    })
    msg.reply('Please click a reaction!').then(async (message) => {
      const emojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
      const filter = (reaction, user) => {
        return emojis.includes(reaction.emoji.name);
        // return true;
      }
      for (const emoji of emojis) {
        await message.react(emoji);
      }
      message.awaitReactions(filter, {time: 10 * 1000}).then((collected) => {
        collected.forEach((reaction) => {
          console.log(reaction.emoji.name);
        })
        if(message.channel.type != "dm")
          message.reactions.removeAll();
        console.log('Done listening');
      });
      console.log('Listening for reactions');
    })
  }
}