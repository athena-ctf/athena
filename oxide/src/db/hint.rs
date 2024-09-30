use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use chrono::Utc;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel, QuerySelect};

use super::details::hint::HintSummary;
use super::details::prelude::*;
use super::CachedValue;
use crate::entity;
use crate::entity::prelude::*;
use crate::errors::{AthenaError, Result};
use crate::macros::db::{crud_interface, multiple_relation_with_id, single_relation};

crud_interface!(Hint);

single_relation!(Hint, Challenge);
multiple_relation_with_id!(Hint, Unlock);

pub async fn list_summaries(db: &DbConn) -> Result<Vec<HintSummary>> {
    Ok(Hint::find()
        .into_partial_model::<HintSummary>()
        .all(db)
        .await?)
}

pub async fn unlock(hint_id: Uuid, player_id: Uuid, db: &DbConn) -> Result<Option<HintModel>> {
    Unlock::insert(
        UnlockModel {
            player_id,
            hint_id,
            date_created: Utc::now().naive_utc(),
        }
        .into_active_model(),
    )
    .exec(db)
    .await?;

    let Some(hint_model) = Hint::find_by_id(hint_id).one(db).await? else {
        return Ok(None);
    };
    let player_model = Player::find_by_id(player_id).one(db).await?.unwrap();
    let score = player_model.score;

    let mut active_model = player_model.into_active_model();
    active_model.score = ActiveValue::Set(score - hint_model.cost);

    active_model.update(db).await?;

    Ok(Some(hint_model))
}
