import { Guild } from "discord.js";

export abstract class AbstractService<T> {

  public abstract getService(guild: Guild): T;

}