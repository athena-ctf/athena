pub mod achievement;
pub mod admin;
pub mod auth;
pub mod ban;
pub mod challenge;
pub mod challenge_file;
pub mod challenge_tag;
pub mod container;
pub mod deployment;
pub mod file;
pub mod flag;
pub mod hint;
pub mod instance;
pub mod invite;
pub mod leaderboard;
pub mod notification;
pub mod player;
pub mod settings;
pub mod stats;
pub mod submission;
pub mod tag;
pub mod team;
pub mod ticket;
pub mod unlock;

use std::collections::HashMap;

use fred::prelude::*;
use sea_orm::prelude::*;

use crate::errors::Result;
use crate::schemas::{Challenge, PlayerModel, PlayerProfile, Tag, TagSolves};

pub async fn retrieve_profile(
    player_model: PlayerModel,
    db: &DbConn,
    pool: &RedisPool,
) -> Result<PlayerProfile> {
    let rank = pool
        .zrevrank("leaderboard:player", &player_model.id.simple().to_string())
        .await?;

    let score = pool
        .zscore("leaderboard:player", &player_model.id.simple().to_string())
        .await?;

    let mut tags_map = Tag::find()
        .all(db)
        .await?
        .into_iter()
        .map(|tag| {
            (
                tag.id,
                TagSolves {
                    tag_value: tag.value,
                    solves: 0,
                },
            )
        })
        .collect::<HashMap<_, _>>();

    let solved_challenges = player_model
        .find_related(Challenge)
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .all(db)
        .await?;

    for submitted_challenge in &solved_challenges {
        let tags = submitted_challenge.find_related(Tag).all(db).await?;
        for tag in tags {
            tags_map
                .entry(tag.id)
                .and_modify(|tag_solves| tag_solves.solves += 1);
        }
    }

    Ok(PlayerProfile {
        player: player_model,
        solved_challenges,
        tag_solves: tags_map.values().cloned().collect(),
        rank,
        score,
    })
}
