import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { AbstractCommand } from "./abstract_command";

export class WelcomeCommand extends AbstractCommand {
  get name(): string {
    return "welcome";
  }

  guildCommands(): SlashCommandBuilder[] {
    return [
      new SlashCommandBuilder().setName('welcome').setDescription('Welcome command'),
    ];
  }

  globalCommands(): SlashCommandBuilder[] {
    return [
      
    ]
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == 'welcome';
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply({content: 'Welcome to MjBot 2.0!  All commands are now slash commands.  Get started by typing a slash (/) !!!\n\nWarning: I have no volume controls anymore, I may be loud in voice chats...'})
  }

}