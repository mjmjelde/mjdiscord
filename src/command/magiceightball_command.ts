import { AbstractCommand } from './abstract_command'
import * as discord from 'discord.js';
import * as util from '../util/command';
import * as config from 'config';

export class MagicEightBallCommand implements AbstractCommand {

    responses = [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",
        "Reply hazy try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful"
    ]

    help() {
        return util.commandCharacter() + 'eightball : Magical eightball'
    }

    should_execute(msg: discord.Message): boolean {
        return ["eightball", "eb"].indexOf(util.getCommand(msg).toLowerCase()) > 0;
    }

    execute(msg: discord.Message) {
        msg.channel.send("Magical eightball says: " + this.responses[Math.floor(Math.random() * this.responses.length)]);
    }
}