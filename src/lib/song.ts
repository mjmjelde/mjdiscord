import { TrackData } from "../services/music/music_types";

import { Readable } from "stream";
import { createReadStream } from "fs";
import { download } from "../services/music/youtube";

export interface SoundStream {
  type: any;
  stream: Readable
}

export async function getSongStream(song: TrackData): Promise<SoundStream> {
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
    case 'fileopus':
      return {
        type: 'ogg/opus',
        stream: createReadStream(`./audio/${song.url}.opus`),
      }
    default:
      return undefined;
  }
}