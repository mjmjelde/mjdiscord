import { get } from "config";
import { DMChannel, Message, PartialMessage } from "discord.js";
import { fstat, readFileSync, Stats, watchFile } from "fs";
import { MjGuildInterface } from "../../../lib/guild_types";
import { commandCharacter, getCommand } from "../../../util/command";
import { AbstractCommand } from "../../abstract_command";

interface SoundFile {
  name: string,
  help: string
}

export class FileSoundsCommands implements AbstractCommand {

  private commands: SoundFile[];

  constructor() {
    watchFile(get('sound_clip_file'), (curr: Stats, prev: Stats) => {
      console.log('Reloading Sound File Commands');
      this.commands = JSON.parse(readFileSync(get("sound_clip_file"), 'utf8'));
    });

    this.commands = JSON.parse(readFileSync(get("sound_clip_file"), 'utf8'));
  }

  should_execute(msg: Message | PartialMessage): boolean {
    return this.commands.map(f => f.name).includes(getCommand(msg).toLowerCase()) ;
  }

  execute(msg: Message | PartialMessage): void {
    const command = getCommand(msg).toLowerCase();
    let sound : SoundFile = undefined;
    for (const com of this.commands) {
      if(command == com.name) {
        sound = com;
      }
    }
    if (sound == undefined) {
      msg.reply("Sound command not found!");
      return;
    }

    if (msg.channel instanceof DMChannel) {
      msg.reply("Please use this command in a guild channel");
      return;
    }

    if (!msg.member.voice.channel) {
      msg.reply("You must be in a voice channel to use this command!");
      return;
    }

    const guild = msg.guild as MjGuildInterface;
    guild.music.addQueue({
      textChannel: msg.channel,
      voiceChannel: msg.member.voice.channel,
      sendToText: false,
      song: {
        id: '0',
        site: 'file',
        url: sound.name,
      }
    });
    guild.music.play();
  }

  help(): string {
    let helpString: string = "";
    for (const command of this.commands) {
      helpString += commandCharacter() + command.help + "\n";
    }
    if (helpString.endsWith("\n")) {
      helpString = helpString.substring(0, helpString.length - 1);
    }
    return helpString;
  }

}