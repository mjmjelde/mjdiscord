import { MusicGuild } from "./music_types";

export class MjGuild {
  public music: MusicGuild = new MusicGuild();
}

export class MjGuildManager {
  private guildHash = new Map<string, MjGuild>();

  public getGuild(id: string): MjGuild {
    if (!this.guildHash.has(id)) {
      this.guildHash.set(id, new MjGuild());
    }
    return this.guildHash.get(id);
  }
}

const MjGuildManagerInstance = new MjGuildManager();
export default MjGuildManagerInstance;