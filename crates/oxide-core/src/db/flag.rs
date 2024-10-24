use std::collections::HashMap;
use std::sync::{Arc, LazyLock};

use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use entity::prelude::*;
use oxide_macros::{crud_interface_db, optional_relation_db, single_relation_db};
use regex::Regex;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use tokio::sync::RwLock;

use super::CachedValue;
use crate::errors::{Error, Result};

crud_interface_db!(Flag);

optional_relation_db!(Flag, Player);
single_relation_db!(Flag, Challenge);

static REGEX_CACHE: LazyLock<RwLock<HashMap<Uuid, Arc<Regex>>>> =
    LazyLock::new(|| RwLock::new(HashMap::new()));

pub async fn verify(
    player_id: Uuid,
    challenge_id: Uuid,
    value: String,
    db: &DbConn,
) -> Result<(bool, i32)> {
    let Some(mut challenge_model) = Challenge::find_by_id(challenge_id).one(db).await? else {
        return Err(Error::NotFound("Challenge".to_owned()));
    };

    let points = challenge_model.points;

    let is_correct = match challenge_model.flag_type {
        FlagTypeEnum::Static => {
            let Some(flag_model) = Flag::find()
                .filter(entity::flag::Column::ChallengeId.eq(challenge_id))
                .one(db)
                .await?
            else {
                return Err(Error::NotFound("Flag".to_owned()));
            };

            flag_model.value == value
        }

        FlagTypeEnum::Regex => {
            let Some(flag_model) = Flag::find()
                .filter(entity::flag::Column::ChallengeId.eq(challenge_id))
                .one(db)
                .await?
            else {
                return Err(Error::NotFound("Flag".to_owned()));
            };

            let regex = REGEX_CACHE.read().await.get(&flag_model.id).cloned();

            if let Some(regex) = regex {
                regex.is_match(&value)
            } else {
                let regex = Regex::new(&flag_model.value)?;
                let is_match = regex.is_match(&value);
                REGEX_CACHE
                    .write()
                    .await
                    .insert(flag_model.id, Arc::new(regex));

                is_match
            }
        }

        FlagTypeEnum::PerUser => {
            let Some(flag_model) = Flag::find()
                .filter(entity::flag::Column::ChallengeId.eq(challenge_id))
                .filter(entity::flag::Column::PlayerId.eq(player_id))
                .one(db)
                .await?
            else {
                return Err(Error::NotFound("Flag is not generated".to_owned()));
            };

            flag_model.value == value
        }
    };

    if is_correct {
        challenge_model.solves += 1;
        challenge_model.into_active_model().save(db).await?;
    }

    Ok((is_correct, points))
}
