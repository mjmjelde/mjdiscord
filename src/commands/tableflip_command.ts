import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { delay } from "../util/time";
import { AbstractCommand } from "./abstract_command";

const frames = [
  '(-°□°)-  ┬─┬',
  '(╯°□°)╯    ]',
  '(╯°□°)╯  ︵  ┻━┻',
  '(╯°□°)╯       [',
  '(╯°□°)╯           ┬─┬'
]

export class TableFlipCommand extends AbstractCommand {
  
  get name(): string {
    return "Tableflip";
  }

  guildCommands(): SlashCommandBuilder[] {
    return [
      new SlashCommandBuilder().setName('tableflip').setDescription('Flip a table in chat'),
    ]
  }

  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == 'tableflip';
  }

  async execute(interaction: CommandInteraction): Promise<boolean> {
    await interaction.reply('(\\\\°□°)\\\\  ┬─┬');
    for (const frame of frames) {
      await delay(100);
      await interaction.editReply(frame);
    }
    return true;
  }

}