import { Guild, Structures } from "discord.js";
import { MusicGuild } from "./music_types";

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