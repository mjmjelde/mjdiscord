import { AbstractCommand } from "./abstract_command";
import { Message, PartialMessage, DMChannel, MessageEmbed, CollectorFilter } from "discord.js";
import { getCommand, commandCharacter } from "../util/command";
import { CommandArgs } from "../util/command_args";
import { stringToMilliseconds } from "../util/time";

export class VoteCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return ['vote'].includes(getCommand(msg).toLocaleLowerCase());
  }
  
  async execute(msg: Message | PartialMessage) {
    if (msg.channel instanceof DMChannel) {
      msg.reply("You must be in a guild channel to run this command");
      return;
    }

    const args = new CommandArgs(msg.client, msg.content);
    args.pop(); //Pop command off top first

    let time = stringToMilliseconds(args.pop());
    if (time < 0) {
      time = 5 * 60 * 1000;
      args.putBack();
    }

    const message = new MessageEmbed();
    message.setTitle("Vote System");
    message.addField("Question", args.restToString());
    message.setFooter("Click reaction to case your vote!");
    
    const replyMsg = await msg.channel.send(message);
    await replyMsg.react('👍');
    await replyMsg.react('👎');

    let amountFor = 0;
    let amountAgainst = 0;

    const filter: CollectorFilter = (reaction, user) => {
      return ['👍', '👎'].includes(reaction.emoji.name);
    }

    const collector = replyMsg.createReactionCollector(filter, {time: time});
    collector.on('collect', (reaction) => {
      if (reaction.emoji.name == '👍') {
        amountFor++;
      } else {
        amountAgainst++;
      }
    });

    collector.on('end', async collected => {
      await replyMsg.reactions.removeAll();
      if (amountFor > amountAgainst) {
        msg.channel.send(`The vote passes! With ${amountFor} for and ${amountAgainst} against!`);
      } else {
        msg.channel.send(`The vote fails! With ${amountFor} for and ${amountAgainst} against`);
      }
    });

    return;
  }
  help(): string {
    return commandCharacter() + "vote [time] <msg>: Start a vote for your msg with optional time"
  }
  
}