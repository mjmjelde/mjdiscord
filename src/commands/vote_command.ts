import { SlashCommandBuilder } from "@discordjs/builders";
import { CollectorFilter, CommandInteraction, EmbedBuilder, Message, MessageReaction, TextChannel, User } from "discord.js";
import log from "../util/logger";
import { stringToMilliseconds } from "../util/time";
import { AbstractCommand } from "./abstract_command";

export class VoteCommand extends AbstractCommand {
  
  get name(): string {
    return 'vote';
  }

  guildCommands(): SlashCommandBuilder[] {
    const voteCommand = new SlashCommandBuilder().setName('vote').setDescription('Start a vote!');
    voteCommand.addStringOption(option => option.setName('time').setDescription('Amount of time for vote to be open.  Ex: 5m, 30m, 1h').setRequired(true));
    voteCommand.addStringOption(option => option.setName('msg').setDescription('The message to vote on').setRequired(true));

    return [
      voteCommand
    ]
  }

  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == 'vote';
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    const msg = interaction.options.getString('msg');
    const time = stringToMilliseconds(interaction.options.getString('time'));

    const embed = new EmbedBuilder();
    embed.setTitle('Vote System');
    embed.addFields([
      { name: 'Question', value: msg }
    ]);

    const reactionFilter: CollectorFilter<[MessageReaction, User]> = (reaction, user) => {
      return ['👍', '👎'].includes(reaction.emoji.name) && interaction.guild.members.me.id != user.id;
      // return true;
    }

    const message = await interaction.reply({embeds: [embed], fetchReply: true}) as Message;

    await message.react('👍');
    await message.react('👎');

    const reactionCollector = message.createReactionCollector({filter: reactionFilter, time: time, dispose: true});
    reactionCollector.on('collect', async (reaction, user) => {
      log.debug('vote interaction received');
      const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
      try {
        for (const r of userReactions.values()) {
          if (r.emoji != reaction.emoji) {
            await r.users.remove(user.id);
          }
        }
      } catch (e) {
        log.error(`Couldn't remove vote emoji`, e);
      }
    });

    reactionCollector.on('end', async (collected) => {
      const yes = collected.get('👍').count - 1;
      const no = collected.get('👎').count - 1;
      await message.reactions.removeAll();
      if (yes > no) {
        if (message.channel.isTextBased()) {
          await (message.channel as TextChannel).send(`The vote passes! With ${yes} for and ${no} against!`);
        }
        // await message.channel.send(`The vote passes! With ${yes} for and ${no} against!`)
      } else {
        if (message.channel.isTextBased()) {
          await (message.channel as TextChannel).send(`The vote fails! With ${yes} for and ${no} against!`);
        }
      }
    })
    
  }

}