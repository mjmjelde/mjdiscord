import { get } from "config";

export function getCommand(command: string) {
  if (!command.startsWith(commandCharacter())) {
    return '';
  }
  return command.substring(1).trim().toLowerCase();
}

export function commandCharacter(): string {
  return get('command_character');
}