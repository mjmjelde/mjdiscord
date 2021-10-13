import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import musicService from "../../services/music";
import { AbstractCommand } from "../abstract_command";

export class SkipCommand extends AbstractCommand {
  
  get name(): string {
    return "skip"
  }
  
  guildCommands(): SlashCommandBuilder[] {
    return [
      new SlashCommandBuilder().setName('skip').setDescription('Skips the current media'),
    ];
  }

  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == 'skip';
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    const guildMusic = musicService.getService(interaction.guild);
    guildMusic.skip();
    await interaction.reply('Skipping song...');
  }
  
}