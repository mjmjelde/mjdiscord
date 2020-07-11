import {AbstractCommand} from './abstract_command'
import * as util from '../util/command'
import * as discord from 'discord.js'

export class HelpCommand implements AbstractCommand {

    commands: AbstractCommand[] = [];

    constructor(commands: AbstractCommand[]){
        this.commands = commands;
    }

    should_execute(msg) {
        return util.getCommand(msg).toLowerCase() == 'help'
    }

    execute(msg: discord.Message) {
        var commandHelp: string = '';
        this.commands.forEach(command => {
            var ch = command.help();
            if(ch != null){
                commandHelp += ch + "\n";
            }
        })
        msg.author.send(commandHelp);
        msg.reply("Check your messages for command help")
        
    }

    help() {
        return null;
    }

}