use std::collections::HashMap;

use argon2::password_hash::rand_core::OsRng;
use argon2::password_hash::SaltString;
use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use entity::extensions::UpdateProfileSchema;
use entity::prelude::*;
use oxide_macros::{
    crud_interface_db, multiple_relation_db, optional_relation_db, single_relation_db,
};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::CachedValue;
use crate::errors::{Error, Result};
use crate::schemas::{PlayerProfile, PlayerSummary, TagSolves};

crud_interface_db!(Player);

single_relation_db!(Player, Team);

optional_relation_db!(Player, Instance);
optional_relation_db!(Player, Ban);

multiple_relation_db!(Player, Flag);
multiple_relation_db!(Player, Notification);
multiple_relation_db!(Player, Achievement);
multiple_relation_db!(Player, Submission);
multiple_relation_db!(Player, Unlock);

pub async fn retrieve_by_email(
    email: String,
    db: &DbConn,
    client: &mut PooledConnection<'_, RedisConnectionManager>,
) -> Result<Option<UserModel>> {
    let value: CachedValue<UserModel> = client.get(format!("user:email:{email}")).await?;

    if let CachedValue::Hit(value) = value {
        Ok(Some(value))
    } else {
        let Some((user_model, Some(_))) = User::find()
            .find_also_related(Player)
            .filter(entity::user::Column::Email.eq(&email))
            .one(db)
            .await?
        else {
            return Ok(None);
        };

        client
            .set::<_, _, ()>(
                format!("user:email:{email}"),
                &serde_json::to_vec(&user_model)?,
            )
            .await?;

        Ok(Some(user_model))
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
        let Some((_, Some(player_model))) = User::find()
            .find_also_related(Player)
            .filter(entity::user::Column::Username.eq(&username))
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

    for submitted_challenge in player_model
        .find_related(Challenge)
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .all(db)
        .await?
    {
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

pub async fn retrieve_player_summary_by_id(id: Uuid, db: &DbConn) -> Result<Option<PlayerSummary>> {
    let Some((user_model, Some(player_model))) = User::find_by_id(id)
        .find_also_related(Player)
        .one(db)
        .await?
    else {
        return Ok(None);
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

    for submitted_challenge in player_model
        .find_related(Challenge)
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .all(db)
        .await?
    {
        let tags = crate::db::challenge::related_tags(&submitted_challenge, db).await?;
        for tag in tags {
            tags_map
                .entry(tag.value)
                .and_modify(|tag_solves| tag_solves.solves += 1);
        }
    }

    Ok(Some(PlayerSummary {
        submissions: player_model.find_related(Submission).all(db).await?,
        unlocks: player_model.find_related(Unlock).all(db).await?,
        achievements: player_model.find_related(Achievement).all(db).await?,
        player: player_model,
        user: user_model,
        tag_solves: tags_map.values().cloned().collect(),
    }))
}

pub async fn ban(id: Uuid, details: CreateBanSchema, db: &DbConn) -> Result<Option<BanModel>> {
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
    let Some((player, Some(user_model))) = Player::find()
        .find_also_related(User)
        .filter(entity::user::Column::Username.eq(username))
        .one(db)
        .await?
    else {
        return Ok(None);
    };

    Argon2::default().verify_password(
        password.as_bytes(),
        &PasswordHash::new(&user_model.password)?,
    )?;

    Ok(Some(player))
}

pub async fn reset(player_model: UserModel, password: String, db: &DbConn) -> Result<UserModel> {
    let mut active_user = player_model.into_active_model();
    let salt = SaltString::generate(&mut OsRng);

    active_user.password = ActiveValue::Set(
        Argon2::default()
            .hash_password(password.as_bytes(), &salt)?
            .to_string(),
    );

    Ok(active_user.update(db).await?)
}
