import { SlashCommandBuilder } from "@discordjs/builders";
import axios from "axios";
import { CommandInteraction } from "discord.js";
import log from "../util/logger";
import { AbstractCommand } from "./abstract_command";

export class DadCommand extends AbstractCommand {
  
  get name(): string {
    return "Dad Command"
  }

  guildCommands(): SlashCommandBuilder[] {
    return [
      new SlashCommandBuilder().setName('dad').setDescription('Show a random dad joke'),
    ]
  }

  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == 'dad';
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    axios("https://icanhazdadjoke.com/", {
      headers: {
        "Accept": "application/json",
        "User-Agent": "MjBot",
      }
    }).then(async resp => {
      await interaction.reply({content: resp.data.joke});
    }).catch(async err => {
      log.error(err);
      await interaction.reply({content: 'Error getting dad joke.  Try again later'});
    });
  }

}