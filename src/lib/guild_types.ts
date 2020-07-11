import { Guild, Structures, VoiceConnection } from "discord.js";
import { MusicData, MusicItem, MusicGuild } from "./music_types";
import { getSongStream } from "../util/song";

export interface MjGuildInterface extends Guild {
  music: MusicGuild;
}

Structures.extend("Guild", Guild => {
  class MjGuild extends Guild implements MjGuildInterface {
    public music: MusicGuild = new MusicGuild();

    constructor(client, data) {
      super(client, data);
    }
  }
  return MjGuild;
});