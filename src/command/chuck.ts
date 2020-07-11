import { AbstractCommand } from "./abstract_command";
import { Message } from "discord.js";
import { commandCharacter, getCommand } from "../util/command";
import axios from 'axios';

export class ChuckCommand implements AbstractCommand {
  help() {
    return commandCharacter() + 'chuck : Shows a random Chuck Norris fact'
  }

  should_execute(msg: Message): boolean {
    return getCommand(msg).toLowerCase() == 'chuck';
  }

  execute(msg: Message) {
    axios("https://api.chucknorris.io/jokes/random").then((resp) => {
      msg.channel.send(resp.data.value);
    }).catch((error) => {
      console.log(error);
      msg.reply("Sorry, I can't reach chuck norris right now to get a joke.");
    });
  }

}