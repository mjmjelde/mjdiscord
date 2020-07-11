import { Song } from "../lib/music_types";

import * as ytdl from 'ytdl-core';
import { Readable } from "stream";

export function getSongStream(song: Song): Readable {
  switch (song.site) {
    case 'youtube':
      return ytdl(song.url);
    break;
    default:
      return undefined;
  }
}