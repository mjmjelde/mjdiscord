import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { AbstractCommand } from "./abstract_command";

export class MiddleFingerCommand extends AbstractCommand {
  
  get name(): string {
    return 'Middlefinger';
  }

  guildCommands(): SlashCommandBuilder[] {
    return [];
  }

  globalCommands(): SlashCommandBuilder[] {
    return [
      new SlashCommandBuilder().setName('middlefinger').setDescription('Shows a middle finger'),
    ]
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == 'middlefinger';
  }

  async execute(interaction: CommandInteraction): Promise<boolean> {
    await interaction.reply({content: "https://tenor.com/view/baby-girl-middle-finger-mood-screw-you-leave-me-alone-gif-10174031"})
    return true;
  }

}