use std::collections::HashMap;

use argon2::password_hash::rand_core::OsRng;
use argon2::password_hash::SaltString;
use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use entity::extensions::UpdateProfileSchema;
use entity::prelude::*;
use fred::prelude::{RedisPool, SortedSetsInterface};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, DatabaseTransaction, IntoActiveModel};

use crate::errors::{Error, Result};
use crate::schemas::{PlayerProfile, PlayerSummary, TagSolves};

pub async fn retrieve_by_email(email: String, db: &DbConn) -> Result<Option<UserModel>> {
    let Some((user_model, Some(_))) = User::find()
        .find_also_related(Player)
        .filter(entity::user::Column::Email.eq(&email))
        .one(db)
        .await?
    else {
        return Ok(None);
    };

    Ok(Some(user_model))
}

pub async fn retrieve_profile(
    user_model: UserModel,
    player_model: PlayerModel,
    db: &DbConn,
    pool: &RedisPool,
) -> Result<PlayerProfile> {
    let rank = pool
        .zrevrank("leaderboard", &player_model.display_name)
        .await?;
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

    let solved_challenges = player_model
        .find_related(Challenge)
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .all(db)
        .await?;

    for submitted_challenge in &solved_challenges {
        let tags = submitted_challenge.find_related(Tag).all(db).await?;
        for tag in tags {
            tags_map
                .entry(tag.value)
                .and_modify(|tag_solves| tag_solves.solves += 1);
        }
    }

    Ok(PlayerProfile {
        user: user_model,
        player: player_model,
        solved_challenges,
        tag_solves: tags_map.values().cloned().collect(),
        rank,
    })
}

pub async fn retrieve_profile_by_username(
    username: String,
    db: &DbConn,
    pool: &RedisPool,
) -> Result<PlayerProfile> {
    let Some((user_model, Some(player_model))) = User::find()
        .find_also_related(Player)
        .filter(entity::user::Column::Username.eq(&username))
        .one(db)
        .await?
    else {
        return Err(Error::NotFound("Player not found".to_owned()));
    };

    retrieve_profile(user_model, player_model, db, pool).await
}

pub async fn retrieve_player_summary_by_id(
    id: Uuid,
    db: &DbConn,
    pool: &RedisPool,
) -> Result<PlayerSummary> {
    let Some((user_model, Some(player_model))) = User::find_by_id(id)
        .find_also_related(Player)
        .one(db)
        .await?
    else {
        return Err(Error::NotFound("Player not found".to_owned()));
    };

    Ok(PlayerSummary {
        submissions: player_model.find_related(Submission).all(db).await?,
        unlocks: player_model.find_related(Unlock).all(db).await?,
        achievements: player_model.find_related(Achievement).all(db).await?,
        profile: retrieve_profile(user_model, player_model, db, pool).await?,
    })
}

pub async fn ban(id: Uuid, details: CreateBanSchema, db: &DbConn) -> Result<Option<BanModel>> {
    if let Some(player) = Player::find_by_id(id).one(db).await? {
        let ban_model = details.into_active_model().insert(db).await?;
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

pub async fn reset(
    player_model: UserModel,
    password: String,
    db: &DatabaseTransaction,
) -> Result<UserModel> {
    let mut active_user = player_model.into_active_model();
    let salt = SaltString::generate(&mut OsRng);

    active_user.password = ActiveValue::Set(
        Argon2::default()
            .hash_password(password.as_bytes(), &salt)?
            .to_string(),
    );

    Ok(active_user.update(db).await?)
}
