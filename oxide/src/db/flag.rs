use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use chrono::Utc;
use regex::Regex;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::details::prelude::*;
use super::CachedValue;
use crate::entity;
use crate::entity::prelude::*;
use crate::errors::{AthenaError, Result};
use crate::macros::db::{crud_interface, optional_relation, single_relation};

crud_interface!(Flag);

optional_relation!(Flag, Player);
single_relation!(Flag, Challenge);

pub async fn verify(
    player_id: Uuid,
    challenge_id: Uuid,
    value: String,
    db: &DbConn,
) -> Result<(bool, i32)> {
    let Some(challenge_model) = Challenge::find_by_id(challenge_id).one(db).await? else {
        return Err(AthenaError::Generic("Challenge not found".to_owned()));
    };

    Ok((
        match challenge_model.flag_type {
            FlagTypeEnum::Static => {
                let Some(flag_model) = Flag::find()
                    .filter(entity::flag::Column::ChallengeId.eq(challenge_id))
                    .one(db)
                    .await?
                else {
                    return Err(AthenaError::Generic("Flag not found".to_owned()));
                };

                flag_model.value == value
            }

            FlagTypeEnum::Regex => {
                let Some(flag_model) = Flag::find()
                    .filter(entity::flag::Column::ChallengeId.eq(challenge_id))
                    .one(db)
                    .await?
                else {
                    return Err(AthenaError::Generic("Flag not found".to_owned()));
                };

                // TODO: find a way to prevent re-compiling
                Regex::new(&flag_model.value)?.is_match(&value)
            }

            FlagTypeEnum::PerUser => {
                let Some(flag_model) = Flag::find()
                    .filter(entity::flag::Column::ChallengeId.eq(challenge_id))
                    .filter(entity::flag::Column::PlayerId.eq(player_id))
                    .one(db)
                    .await?
                else {
                    return Err(AthenaError::Generic("Flag not found".to_owned()));
                };

                flag_model.value == value
            }
        },
        challenge_model.points,
    ))
}
