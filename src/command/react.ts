import { AbstractCommand } from "./abstract_command";
import { Message, PartialMessage, Client } from "discord.js";

export class ReactCommand implements AbstractCommand{

  constructor(client: Client) {
    client.on("messageReactionAdd", (msgReaction) => {
      const ownReactions = msgReaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(client.user.id))
      if (msgReaction.emoji.name == "🍆" && !ownReactions.first()) {
        console.log("Adding :eggplant: reaction!");
        msgReaction.message.react("🍆");
      }
    })
  }

  help(): string {
    return ""
  }

  should_execute(msg: Message | PartialMessage): boolean {
    return false;
  }

  execute(msg: Message | PartialMessage) {

  }
}