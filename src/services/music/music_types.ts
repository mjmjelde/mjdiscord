import { AudioResource, createAudioResource, StreamType } from "@discordjs/voice";
import { Snowflake } from "discord.js";
import { createReadStream } from "fs";
import ytdl from "ytdl-core";
import { download } from "./youtube";

export interface TrackData {
  id: string;
  voiceChannelId: Snowflake;
  site: string;
  url: string;
  onStart: () => void;
  onFinish: () => void;
  onError: (error: Error) => void;
}

export class Track implements TrackData {
  public readonly id: string;
  public readonly voiceChannelId: Snowflake;
  public readonly site: string;
  public readonly url: string;
  public readonly onStart: () => void;
  public readonly onFinish: () => void;
  public readonly onError: (error: Error) => void;

  public constructor({ id, voiceChannelId,  site, url, onStart, onFinish, onError}) {
    this.id = id;
    this.voiceChannelId = voiceChannelId;
    this.site = site;
    this.url = url;
    this.onStart = onStart;
    this.onFinish = onFinish;
    this.onError = onError;
  }

  public async createAudioResource(): Promise<AudioResource<Track>> {
    switch(this.site) {
      case 'youtube': 
        const stream = await download(this.url);
        // const stream = ytdl(this.url, { filter: 'audioonly', dlChunkSize: 0 });
        return createAudioResource(stream, {inputType: StreamType.Opus, metadata: this});
      case 'fileopus':
        return createAudioResource(await createReadStream(`./audio/${this.url}.opus`), {inputType: StreamType.OggOpus, metadata: this});
    }
  }
}
