import { get } from "config";
import { Client, Message } from "discord.js";
import { DiscordCommand } from "./command/discord_command";
import { HelpCommand } from "./command/help";
import { GifCommand } from "./command/media/gif";
import { CommandArgs } from "./util/command_args";
import log from "./util/logger";
import "./lib/guild_types";

export class MjDiscord {
  public commands: DiscordCommand[];
  private client: Client;

  constructor() {
    log.info("Starting MjBot...");
    this.loadCommands();
    this.run();
  }

  private loadCommands() {
    this.commands.push(new HelpCommand(this));

    // Media Commands
    this.commands.push(new GifCommand());
    
  }

  public async run() {
    this.client = new Client();
    this.client.login(get('client_key'));

    this.client.on('ready', () => {
      log.info("MjBot Connected and waiting for messages!");
    });
    this.client.on('message', this.onMessage);
  }

  private onMessage(msg: Message) {
    if (msg.author.bot) {
      return; // Ignore all bot messages
    }

    this.commands.forEach(command => {
      const args = new CommandArgs(this.client, msg);
      try {
        if (command.shouldExecute(msg, args)) {
          command.execute(msg, args);
          return;
        }
      } catch(e) {
        msg.reply('There was an error processing your command.  Please try again later');
        console.log(e);
      }
    })

  }
}

new MjDiscord();