use poise::serenity_prelude::ChannelType;
use serenity::all::{CreateThread, Mentionable};

use crate::{Context, Error};

#[poise::command(slash_command, guild_only)]
pub async fn create_ticket(
    ctx: Context<'_>,
    #[description = "Ticket subject"] subject: String,
) -> Result<(), Error> {
    let guild_id = ctx.guild_channel().await.unwrap();
    let author = ctx.author();

    let thread_name = format!("ticket-{}-{}", author.name, subject.replace(' ', "-"));

    let thread = guild_id
        .create_thread(
            ctx,
            CreateThread::new(thread_name)
                .kind(ChannelType::PrivateThread)
                .invitable(false),
        )
        .await?;

    thread.id.add_thread_member(ctx, author.id).await?;

    ctx.say(format!(
        "Created a private ticket thread: {}",
        thread.mention()
    ))
    .await?;

    Ok(())
}
