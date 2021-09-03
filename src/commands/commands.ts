import { MjBot } from "../mjbot";
import { AbstractCommand } from "./abstract_command";
import { DadCommand } from "./dad_command";
import { GifCommand } from "./gif_command";
import { PlayCommand } from "./media/play_command";
import { SkipCommand } from "./media/skip_command";
import { StopCommand } from "./media/stop_command";
import { MiddleFingerCommand } from "./middlefinger_command";
import { RandomComicCommand } from "./randomcomic_command";
import { TableFlipCommand } from "./tableflip_command";
import { TeamCommand } from "./team_command";
import { TestCommand } from "./test_command";

export function getCommands(bot: MjBot): AbstractCommand[] {
  return [
    new PlayCommand(),
    new SkipCommand(),
    new StopCommand(),

    new TestCommand(),
    new GifCommand(),
    new TeamCommand(),
    new TableFlipCommand(),
    new RandomComicCommand(),
    new MiddleFingerCommand(),
    new DadCommand(),
  ]
}