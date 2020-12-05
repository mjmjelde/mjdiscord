import { Song } from "../lib/music_types";

import * as ytdl from 'ytdl-core';
import { Readable } from "stream";
import { createReadStream } from "fs";
import { download } from "./youtube";

export async function getSongStream(song: Song): Promise<Readable> {
  switch (song.site) {
    case 'youtube':
      // return ytdl(song.url, {quality: 'highestaudio', filter: 'audioonly'});
      return download(song.url);
    case 'file':
      return createReadStream(`./audio/${song.url}.ogg`);
    default:
      return undefined;
  }
}