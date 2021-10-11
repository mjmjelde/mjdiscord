import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Interaction } from "discord.js";

export abstract class AbstractCommand {
  abstract readonly name: string;

  abstract guildCommands(): SlashCommandBuilder[];

  abstract globalCommands(): SlashCommandBuilder[];

  abstract shouldExecute(interaction: CommandInteraction): boolean;

  abstract execute(interaction: CommandInteraction): Promise<void>;
}