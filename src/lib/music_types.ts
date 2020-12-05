import { Guild, VoiceConnection } from "discord.js";
import { TextChannel, VoiceChannel, DMChannel, NewsChannel } from "discord.js";
import { getSongStream } from "../util/song";
import * as ytdl from "ytdl-core";

export interface MusicItem {
  textChannel: TextChannel | DMChannel | NewsChannel;
  voiceChannel: VoiceChannel;
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
  voiceConnection: VoiceConnection;
  volume: number;
}

export class MusicGuild {
  private queue: MusicItem[];
  private nowPlaying: MusicItem;
  private voiceConnection: VoiceConnection;
  private _volume: number;

  constructor() {
    this.queue = [];
    this.nowPlaying = undefined;
    this.voiceConnection = undefined;
    this._volume = 0.75;
  }

  get isPlaying(): boolean {
    if (!this.voiceConnection) {
      return false;
    }
    return this.voiceConnection.dispatcher && !this.voiceConnection.dispatcher.paused;
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

    if (!this.voiceConnection || (this.voiceConnection.channel.id != this.nowPlaying.voiceChannel.id)) {
      this.voiceConnection = await this.nowPlaying.voiceChannel.join();
    }

    if (this.nowPlaying.sendToText) {
      this.nowPlaying.textChannel.send(`Now playing: ${(await ytdl.getInfo(this.nowPlaying.song.id)).videoDetails.title}`);
    }
    const stream = await getSongStream(this.nowPlaying.song);

    if (stream == undefined) {
      console.log('Song stream is undefined!');
      this.nowPlaying = undefined;
      this.play();
      return;
    }

    this.voiceConnection.play(stream, {volume: this.volume, highWaterMark: 50}).on("finish", () => {
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