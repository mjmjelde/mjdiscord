import { Song } from "../lib/music_types";

import * as ytdl from 'ytdl-core';
import { Readable } from "stream";
import { createReadStream } from "fs";
import { download } from "./youtube";
import { StreamType } from "discord.js";

export interface SoundStream {
  type: StreamType;
  stream: Readable
}

export async function getSongStream(song: Song): Promise<SoundStream> {
  switch (song.site) {
    case 'youtube':
      // return ytdl(song.url, {quality: 'highestaudio', filter: 'audioonly'});
      return {
        type: 'opus',
        stream: await download(song.url),
      };
    case 'file':
      return {
        type: undefined,
        stream: createReadStream(`./audio/${song.url}.ogg`),
      }
    default:
      return undefined;
  }
}