import { SlashCommandBuilder } from "@discordjs/builders";
import { get } from "config";
import { CommandInteraction, GuildMember } from "discord.js";
import { readFileSync } from "fs";
import musicService from "../../services/music";
import { Track } from "../../services/music/music_types";
import log from "../../util/logger";
import { AbstractCommand } from "../abstract_command";

interface SoundFile {
  name: string,
  help: string
}

export class FileSoundsCommand extends AbstractCommand {

  private commands: SoundFile[];
  
  get name(): string {
    return 'filesounds'
  }

  guildCommands(): SlashCommandBuilder[] {
    this.commands = JSON.parse(readFileSync(get('sound_clip_file'), 'utf-8')) as SoundFile[];
    const commandBuilders: SlashCommandBuilder[] = [];
    for (const commandJson of this.commands) {
      commandBuilders.push(
        new SlashCommandBuilder().setName(commandJson.name).setDescription(commandJson.help)
      )
    }
    return commandBuilders;
  }

  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return this.commands.map(c => c.name).includes(interaction.commandName);
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    const sound = this.commands.find(c => c.name == interaction.commandName);
    if (sound == undefined) {
      // This should never happen!
      await interaction.reply({ephemeral: true, content: 'Sound not found!'});
      return;
    }

    if (!(interaction.member instanceof GuildMember)) {
      await interaction.reply({ephemeral: true, content: 'Please ensure you are in a guild chat channel!'});
      return;
    }

    if (!(interaction.member.voice.channelId)) {
      await interaction.reply({ephemeral: true, content: 'You must be in a voice channel to use this command!'});
      return;
    }

    const guildMusic = musicService.getService(interaction.guild);
    guildMusic.enqueue(new Track({
      id: '0',
      voiceChannelId: interaction.member.voice.channelId,
      site: 'fileopus',
      url: sound.name,
      onStart: () => {},
      onFinish: () => {},
      onError: (error) => {log.error(error)}
    }));
    await interaction.reply({content: `Enqueued ${sound.name}`});
  }
  
}