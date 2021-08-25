import { Client, StageChannel, TextBasedChannels } from "discord.js";
import { VoiceChannel } from "discord.js";
import { getSongStream } from "./song";
import * as ytdl from "ytdl-core";
import { createAudioPlayer, getVoiceConnection, VoiceConnection } from "@discordjs/voice";

export interface MusicItem {
  textChannel: TextBasedChannels;
  voiceChannel: VoiceChannel | StageChannel;
  sendToText: boolean;
  song: Song;
}

export interface Song {
  id: string;
  site: string;
  url?: string;
}

export interface MusicData {
  queue: MusicItem[];
  isPlaying: boolean;
  nowPlaying: MusicItem;
  volume: number;
}

export class MusicGuild {
  private client: Client;
  private guildId: string;
  private queue: MusicItem[];
  private nowPlaying: MusicItem;
  private _volume: number;

  private audioPlayer = createAudioPlayer();

  constructor(client: Client, guildId: string) {
    this.client = client;
    this.guildId = guildId;
    this.queue = [];
    this.nowPlaying = undefined;
    this._volume = 0.75;
  }

  get isPlaying(): boolean {
    return this.nowPlaying != undefined;
  }

  get volume(): number {
    return this._volume;
  }

  public async play(): Promise<MusicItem> {
    if (this.nowPlaying) {
      if (!this.isPlaying) {
        this.voiceConnection.dispatcher.resume();
      }
      return this.nowPlaying;
    }
    this.nowPlaying = this.queue.shift();
    if (!this.nowPlaying) {
      if (this.voiceConnection) {
        await this.stop();
      }
      return undefined;
    }

    const streamData = await getSongStream(this.nowPlaying.song);

    if (!this.voiceConnection || (this.voiceConnection.channel.id != this.nowPlaying.voiceChannel.id)) {
      this.voiceConnection = await this.nowPlaying.voiceChannel.join();
    }

    if (this.nowPlaying.sendToText) {
      this.nowPlaying.textChannel.send(`Now playing: ${(await ytdl.getInfo(this.nowPlaying.song.id)).videoDetails.title}`);
    }

    if (streamData == undefined) {
      console.log('Song stream is undefined!');
      this.nowPlaying = undefined;
      this.play();
      return;
    }

    this.voiceConnection.play(streamData.stream, {type: streamData.type, volume: this.volume, highWaterMark: 50}).on("finish", () => {
      if (this.queue.length > 0) {
        this.nowPlaying = undefined;
        this.play();
      } else {
        this.stop();
      }
    });
  }

  public async setVolume(vol: number) {
    if(vol > 2) {
      vol = 2;
    } else if (vol < 0) {
      vol = 0;
    }
    this._volume = vol;
    if (this.isPlaying) {
      this.voiceConnection.dispatcher.setVolume(this.volume);
    }
  }

  public async stop() {
    if (this.voiceConnection) {
      this.voiceConnection.disconnect();
      this.voiceConnection = undefined;
    }
    this.queue = [];
    this.nowPlaying = undefined;
  }

  public addQueue(...songs: MusicItem[]) {
    this.queue.push(...songs);
  }

  public async skip() {
    if (this.isPlaying) {
      this.voiceConnection.dispatcher.end();
    }
  }
}