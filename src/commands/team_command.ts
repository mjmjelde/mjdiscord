import { SlashCommandBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChannelType, Collection, CollectorFilter, CollectorOptions, CommandInteraction, EmbedBuilder, Guild, GuildChannel, GuildMember, InteractionEditReplyOptions, InteractionReplyOptions, MessageComponentInteraction, PermissionFlagsBits, Snowflake, ThreadChannel } from "discord.js";
import log from "../util/logger";
import { randomIntFromInterval } from "../util/numbers";
import { delay } from "../util/time";
import { AbstractCommand } from "./abstract_command";

export class TeamCommand extends AbstractCommand {
  get name(): string {
    return "Team Command";
  }
  
  guildCommands(): SlashCommandBuilder[] {
    const teamCommand = new SlashCommandBuilder().setName("team").setDescription("Split current voice chat into x number of teams");
    teamCommand.addIntegerOption(option => option.setName("num").setDescription("Number of teams to split into").setRequired(false));

    return [
      teamCommand,
    ]
  }

  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == "team";
  }
  
  async execute(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.member) {
      await interaction.reply('Please use this command in a guild channel');
      return;
    }
    if (!(interaction.member instanceof GuildMember)) {
      log.debug("Not a GuildMember when receiving an interaction");
      await interaction.reply({ephemeral: true, content: 'Error processing your command'});
      return;
    }
    const guildMember = interaction.member as GuildMember;
    const voiceState = guildMember.voice;
    if (!voiceState.channelId) {
      log.debug("User is not in a voice channel.  Responding with error for teams", voiceState);
      await interaction.reply({ephemeral: true, content: 'Please join a voice channel before using this command'});
      return;
    }

    const numTeams = interaction.options.getInteger("num") || 2;
    const members = this.shuffle((voiceState.channel.members));
    const teams = this.chunkify(members, numTeams);
    const guildChannels = this.channels(interaction.guild);

    const reply: InteractionReplyOptions = {}
    const replyEdit: InteractionEditReplyOptions = {};
    const replyEmbed = new EmbedBuilder().setTitle("Teams");
    reply['embeds'] = [replyEmbed];
    replyEdit['embeds'] = [replyEmbed];
    for (let i = 0; i < teams.length; i++) {
      replyEmbed.addFields([
        { name: `Team ${i + 1}`, value: teams[i].length > 0 ? teams[i].map(gm => gm.displayName).join('\n') : "None"},
      ]);
    }
    if (teams.length <= guildChannels.size && interaction.guild.members.me.permissions.has(PermissionFlagsBits.MoveMembers)) {
      replyEmbed.setFooter({
        text: `Move the teams to different channels? (Click reaction)`,
      });
      const randomInt = randomIntFromInterval(0, 10000);
      const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder().setCustomId(`accept${randomInt}`).setStyle(ButtonStyle.Primary).setEmoji('👍'),
        new ButtonBuilder().setCustomId(`deny${randomInt}`).setStyle(ButtonStyle.Danger).setEmoji('👎'),
      );
      reply.components = [buttons];
      const buttonFilter: CollectorFilter<[MessageComponentInteraction]> = (inter) => {
        return (inter.customId == `accept${randomInt}` || inter.customId == `deny${randomInt}`) && inter.user.id == interaction.user.id
           
      }
      const collector = interaction.channel.createMessageComponentCollector({filter: buttonFilter, time: 5 * 60 * 1000, max: 1});
      collector.on('collect', async i => {
        
        let bi = i as ButtonInteraction;
        console.log(`Button Clicked: ${bi.customId}`);
        if (bi.customId.startsWith("accept")) {
          for (let i = 0; i < teams.length; i++) {
            const chan = guildChannels[i];
            for (const gm of teams[i]) {
              await gm.voice.setChannel(chan);
              await delay(300);
            }
          }
        }
        reply['components'] = [];
        // await interaction.editReply(reply);
      });
      collector.on('end', async (collected) => {
        reply['components'] = [];
        // await interaction.editReply(reply);
      });
    }
    
    await interaction.reply(reply);
  }

  private shuffle(members: Collection<Snowflake, GuildMember>): GuildMember[] {
    const arr = [...members.values()];
    let currentIndex = arr.length, tempValue: GuildMember, randomIndex: number;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = tempValue;
    }

    return arr;
  }

  private chunkify(members: GuildMember[], numTeams: number): GuildMember[][] {
    if (numTeams < 2) {
      return [members];
    }
    const len = members.length;
    const out = [];
    let i = 0;
    let size: number;

    while (i < len) {
      size = Math.ceil((len - i) / numTeams--);
      out.push(members.slice(i, i += size));
    }

    return out;
  }

  private channels(guild: Guild): Collection<string, GuildChannel | ThreadChannel> {
    return guild.channels.cache.filter(channel => channel instanceof GuildChannel && channel.type == ChannelType.GuildVoice && channel.name.toLocaleLowerCase().startsWith("mw"));
  }

}