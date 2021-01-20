import * as discord from 'discord.js';
import { AbstractCommand } from './abstract_command';
import * as config from 'config';
import * as giphyapi from 'giphy-api';
import { commandCharacter, getCommand } from '../util/command';
import { CommandArgs } from '../util/command_args';
import Axios, { AxiosInstance } from 'axios';
import { randomIntFromInterval } from '../util/numbers';

export class GiphyCommand implements AbstractCommand {

    giphy = null;
    private axios: AxiosInstance;

    constructor(){
        this.giphy = new giphyapi(config.get("giphy.apikey"));
        this.axios = Axios.create({
            params: {
                api_key: config.get("giphy.apikey")
            },
            baseURL: "https://api.giphy.com/v1/gifs"
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
            this.axios.get('/random').then(results => {
                msg.channel.send(results.data.data.url);
            })
            // this.giphy.random().then(image => {
            //     msg.channel.send(image.data.url);
            // });
        } else {
            const keyword = args.restToString();
            console.log(`Searching Giphy for ${keyword}`);
            this.axios.get('/search', {
                params: {
                    q: keyword,
                    api_key: config.get("giphy.apikey")
                }
            }).then((results) => {
                if (results.data.data) {
                    const gifresults = results.data;
                    const item = gifresults.data[randomIntFromInterval(0, Math.min(10, gifresults.pagination.count))];
                    msg.channel.send(item.url);
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