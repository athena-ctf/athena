use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use entity::extensions::{HintSummary, PartialChallenge};
use entity::prelude::*;
use oxide_macros::{crud_interface_db, multiple_relation_with_model_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel, QueryOrder, QuerySelect};

use super::CachedValue;
use crate::errors::Result;
use crate::schemas::{ChallengeSummary, DetailedChallenge};

crud_interface_db!(Challenge);

multiple_relation_with_model_db!(Challenge, Tag);
multiple_relation_with_model_db!(Challenge, File);
multiple_relation_with_model_db!(Challenge, Hint);
multiple_relation_with_model_db!(Challenge, Instance);
multiple_relation_with_model_db!(Challenge, Achievement);
multiple_relation_with_model_db!(Challenge, Submission);
multiple_relation_with_model_db!(Challenge, ChallengeTag);

pub async fn list_summaries(player_id: Uuid, db: &DbConn) -> Result<Vec<ChallengeSummary>> {
    let challenges = Challenge::find()
        .into_partial_model::<PartialChallenge>()
        .all(db)
        .await?;
    let submissions = Submission::find()
        .select_only()
        .column(entity::submission::Column::ChallengeId)
        .filter(entity::submission::Column::PlayerId.eq(player_id))
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .order_by_asc(entity::submission::Column::ChallengeId)
        .into_tuple::<(Uuid,)>()
        .all(db)
        .await?;

    let mut summaries = Vec::with_capacity(challenges.len());

    for challenge in challenges {
        let tags = Tag::find()
            .into_partial_model::<TagDetails>()
            .all(db)
            .await?;

        summaries.push(ChallengeSummary {
            solved: submissions.binary_search(&(challenge.id,)).is_ok(),
            challenge,
            tags,
        })
    }

    // TODO: check performance

    Ok(summaries)
}

pub async fn detailed_challenge(challenge_id: Uuid, db: &DbConn) -> Result<DetailedChallenge> {
    Ok(DetailedChallenge {
        files: File::find()
            .filter(entity::file::Column::ChallengeId.eq(challenge_id))
            .into_partial_model::<FileDetails>()
            .all(db)
            .await?,
        hints: Hint::find()
            .filter(entity::hint::Column::ChallengeId.eq(challenge_id))
            .into_partial_model::<HintSummary>()
            .all(db)
            .await?,
    })
}
