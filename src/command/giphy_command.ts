import * as discord from 'discord.js';
import { AbstractCommand } from './abstract_command';
import * as config from 'config';
import * as giphyapi from 'giphy-api';
import { commandCharacter, getCommand } from '../util/command';
import { CommandArgs } from '../util/command_args';

export class GiphyCommand implements AbstractCommand {

    giphy = null;

    constructor(){
        this.giphy = new giphyapi(config.get("giphy.apikey"));
    }

    help() {
        return commandCharacter() + 'gif <keyword> : Show random gif for a keyword';
    }

    should_execute(msg: discord.Message): boolean {
        return getCommand(msg).toLowerCase() == 'gif';
    }

    execute(msg: discord.Message) {
        const args = new CommandArgs(msg.content);
        args.pop(); // pop off the command arg
        if(args.atEnd()){
            return msg.reply("Invalid usage...\n" + this.help() );
        }
        const keyword = args.restToString();
        this.giphy.random(keyword).then(image => {
            if (image.data.url){
                msg.channel.send(image.data.url);
            } else {
                msg.reply(`no gifs found for ${keyword}`);
            }
        });
    }

}