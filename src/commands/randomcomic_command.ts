import { SlashCommandBuilder } from "@discordjs/builders";
import axios from "axios";
import { createCanvas, loadImage } from "canvas";
import { CommandInteraction, MessageAttachment } from "discord.js";
import parse from "node-html-parser";
import log from "../util/logger";
import { AbstractCommand } from "./abstract_command";

export class RandomComicCommand extends AbstractCommand {
  
  get name(): string {
    return "Random Comic";
  }

  guildCommands(): SlashCommandBuilder[] {
    return [
      new SlashCommandBuilder().setName("randomcomic").setDescription('Generates a random comic to be displayed'),
    ]
  }

  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == 'randomcomic';
  }

  async execute(interaction: CommandInteraction): Promise<boolean> {
    await interaction.deferReply();
    axios('http://explosm.net/rcg/view/').then(async (resp) => {
          const html = parse(resp.data);
          const imgs = html.querySelector('div.rcg-panels').querySelectorAll('img');
          const img1 = await loadImage(imgs[0].attributes.src);
          const img2 = await loadImage(imgs[1].attributes.src);
          const img3 = await loadImage(imgs[2].attributes.src);
          const newImg = createCanvas(img1.width * 3, img1.height);
          const ctx = newImg.getContext('2d');
          ctx.drawImage(img1, 0, 0);
          ctx.drawImage(img2, img1.width, 0);
          ctx.drawImage(img3, img1.width * 2, 0);

          const attachment = new MessageAttachment(newImg.toBuffer());
          await interaction.editReply({files: [attachment]});
        }).catch(async (err) => {
          log.error(err);
          await interaction.editReply("There was an error making your random comic... try again later");
        });
    return true;
  }

}