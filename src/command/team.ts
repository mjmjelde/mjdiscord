import { AbstractCommand } from "./abstract_command";

import { Message, PartialMessage, Client, DMChannel, Collection, Snowflake, GuildMember, MessageEmbed, GuildChannel, VoiceChannel } from "discord.js";
import { commandCharacter, getCommand } from "../util/command";
import { CommandArgs } from "../util/command_args";

export class TeamCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return getCommand(msg).toLowerCase() == "team";
  }

  async execute(msg: Message | PartialMessage) {
    if (msg.channel instanceof DMChannel) {
      msg.reply("You must be in a guild channel to run this command");
      return;
    }

    if (!msg.member.voice.channel) {
      msg.reply("You must be in a voice channel to use this command!");
      return;
    }

    const args = new CommandArgs(msg.content);
    args.pop();
    let numTeams = 2;
    if (!args.atEnd()) {
      try {
        numTeams = parseInt(args.pop());
      } catch (e) {
        numTeams = 2;
      }
    }

    const members = this.shuffle(msg.member.voice.channel.members);
    const teams = this.chunkify(members, numTeams);

    const reply = new MessageEmbed()
      .setTitle("Teams");
    for (let i = 0; i < teams.length; i++) {
      reply.addField(`Team ${i + 1}`, teams[i].length > 0 ? teams[i].map(gm => gm.displayName).join('\n') : "None", true);
    }
    if (teams.length <= this.channels(msg).size && msg.guild.me.hasPermission("MOVE_MEMBERS")) {
      reply.setFooter(`Move the teams to different channels? (Click reaction)`);
    }
    const replyMsg = await msg.channel.send(reply);
    if (teams.length <= this.channels(msg).size && msg.guild.me.hasPermission("MOVE_MEMBERS")) {
      this.askToMove(replyMsg, teams, msg.author.id);
    }

  }

  help(): string {
    return commandCharacter() + "team <number> : Generates <number> of teams of who is in the current voice channel (default 2)";
  }

  private shuffle(members: Collection<Snowflake, GuildMember>): GuildMember[] {
    const arr = members.array();
    let currentIndex = arr.length, tempValue: GuildMember, randomIndex: number;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = tempValue;
    }

    return arr;
  }

  private chunkify(members: GuildMember[], numTeams: number): GuildMember[][] {
    if (numTeams < 2) {
      return [members];
    }
    const len = members.length;
    const out = [];
    let i = 0;
    let size: number;

    while (i < len) {
      size = Math.ceil((len - i) / numTeams--);
      out.push(members.slice(i, i += size));
    }

    return out;
  }

  private channels(msg: Message | PartialMessage): Collection<string, GuildChannel> {
    return msg.guild.channels.cache.filter(channel => channel instanceof VoiceChannel && channel.name.toLowerCase().startsWith("mw"));
  }

  private async askToMove(reply: Message | PartialMessage, teams: GuildMember[][], userId: string) {
    await reply.react('👍');
    await reply.react('👎');
    const filter = (reaction, user) => {
      return ['👍', '👎'].includes(reaction.emoji.name) && user.id == userId;
    }
    reply.awaitReactions(filter, {time: 5 * 60 * 1000, max: 1}).then( async (collected) => {
      if (collected.first() && (collected.first().emoji.name == '👍')) {
        console.log("Moving everyone to correct channels...");
        const chans = this.channels(reply);
        for (let i = 0; i < teams.length; i++) {
          for (const gm of teams[i]) {
            await gm.voice.setChannel(chans[i]);
          }
        }
      } else {
        console.log("Not moving anyone...");
      }
      await reply.reactions.removeAll();
    })
  }

}