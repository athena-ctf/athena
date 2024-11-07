use std::collections::HashMap;

use entity::prelude::*;
use fred::prelude::{RedisPool, SortedSetsInterface};
use sea_orm::prelude::*;

use crate::errors::{Error, Result};
use crate::schemas::{PlayerProfile, TagSolves};

pub async fn retrieve_profile(
    user_model: UserModel,
    player_model: PlayerModel,
    db: &DbConn,
    pool: &RedisPool,
) -> Result<PlayerProfile> {
    let rank = pool
        .zrevrank("leaderboard", &player_model.id.simple().to_string())
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
