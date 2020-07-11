import { AbstractCommand } from "./abstract_command";

import { Message, PartialMessage, Client, DMChannel, Collection, Snowflake, GuildMember, MessageEmbed } from "discord.js";
import { commandCharacter, getCommand } from "../util/command";
import { CommandArgs } from "../util/command_args";

export class TeamCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return getCommand(msg).toLowerCase() == "team";
  }

  execute(msg: Message | PartialMessage): void {
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
    msg.channel.send(reply);
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

}