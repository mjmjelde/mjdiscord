import { AbstractCommand } from "./abstract_command";
import { Message, PartialMessage, DMChannel } from "discord.js";
import { getCommand, commandCharacter } from "../util/command";
import axios from "axios";

export class DadCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return getCommand(msg).toLowerCase() == "dad";
  }
  execute(msg: Message | PartialMessage): void {
    axios("https://icanhazdadjoke.com/", {
      headers: {
        "Accept": "application/json"
      }
    }).then((resp) => {
      msg.channel.send(resp.data.joke);
    }).catch((err) => {
      console.log(err);
      msg.reply("Sorry, I can't find a dad to give me a joke right now.  Please try again later");
    })
  }
  help(): string {
    return commandCharacter() + 'dad : Shows a random dad joke';
  }

}