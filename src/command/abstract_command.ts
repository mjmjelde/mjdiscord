import { Message, PartialMessage } from 'discord.js'

export interface AbstractCommand {
    
    /**
     * Should we run this command
     * @param {discord.Message} msg 
     */
    should_execute(msg: Message | PartialMessage): boolean;

    /**
     * Execute the command
     * @param {discord.Message} msg 
     */
    execute(msg: Message | PartialMessage): void;

    help(): string;
}