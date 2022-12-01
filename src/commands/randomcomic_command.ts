import { SlashCommandBuilder } from "@discordjs/builders";
import axios from "axios";
import { AttachmentBuilder, CommandInteraction } from "discord.js";
import parse from "node-html-parser";
import sharp from "sharp";
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

  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.deferReply();
    axios('https://explosm.net/api/get-random-panels').then(async (resp) => {
      const jsonResp = resp.data;
      const img1URL = `https://rcg-cdn.explosm.net/panels/${jsonResp.panels[0].filename}`
      const img2URL = `https://rcg-cdn.explosm.net/panels/${jsonResp.panels[1].filename}`
      const img3URL = `https://rcg-cdn.explosm.net/panels/${jsonResp.panels[2].filename}`
      const img1 = sharp((await axios({ url: img1URL, responseType: 'arraybuffer'})).data);
      const img2 = sharp((await axios({ url: img2URL, responseType: 'arraybuffer'})).data);
      const img3 = sharp((await axios({ url: img3URL, responseType: 'arraybuffer'})).data);
      const img1Meta = await img1.metadata();
      const newImg = sharp({create: {width: img1Meta.width * 3, height: img1Meta.height, channels: 4, background: {r: 0, g: 0, b: 0, alpha: 0}}});
      newImg.composite([
        { input: await img1.toBuffer(), left: 0, top: 0 },
        { input: await img2.toBuffer(), left: img1Meta.width, top: 0 },
        { input: await img3.toBuffer(), left: img1Meta.width * 2, top: 0 }
      ]).withMetadata().webp( { quality: 90 });

      const attachment = new AttachmentBuilder(await newImg.toBuffer());
      await interaction.editReply({files: [attachment]});
      newImg.destroy();
      img1.destroy();
      img2.destroy();
      img3.destroy();
    }).catch(async (err) => {
      log.error(err);
      await interaction.editReply("There was an error making your random comic... try again later");
    });
  }

}