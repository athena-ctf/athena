use std::time::Instant;

use poise::CreateReply;

use crate::{Context, Error};

#[poise::command(slash_command)]
pub async fn ping(ctx: Context<'_>) -> Result<(), Error> {
    let start = Instant::now();
    let msg = ctx.say("Pong!").await?;
    let latency = start.elapsed().as_millis();

    msg.edit(
        ctx,
        CreateReply::default().content(format!("Pong! Latency: {}ms", latency)),
    )
    .await?;

    Ok(())
}
