import { Client } from "discord.js";
import log from "../util/logger.js";

export class Eggplant {
  constructor(client: Client) {
    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.partial) {
        try {
          await reaction.fetch();
        } catch (err) {
          log.error('Something went wrong fetching the message: ', err);
          return;
        }
      }

      const ownReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(client.user.id))
      if (reaction.emoji.name == '🍆' && !ownReactions.first()) {
        log.debug('Adding 🍆 reaction!');
        await reaction.message.react('🍆');
      }
    })
  }
}