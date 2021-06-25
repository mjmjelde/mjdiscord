import { Message, PartialMessage, MessageReaction } from "discord.js";
import { commandCharacter, getCommand } from "../../util/command";
import { CommandArgs } from "../../util/command_args";
import { DiscordCommand } from "../discord_command";
import Axios, { AxiosInstance } from 'axios';
import { get } from "config";
import { randomIntFromInterval } from "../../util/numbers";
import log from "../../util/logger";

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

export class GifCommand extends DiscordCommand {

  private axios: AxiosInstance;
  
  constructor() {
    super();
    this.axios = Axios.create({
      params: {
        key: get('tensor.apikey')
      },
      baseURL: "https://g.tenor.com/v1"
    });
  }
  
  shouldExecute(msg: Message | PartialMessage, args: CommandArgs): boolean {
    return getCommand(args.peek()) == 'gif';
  }

  help(): string {
    return `${commandCharacter()}gif <phrase> : Show random gif for a phrase`;
  }

  execute(msg: Message | PartialMessage, args: CommandArgs): void {
    args.pop();
    if (args.atEnd()) {
      msg.reply("You must include a search phrase for your gif!");
      return;
    }

    const phrase = args.restToString();
    this.axios.get('/search', {
      params: {
        q: phrase
      }
    }).then((response) => {
      const data = response.data as TenorSearchEntity;

      if (data.results) {
        const item = data.results[randomIntFromInterval(0, Math.min(10, data.results.length))];
        const gif = (item.media).find(e => e.gif);
        msg.channel.send(gif.gif.url);
      } else {
        msg.reply(`No gifs found for ${phrase}`);
      }
    }).catch((err) => {
      msg.reply(`There was an error finding your gif`);
      log.error(err);
    });
  }

}