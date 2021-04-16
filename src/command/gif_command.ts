import * as discord from 'discord.js';
import { AbstractCommand } from './abstract_command';
import * as config from 'config';
import * as giphyapi from 'giphy-api';
import { commandCharacter, getCommand } from '../util/command';
import { CommandArgs } from '../util/command_args';
import Axios, { AxiosInstance } from 'axios';
import { randomIntFromInterval } from '../util/numbers';

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
  

export class GifCommand implements AbstractCommand {

    giphy = null;
    private axios: AxiosInstance;

    constructor(){
        this.giphy = new giphyapi(config.get("giphy.apikey"));
        this.axios = Axios.create({
            params: {
                key: config.get("tenor.apikey")
            },
            baseURL: "https://g.tenor.com/v1"
        });
    }

    help() {
        return commandCharacter() + 'gif <keyword> : Show random gif for a keyword';
    }

    should_execute(msg: discord.Message): boolean {
        return getCommand(msg).toLowerCase() == 'gif';
    }

    execute(msg: discord.Message) {
        const args = new CommandArgs(msg.client, msg.content);
        args.pop(); // pop off the command arg
        if (args.atEnd()) {
            // this.axios.get('/random').then(results => {
            //     msg.channel.send(results.data.data.url);
            // })
            // this.giphy.random().then(image => {
            //     msg.channel.send(image.data.url);
            // });
            msg.reply("You must include a search keyword for your gif");
        } else {
            const keyword = args.restToString();
            console.log(`Searching tenor for ${keyword}`);
            this.axios.get('/search', {
                params: {
                    q: keyword
                }
            }).then((response) => {
                const data = response.data as TenorSearchEntity;
                
                if (data.results) {
                    const item = data.results[randomIntFromInterval(0, Math.min(10, data.results.length))];
                    const gif = (item.media).find(e => e.gif);
                    msg.channel.send(gif.gif.url);
                } else {
                    msg.reply(`No gifs found for: ${keyword}`);
                }
            }).catch((err) => {
                console.log(err);
            });
            // this.giphy.search({q: keyword}).then(image => {
            //     if (image.data){
            //         const item = image.data[Math.floor(Math.random() * image.data.length)];
            //         msg.channel.send(item.url);
            //     } else {
            //         msg.reply(`no gifs found for ${keyword}`);
            //     }
            // });
        }
    }

}