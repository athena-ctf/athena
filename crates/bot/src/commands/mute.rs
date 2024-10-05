use poise::serenity_prelude::Member;
use serenity::all::{Mentionable, Timestamp};

use crate::{Context, Error};

#[poise::command(slash_command, guild_only)]
pub async fn mute(
    ctx: Context<'_>,
    #[description = "The member to mute"] mut member: Member,
    #[description = "Reason for muting"] reason: Option<String>,
) -> Result<(), Error> {
    let permissions = ctx.author_member().await.unwrap().permissions(ctx)?;

    if !permissions.administrator() {
        ctx.say("You don't have permission to use this command.")
            .await?;
        return Ok(());
    }

    if let Err(why) = member
        .disable_communication_until_datetime(ctx, Timestamp::now())
        .await
    {
        ctx.say(format!("Failed to mute member: {}", why)).await?;
    } else {
        let response = format!(
            "Muted {} successfully. Reason: {}",
            member.mention(),
            reason.unwrap_or_else(|| "No reason provided".to_string())
        );
        ctx.say(response).await?;
    }

    Ok(())
}

#[poise::command(slash_command, guild_only)]
pub async fn unmute(
    ctx: Context<'_>,
    #[description = "The member to unmute"] mut member: Member,
) -> Result<(), Error> {
    let permissions = ctx.author_member().await.unwrap().permissions(ctx)?;
    if !permissions.administrator() {
        ctx.say("You don't have permission to use this command.")
            .await?;
        return Ok(());
    }

    if let Err(why) = member.enable_communication(ctx).await {
        ctx.say(format!("Failed to unmute member: {}", why)).await?;
    } else {
        let response = format!("Unmuted {} successfully.", member.mention());
        ctx.say(response).await?;
    }

    Ok(())
}
