use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use chrono::Utc;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel, QuerySelect};

use super::details::prelude::*;
use super::CachedValue;
use crate::entity;
use crate::entity::prelude::*;
use crate::errors::Result;
use crate::macros::db::{crud_interface, multiple_relation};

crud_interface!(Challenge);

multiple_relation!(Challenge, Tag);
multiple_relation!(Challenge, File);
multiple_relation!(Challenge, Hint);
multiple_relation!(Challenge, Instance);
multiple_relation!(Challenge, Achievement);
multiple_relation!(Challenge, Submission);
multiple_relation!(Challenge, ChallengeTag);

pub async fn calculate_solves(id: Uuid, db: &DbConn) -> Result<u64> {
    let solves = Submission::find()
        .select_only()
        .filter(entity::submission::Column::ChallengeId.eq(id))
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .count(db)
        .await?;

    Ok(solves)
}
