import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import musicService from "../../services/music";
import { AbstractCommand } from "../abstract_command";

export class StopCommand extends AbstractCommand {
  
  get name(): string {
    return 'stop';
  }

  guildCommands(): SlashCommandBuilder[] {
    return [
      new SlashCommandBuilder().setName('stop').setDescription('Stops audio and clears the queue'),
    ]
  }

  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == 'stop'
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    const guildMusic = musicService.getService(interaction.guild);
    guildMusic.stop();
    await interaction.reply('Stopping music player...');
  }

}