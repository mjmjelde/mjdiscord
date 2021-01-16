import { Message, PartialMessage } from "discord.js";
import { commandCharacter, getCommand } from "../util/command";
import { AbstractCommand } from "./abstract_command";

export class MiddleFingerCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return ["middlefinger", "mf"].indexOf(getCommand(msg).toLowerCase()) >= 0;
  }

  help(): string {
    return commandCharacter() + "middlefinger : Shows a middle finger";
  }

  async execute(msg: Message | PartialMessage) {
    msg.channel.send(
      "....................../´¯/)\n" + 
      "....................,/¯../ \n" + 
      ".................../..../ \n" + 
      "............./´¯/'...'/´¯¯`·¸ \n" + 
      "........../'/.../..../......./¨¯\\ \n" + 
      "........('(...´...´.... ¯~/'...') \n" + 
      ".........\.................'...../ \n" + 
      "..........''...\.......... _.·´ \n" + 
      "............\..............( \n" + 
      "..............\.............\...\n"
    )
  }
}