use std::collections::HashMap;

use argon2::password_hash::rand_core::OsRng;
use argon2::password_hash::SaltString;
use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use chrono::Utc;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::details::prelude::*;
use super::CachedValue;
use crate::entity;
use crate::entity::prelude::*;
use crate::errors::Result;
use crate::macros::db::{crud_interface, multiple_relation_with_id, optional_relation};
use crate::schemas::{PlayerProfile, TagSolves, UpdateProfileSchema};

crud_interface!(Player);
optional_relation!(Player, Instance);
optional_relation!(Player, Team);
optional_relation!(Player, Ban);
multiple_relation_with_id!(Player, Flag);
multiple_relation_with_id!(Player, Notification);
multiple_relation_with_id!(Player, Achievement);
multiple_relation_with_id!(Player, Submission);
multiple_relation_with_id!(Player, Unlock);

pub async fn retrieve_by_email(
    email: String,
    db: &DbConn,
    client: &mut PooledConnection<'_, RedisConnectionManager>,
) -> Result<Option<PlayerModel>> {
    let value: CachedValue<PlayerModel> = client.get(format!("player:email:{email}")).await?;

    if let CachedValue::Hit(value) = value {
        Ok(Some(value))
    } else {
        let Some(model) = Player::find()
            .filter(entity::player::Column::Email.eq(&email))
            .one(db)
            .await?
        else {
            return Ok(None);
        };

        client
            .set::<_, _, ()>(
                format!("player:email:{email}"),
                &serde_json::to_vec(&model)?,
            )
            .await?;

        Ok(Some(model))
    }
}

pub async fn retrieve_profile_by_username(
    username: String,
    db: &DbConn,
    client: &mut PooledConnection<'_, RedisConnectionManager>,
) -> Result<Option<PlayerProfile>> {
    let value: CachedValue<PlayerModel> = client.get(format!("player:username:{username}")).await?;

    let player_model = if let CachedValue::Hit(value) = value {
        value
    } else {
        let Some(player_model) = Player::find()
            .filter(entity::player::Column::Username.eq(&username))
            .one(db)
            .await?
        else {
            return Ok(None);
        };

        client
            .set::<_, _, ()>(
                format!("player:username:{username}"),
                &serde_json::to_vec(&player_model)?,
            )
            .await?;

        player_model
    };

    let mut tags_map = Tag::find()
        .all(db)
        .await?
        .into_iter()
        .map(|tag| {
            (
                tag.value.clone(),
                TagSolves {
                    tag_id: tag.id,
                    tag_value: tag.value,
                    solves: 0,
                },
            )
        })
        .collect::<HashMap<String, TagSolves>>();

    let mut challenges = Vec::new();

    for submitted_challenge in player_model.find_related(Challenge).all(db).await? {
        let tags = crate::db::challenge::related_tags(&submitted_challenge, db).await?;
        for tag in tags {
            tags_map
                .entry(tag.value)
                .and_modify(|tag_solves| tag_solves.solves += 1);
        }

        challenges.push(submitted_challenge);
    }

    Ok(Some(PlayerProfile {
        player: player_model,
        solved_challenges: challenges,
        tag_solves: tags_map.values().cloned().collect(),
    }))
}

pub async fn ban(id: Uuid, details: BanDetails, db: &DbConn) -> Result<Option<BanModel>> {
    if let Some(player) = Player::find_by_id(id).one(db).await? {
        let ban_model = crate::db::ban::create(details, db).await?;
        let mut active_player = player.into_active_model();
        active_player.ban_id = ActiveValue::Set(Some(ban_model.id));

        active_player.update(db).await?;

        Ok(Some(ban_model))
    } else {
        Ok(None)
    }
}

pub async fn update_profile(
    id: Uuid,
    details: UpdateProfileSchema,
    db: &DbConn,
) -> Result<PlayerModel> {
    let mut player = details.into_active_model();
    player.id = ActiveValue::Set(id);

    Ok(Player::update(player).exec(db).await?)
}

pub async fn verify(
    username: String,
    password: String,
    db: &DbConn,
) -> Result<Option<PlayerModel>> {
    let Some(player) = Player::find()
        .filter(entity::player::Column::Username.eq(username))
        .one(db)
        .await?
    else {
        return Ok(None);
    };

    Argon2::default()
        .verify_password(password.as_bytes(), &PasswordHash::new(&player.password)?)?;

    Ok(Some(player))
}

pub async fn reset(
    player_model: PlayerModel,
    password: String,
    db: &DbConn,
) -> Result<PlayerModel> {
    let mut active_user = player_model.into_active_model();
    let salt = SaltString::generate(&mut OsRng);

    active_user.password = ActiveValue::Set(
        Argon2::default()
            .hash_password(password.as_bytes(), &salt)?
            .to_string(),
    );

    Ok(active_user.update(db).await?)
}
