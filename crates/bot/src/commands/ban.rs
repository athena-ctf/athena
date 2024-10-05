use poise::serenity_prelude::{Member, UserId};
use serenity::all::Mentionable;

use crate::{Context, Error};

#[poise::command(slash_command, guild_only)]
pub async fn ban(
    ctx: Context<'_>,
    #[description = "The member to ban"] member: Member,
    #[description = "Reason for banning"] reason: Option<String>,
    #[description = "Number of days' worth of messages to delete"] dmd: u8,
) -> Result<(), Error> {
    let permissions = ctx.author_member().await.unwrap().permissions(ctx)?;
    if !permissions.administrator() {
        ctx.say("You don't have permission to use this command.")
            .await?;
        return Ok(());
    }

    let reason = reason.unwrap_or_else(|| "No reason provided".to_string());

    if let Err(why) = member.ban_with_reason(ctx, dmd, &reason).await {
        ctx.say(format!("Failed to ban member: {}", why)).await?;
    } else {
        let response = format!(
            "Banned {} successfully. Reason: {}",
            member.mention(),
            reason
        );
        ctx.say(response).await?;
    }

    Ok(())
}

#[poise::command(slash_command, guild_only)]
pub async fn unban(
    ctx: Context<'_>,
    #[description = "The user ID to unban"] user_id: UserId,
) -> Result<(), Error> {
    let permissions = ctx.author_member().await.unwrap().permissions(ctx)?;
    if !permissions.administrator() {
        ctx.say("You don't have permission to use this command.")
            .await?;
        return Ok(());
    }

    if let Err(why) = ctx.guild_id().unwrap().unban(ctx, user_id).await {
        ctx.say(format!("Failed to unban user: {}", why)).await?;
    } else {
        let response = format!("Unbanned <@{}> successfully.", user_id);
        ctx.say(response).await?;
    }

    Ok(())
}
