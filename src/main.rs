mod commands;

use std::sync::Arc;

use config::Config;
use twilight_cache_inmemory::{InMemoryCache, ResourceType};
use twilight_gateway::{Intents, ShardId, Shard, Event};
use twilight_http::Client as HttpClient;

#[tokio::main]
async fn main() {
    let settings = Config::builder()
        .add_source(config::File::with_name("config/settings"))
        .add_source(config::Environment::with_prefix("APP"))
        .build()
        .unwrap();

    let settings = Arc::new(settings);

    let token = settings.get::<String>("token").expect("Discord token not found");

    let intents = Intents::GUILDS | Intents::GUILD_MESSAGES | Intents::GUILD_MESSAGE_REACTIONS | Intents::DIRECT_MESSAGES | Intents::DIRECT_MESSAGE_REACTIONS;

    let mut shard = Shard::new(ShardId::ONE, token.clone(), intents);

    let http = Arc::new(HttpClient::new(token));

    let cache = InMemoryCache::builder()
        .resource_types(ResourceType::all())
        .message_cache_size(200)
        .build();

    // let interaction = http.interaction(0);
    

    loop {
        let event = match shard.next_event().await {
            Ok(event) => event,
            Err(source) => {
                tracing::warn!(?source, "Error receiving event");

                if source.is_fatal() {
                    tracing::error!("Fatal error, exiting");
                    break;
                }

                continue;
            }
        };

        cache.update(&event);

        tokio::spawn(handle_event(event, Arc::clone(&http), Arc::clone(&settings)));
    }

    

}

async fn handle_event(event: Event, http: Arc<HttpClient>, config: Arc<Config>) {
    match event {
        Event::MessageCreate(message) => {
            if message.author.bot {
                return;
            }

            // if let Err(source) = commands::handle_command(message, http).await {
            //     tracing::error!(?source, "Error handling command");
            // }
        }
        Event::Ready(ready) => {
            tracing::info!("Ready on shard {:#?}", ready.shard);
            // Loop through ready.guilds and register slash commands
            let app_id = {
                let response = http.current_user_application().await.unwrap();
                response.model().await.unwrap().id
            };
            let interaction = http.interaction(app_id);
            for guild in ready.guilds {
                let guild_id = guild.id;
                let command = interaction.create_guild_command(guild.id)
            }
        }
        _ => {}
    }
}
