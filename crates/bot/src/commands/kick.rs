use poise::serenity_prelude::Member;
use serenity::all::Mentionable;

use crate::{Context, Error};

#[poise::command(slash_command, guild_only)]
pub async fn kick(
    ctx: Context<'_>,
    #[description = "The member to kick"] member: Member,
    #[description = "Reason for kicking"] reason: Option<String>,
) -> Result<(), Error> {
    let permissions = ctx.author_member().await.unwrap().permissions(ctx)?;
    if !permissions.administrator() {
        ctx.say("You don't have permission to use this command.")
            .await?;
        return Ok(());
    }

    if let Err(why) = member
        .kick_with_reason(ctx, reason.as_deref().unwrap_or("No reason provided"))
        .await
    {
        ctx.say(format!("Failed to kick member: {}", why)).await?;
    } else {
        let response = format!(
            "Kicked {} successfully. Reason: {}",
            member.mention(),
            reason.unwrap_or_else(|| "No reason provided".to_string())
        );
        ctx.say(response).await?;
    }

    Ok(())
}
