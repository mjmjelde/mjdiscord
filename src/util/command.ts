import * as config from 'config';
import { Message, PartialMessage } from 'discord.js';
import { CommandArgs } from './command_args';

export function getCommand(msg: Message | PartialMessage): string {
  if(!msg.content.startsWith(commandCharacter())) {
    return '';
  }
  return new CommandArgs(msg.client, msg.content).pop().substring(1);
}

export function commandCharacter(): string {
  return config.get('command_character');
}