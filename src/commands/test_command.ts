import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Interaction } from "discord.js";
import { AbstractCommand } from "./abstract_command";

export class TestCommand extends AbstractCommand {
  
  get name(): string {
    return "TestCommand";
  }

  guildCommands(): SlashCommandBuilder[] {
    return [
      new SlashCommandBuilder().setName("testcommand").setDescription("Just a test command")
    ]
    
  }
  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == "testcommand";
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply("Test command successful!");
  }

}