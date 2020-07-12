import * as discord from 'discord.js';
import { AbstractCommand } from './abstract_command';
import * as config from 'config';
import * as giphyapi from 'giphy-api';
import { commandCharacter, getCommand } from '../util/command';

export class GiphyCommand implements AbstractCommand {

    giphy = null;

    constructor(){
        this.giphy = new giphyapi(config.get("giphy.apikey"));
    }

    help() {
        return commandCharacter() + 'gif <keyword> : Show random gif for a keyword'
    }

    should_execute(msg: discord.Message): boolean {
        return getCommand(msg).toLowerCase() == 'gif';
    }

    execute(msg: discord.Message) {
        let split = msg.content.split(" ");
        if(split.length < 1){
            return msg.reply("Invalid usage...\n" + this.help() );
        }
        let keyword = split[1];
        this.giphy.random(keyword).then(image => {
            if(image.data.url){
                msg.channel.send(image.data.url);
            } else {
                msg.reply(`no gifs found for ${keyword}`);
            }
        })
    }

}