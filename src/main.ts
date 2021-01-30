import * as config from "config";
import { Client, Structures, VoiceConnection, Intents } from 'discord.js';
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
import { GifCommand } from "./command/gif_command";
import { MagicEightBallCommand } from "./command/magiceightball_command";
import { TableFlipCommand } from "./command/tableflip";
import { RandomClassCommand } from "./command/random_class";
import { RandomComicCommand } from "./command/random_comic";
import { BeerCommand } from "./command/beer";
import { WTFCommand } from "./command/music/clips/wtf";
import { VolumeCommand } from "./command/music/volume";
import { YEETCommand } from "./command/music/clips/yeet";
import { NFLNewsCommand } from "./command/nfl/nflnews";
import { baseDir, dataDir } from "./util/data";
import { NutCommand } from "./command/music/clips/nut";
import { AnimeWowCommand } from "./command/music/clips/anime_wow";
import { FileSoundsCommands } from "./command/music/clips/file_sounds";
import { randomIntFromInterval } from "./util/numbers";
import { MiddleFingerCommand } from "./command/middlefinger";
import { StockCommand } from "./command/stocks/stock";

const client = new Client();
client.login(config.get("client_key"));

const commands: AbstractCommand[] = [];

// Register commands here
commands.push(new TestCommand());
commands.push(new ReactCommand(client));
commands.push(new GifCommand());
commands.push(new ChuckCommand());
commands.push(new DadCommand());
commands.push(new MiddleFingerCommand());
// commands.push(new MovieCommand(config.get("radarr.baseurl"), config.get("radarr.apikey")));
//Music commands
commands.push(new PlayCommand());
commands.push(new SkipCommand());
commands.push(new StopCommand());
commands.push(new WTFCommand());
commands.push(new YEETCommand());
commands.push(new NutCommand());
commands.push(new AnimeWowCommand());
commands.push(new FileSoundsCommands());
commands.push(new VolumeCommand());

//NFL Commands
commands.push(new NFLNewsCommand(client));

//Stock commands
commands.push(new StockCommand());

commands.push(new TeamCommand());
commands.push(new MagicEightBallCommand());
commands.push(new TableFlipCommand());
commands.push(new RandomClassCommand());
commands.push(new RandomComicCommand());
commands.push(new BeerCommand());
commands.push(new HelpCommand(commands)); // Do this one last because of passing commands to it!

const randomStatus = [
  "If Minecraft taught me one thing, it's to never spend diamonds on a hoe",
  "You make me wanna throw a flashbang into a room full of epileptic kids",
  "When I was a kid I wanted 2 pieces of pie instead of 1.  My mom cut one slice in half and gave them to me.  Naturally, I was happy",
  "I use a ruler to see how long I sleep 📏",
  "🧾 No, I checked my receipt.  I didn't buy any of your bullshit",
  "The first thing a man looks at in a woman is her heart.  The fact that her boobs are in front of her is not his fault.",
  // "Can orphans eat at a family restaurant?",
  "How come a man driving a train got struck by lightning? He was a good conductor.",
  "I want to be the reason someone looks and smiles at their phone, then walks into a pole",
  "There's nothing stronger than love... except a M32 Rotary Grenade Launcher",
  "I've only been outside 0 days in the last 243 days",
  "If you are going to fight, fight like there is one chair left in musical chairs... and the music is about to stop",
  "You have never seen me and the KoolAid man in the same room before... just saying",
  // "Told the depressed kid to hang in there",
  "95% swag... I lost the other 5% talking to you",
  "Some people just need a high-five... in the face... with a chair.",
  "Can you be the :// to my https ? 😉"
]

async function setPresence() {
  const status = randomStatus[randomIntFromInterval(0, randomStatus.length - 1)];
  const pres = await client.user.setPresence(
    {
      status: "online",
      activity:{
        name: status,
        type: "PLAYING"
      } 
    }
  );
}

client.on('ready', () => {
  client.guilds.cache.forEach((guild) => {
    console.log(guild.name);
  });

  
  // setPresence();
  // setInterval(() => {
  //   setPresence();
  // }, 15 * 60 * 1000);

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
  });
});

console.log('Starting bot...');
console.log(`Base Dir: ${baseDir()}`);
console.log(`Data Dir: ${dataDir()}`);