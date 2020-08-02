import { Song } from "../lib/music_types";

import * as ytdl from 'ytdl-core';
import { Readable } from "stream";
import { createReadStream } from "fs";

export function getSongStream(song: Song): Readable {
  switch (song.site) {
    case 'youtube':
      return ytdl(song.url);
    case 'file':
      return createReadStream(`./audio/${song.url}.ogg`);
    default:
      return undefined;
  }
}