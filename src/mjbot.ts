import config from "config";
import { Client, GatewayIntentBits, Guild, Interaction, Partials } from "discord.js";
import { REST } from '@discordjs/rest';
import { Logger } from "tslog";
import { AbstractCommand } from "./commands/abstract_command";
import { getCommands } from "./commands/commands";
import { Routes } from "discord-api-types/v9";
import log from "./util/logger";

export class MjBot {
  public client: Client;
  private logger: Logger;
  private commands: AbstractCommand[];
  private rest: REST;

  constructor() {
    this.client = new Client({ intents: [
      GatewayIntentBits.Guilds, 
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.DirectMessages, 
      GatewayIntentBits.DirectMessageReactions
    ],
    partials: [
      Partials.Message,
      Partials.Channel,
      Partials.Reaction,
    ]
  });
    this.logger = log;
    this.commands = getCommands(this);
    this.rest = new REST({ version: '9' }).setToken(config.get("client_key"));

    this.client.once('ready', this.ready.bind(this));
    this.client.on('guildCreate', this.guildJoin.bind(this));
    this.client.on('interactionCreate', this.interactionCreate.bind(this));
    this.client.login(config.get("client_key"));

    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', text => {
      if (text.toString('utf-8').trim() == 'stop') {
        console.log('Thanks for using MjBot!');
        this.client.destroy();
        process.exit();
      }
    })
  }

  private async ready() {
    console.log('Client connected!');

    const globalCommands = [];
    this.commands.forEach(command => {
      globalCommands.push(...command.globalCommands().map(x => x.toJSON()));
    });
    this.logger.info(`Registering ${globalCommands.length} global commands!`);
    await this.rest.put(
      Routes.applicationCommands(config.get("client_id")),
      { body: globalCommands }
    );

    for(let guildData of await this.client.guilds.fetch()) {
      this.guildJoin(await guildData[1].fetch())
    }
  }

  private async guildJoin(guild: Guild) {
    const guildCommands = [];
    this.commands.forEach(command => {
      guildCommands.push(...command.guildCommands().map(x => x.toJSON()));
    });
    
    this.logger.info(`Registering ${guildCommands.length} commands in ${guild.name}`);
    await this.rest.put(
      Routes.applicationGuildCommands(config.get("client_id"), guild.id),
      { body: guildCommands }
    );
  }

  private async interactionCreate(interaction: Interaction) {
    if (!interaction.isCommand()) {
      return;
    }
    for(let command of this.commands) {
      try {
        if (command.shouldExecute(interaction)) {
          await command.execute(interaction);
          break;
        }
      } catch(e) {
        this.logger.error(`Command ${command.name} failed`, e);
      }
    }
  }
}

new MjBot();