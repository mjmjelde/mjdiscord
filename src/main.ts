import * as config from "config";
import { Client, Structures, VoiceConnection } from 'discord.js';
import { AbstractCommand } from './command/abstract_command';
import { HelpCommand } from './command/help_command';
import { ChuckCommand } from './command/chuck';
import { ReactCommand } from './command/react';
import { TestCommand } from './command/test';
import { MovieCommand } from './command/movie';
import { MusicData, MusicItem } from "./lib/music_types";
import { MjGuildInterface } from "./lib/guild_types";
import { PlayCommand } from "./command/music/play";
import "./lib/guild_types";
import { DadCommand } from "./command/dad";
import { SkipCommand } from "./command/music/skip";
import { StopCommand } from "./command/music/stop";
import { TeamCommand } from "./command/team";
import { GiphyCommand } from "./command/giphy_command";

const client = new Client();
client.login(config.get("client_key"));

const commands: AbstractCommand[] = [];

// Register commands here
commands.push(new TestCommand());
commands.push(new ReactCommand(client));
commands.push(new GiphyCommand());
commands.push(new ChuckCommand());
commands.push(new DadCommand());
// commands.push(new MovieCommand(config.get("radarr.baseurl"), config.get("radarr.apikey")));
//Music commands
commands.push(new PlayCommand());
commands.push(new SkipCommand());
commands.push(new StopCommand());
commands.push(new TeamCommand());
commands.push(new HelpCommand(commands)); // Do this one last because of passing commands to it!

client.on('ready', () => {
  client.guilds.cache.forEach((guild) => {
    console.log(guild.name);
  });

  client.on('message', message => {

    // Ignore our own messages and other bots
    if (message.author.bot) {
      return;
    }

    commands.forEach(command => {
      try {
        if(command.should_execute(message)) {
          command.execute(message);
        }
      } catch(e) {
        message.reply('There was an error processing your command.  Please try again later.');
        console.log(e);
      }
    })
  })
});

console.log('Starting bot...');