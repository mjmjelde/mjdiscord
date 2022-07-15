import config from "config";

export function getCommand(command: string) {
  if (!command.startsWith(commandCharacter())) {
    return '';
  }
  return command.substring(1).trim().toLowerCase();
}

export function commandCharacter(): string {
  return config.get('command_character');
}