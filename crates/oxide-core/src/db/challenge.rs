use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use oxide_macros::{crud_interface_db, multiple_relation_with_model_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel, QuerySelect};

use super::CachedValue;
use crate::entity;
use crate::entity::prelude::*;
use crate::errors::Result;
use crate::schemas::HintSummary;

crud_interface_db!(Challenge);

multiple_relation_with_model_db!(Challenge, Tag);
multiple_relation_with_model_db!(Challenge, File);
multiple_relation_with_model_db!(Challenge, Hint);
multiple_relation_with_model_db!(Challenge, Instance);
multiple_relation_with_model_db!(Challenge, Achievement);
multiple_relation_with_model_db!(Challenge, Submission);
multiple_relation_with_model_db!(Challenge, ChallengeTag);

pub async fn calculate_solves(id: Uuid, db: &DbConn) -> Result<u64> {
    let solves = Submission::find()
        .select_only()
        .filter(entity::submission::Column::ChallengeId.eq(id))
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .count(db)
        .await?;

    Ok(solves)
}

pub async fn related_hint_summaries(
    model: &ChallengeModel,
    db: &DbConn,
) -> Result<Vec<HintSummary>> {
    Ok(model
        .find_related(Hint)
        .into_partial_model::<HintSummary>()
        .all(db)
        .await?)
}
