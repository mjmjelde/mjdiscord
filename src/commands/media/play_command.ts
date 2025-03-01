import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember } from "discord.js";
import { getInfo, getVideoID } from "@distube/ytdl-core";
import musicService from "../../services/music";
import { Track } from "../../services/music/music_types";
import log from "../../util/logger";
import { AbstractCommand } from "../abstract_command";

export class PlayCommand extends AbstractCommand {
  
  get name(): string {
    return "play";
  }

  guildCommands(): SlashCommandBuilder[] {
    const playCommand = new SlashCommandBuilder().setName('play').setDescription('Play a media URL');
    playCommand.addStringOption(option => option.setName('url').setDescription('URL of meida').setRequired(true));
    return [
      playCommand
    ]
  }

  globalCommands(): SlashCommandBuilder[] {
    return [];
  }

  shouldExecute(interaction: CommandInteraction): boolean {
    return interaction.commandName == 'play';
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand()) 
      return;

    if (!(interaction.member instanceof GuildMember)) {
      log.debug("Not a GuildMember when receiving an interaction");
      await interaction.reply({ephemeral: true, content: 'Error processing your command'});
      return;
    }

    if (!interaction.member.voice.channelId) {
      await interaction.reply({ephemeral: true, content: 'Please join a voice channel to use this command.'});
      return;
    }
    const urlString = interaction.options.getString('url');
    const guildMusic = musicService.getService(interaction.guild);
    
    let url: URL;
    try {
      url = new URL(urlString);
    } catch (e) {
      await interaction.reply({ephemeral: true, content: 'Invalid song request.  Please send a valid URL'});
      return;
    }

    await interaction.deferReply();

    if (/(music.)?youtu(be.com|.be)/.test(url.host)) {
      try {
        const videoInfo = await getInfo(url.toString());
        guildMusic.enqueue(new Track({
          id: getVideoID(url.toString()),
          voiceChannelId: interaction.member.voice.channelId,
          site: 'youtube',
          url: url.toString(),
          onStart: async () => { await interaction.channel.send(`Now playing ${videoInfo.videoDetails.title}`)},
          onFinish: () => {},
          onError: (err) => {log.error(err)}
        }));
        await interaction.editReply(`Added ${videoInfo.videoDetails.title} to the queue`);
      } catch(e) {
        log.error(e);
        await interaction.editReply(`Error adding video to queue.  Try again later`);
      }
      
    } else {
      await interaction.reply({ ephemeral: true, content: 'Invalid song.  Please try a valid URL'});
      return;
    }
  }

}