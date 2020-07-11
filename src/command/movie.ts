import { AbstractCommand } from "./abstract_command";
import { Message, PartialMessage, MessageEmbed, User, MessageReaction } from "discord.js";
import { getCommand } from "../util/command";
import { Movie } from "../lib/radarr_types";
import { Radarr } from "../lib/radarr";
import { CommandArgs } from "../util/command_args";
import { resolve } from "path";
import { rejects } from "assert";

export class MovieCommand implements AbstractCommand {

  private client: Radarr;

  constructor(url: string, apikey: string) {
    this.client = new Radarr(url, apikey);
  }

  should_execute(msg: Message | PartialMessage): boolean {
    const cmd = getCommand(msg);
    return [ 'movie', 'mv' ].includes(cmd);
  }

  execute(msg: Message | PartialMessage): void {
    const args = new CommandArgs(msg.content);
    args.pop(); // Get rid of command character
    const movieTitle = args.restToString();
    this.client.searchMovie(movieTitle).then(async (movies) => {
      const response = this.generateDiscordMessage(movies);
      const respMsg = await msg.reply(response);
      const selection = await this.getSelection(respMsg, msg.author, movies.length);
      if (selection < 0) {
        msg.reply("Selection timed out...");
      } else {
        const movie = movies[selection];
        if (await this.doesMovieExist(movie)) {
          msg.reply(`Movie already exists`);
        } else {
          msg.reply(this.movieToEmbed(movie));
        }
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  help(): string {
    return "";
  }

  private doesMovieExist(movie: Movie): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.client.movies().then((movies) => {
        resolve(movies.filter(mov => mov.tmdbId == movie.tmdbId).length > 0);
      }).catch(err => reject(err));
    });
  }

  private movieToEmbed(movie: Movie) {
    const ret: MessageEmbed = new MessageEmbed();
    ret.setTitle(`Added Movie: ${movie.title} (${movie.year})`)
      .setURL(`https://www.themoviedb.org/movie/${movie.tmdbId}`);

    if (movie.images && movie.images.length > 0) {
      ret.setImage(movie.images[0].url);
    }

    let overview = movie.overview;
    if (overview.length > 250) {
      overview = overview.substr(0, 250) + "...";
    }
    ret.addField('Description', overview);

    return ret;
  }

  private generateDiscordMessage(movies: Movie[]): MessageEmbed {
    let content = '';
    const limit = (movies.length <= 5) ? movies.length : 5;
    for (let i = 0; i < limit; i++) {
      if (content.length >= 896) break;
      content += `${i + 1}) ${movies[i].title} `;
      content += `(${movies[i].year}) `;
      content += `(https://www.themoviedb.org/movie/${movies[i].tmdbId})\n`;
    }

    return new MessageEmbed()
      .setTitle('Movie Search')
      .setDescription('Please select one of the search results.  ***Wait for the reactions to finish loading!***')
      .addField('Search Results', content);
  }

  private getSelection(msg: Message, author: User, length: number): Promise<number> {
    return new Promise(async (resolve, reject) => {
      const limit = (length <= 5) ? length : 5;
      const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
      for (let i = 0; i < limit; i++) await msg.react(emojis[i]);
      msg.awaitReactions((reaction: MessageReaction, user: User) => {
        return emojis.includes(reaction.emoji.name) && author.id == user.id;
      }, {max: 1, time: 30 * 1000}).then((collected) => {
        if (msg.deletable) {
          msg.delete();
        }
        if(collected.first()) {
          resolve(emojis.indexOf(collected.first().emoji.name));
        } else {
          resolve(-1);
        }
      }).catch((err) => {
        reject(err);
      })
    });
  }

}