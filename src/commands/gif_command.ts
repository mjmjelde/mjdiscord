import { SlashCommandBuilder } from "@discordjs/builders";
import Axios, { AxiosInstance } from "axios";
import config from "config";
import { CommandInteraction } from "discord.js";
import log from "../util/logger";
import { randomIntFromInterval } from "../util/numbers";
import { AbstractCommand } from "./abstract_command";

export interface TenorSearchEntity {
  weburl: string;
  results?: (ResultsEntity)[] | null;
  next: string;
}
export interface ResultsEntity {
  tags?: (null)[] | null;
  url: string;
  media?: (MediaEntity)[] | null;
  created: number;
  shares: number;
  itemurl: string;
  composite?: null;
  hasaudio: boolean;
  title: string;
  id: string;
  hascaption?: boolean | null;
}
export interface MediaEntity {
  tinygif: TinygifOrGif;
  gif: TinygifOrGif;
  mp4: Mp4;
}
export interface TinygifOrGif {
  url: string;
  dims?: (number)[] | null;
  preview: string;
  size: number;
}
export interface Mp4 {
  url: string;
  dims?: (number)[] | null;
  duration: number;
  preview: string;
  size: number;
}

export class GifCommand extends AbstractCommand {

  private axios: AxiosInstance;

  constructor() {
    super();
    this.axios = Axios.create({
      params: {
        key: config.get('tenor.apikey')
      },
      baseURL: "https://g.tenor.com/v1"
    });
  }

  get name(): string {
    return "Gif Command";
  }

  guildCommands(): SlashCommandBuilder[] {
    const command = new SlashCommandBuilder().setName('gif').setDescription('Display gifs from the internet');
    command.addStringOption(option => option.setName("search").setDescription("What to search for").setRequired(true));
    return [
      command
    ];
  }
  globalCommands(): SlashCommandBuilder[] {
    return [];
  }
  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == "gif";
  }
  async execute(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand())
      return;
    await interaction.deferReply();
    const searchString = (interaction.options).getString("search");
    log.debug(`Gif search term: ${searchString}`);
    this.axios.get('/search', {
      params: {
        q: searchString
      }
    }).then(async (response) => {
      const data = response.data as TenorSearchEntity;

      if (data.results) {
        const item = data.results[randomIntFromInterval(0, Math.min(10, data.results.length))];
        const gif = (item.media).find(e => e.gif);
        await interaction.editReply(gif.gif.url);
      } else {
        await interaction.editReply(`No gifs found for: ${searchString}`);
      }
    });
  }
  

}