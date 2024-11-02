use entity::extensions::PartialChallenge;
use entity::prelude::*;
use oxide_macros::{crud_interface_db, multiple_relation_with_model_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel, Iterable, QueryOrder, QuerySelect};

use crate::errors::Result;
use crate::schemas::{
    ChallengeSummary, DetailedChallenge, HintSummary, PlayerChallengeState, UnlockStatus,
};

crud_interface_db!(Challenge);

multiple_relation_with_model_db!(Challenge, Container);
multiple_relation_with_model_db!(Challenge, Tag);
multiple_relation_with_model_db!(Challenge, File);
multiple_relation_with_model_db!(Challenge, Hint);
multiple_relation_with_model_db!(Challenge, Instance);
multiple_relation_with_model_db!(Challenge, Achievement);
multiple_relation_with_model_db!(Challenge, Submission);
multiple_relation_with_model_db!(Challenge, ChallengeTag);

pub async fn list_summaries(
    player_id: Uuid,
    max_attempts: Option<usize>,
    db: &DbConn,
) -> Result<Vec<ChallengeSummary>> {
    let challenges = Challenge::find()
        .into_partial_model::<PartialChallenge>()
        .all(db)
        .await?;
    let submissions = Submission::find()
        .select_only()
        .columns([
            entity::submission::Column::ChallengeId,
            entity::submission::Column::Flags,
            entity::submission::Column::IsCorrect,
        ])
        .filter(entity::submission::Column::PlayerId.eq(player_id))
        .order_by_asc(entity::submission::Column::ChallengeId)
        .into_tuple::<(Uuid, Vec<String>, bool)>()
        .all(db)
        .await?;

    let mut summaries = Vec::with_capacity(challenges.len());

    for challenge in challenges {
        let tags = Tag::find()
            .into_partial_model::<CreateTagSchema>()
            .all(db)
            .await?;

        let state = submissions
            .binary_search_by_key(&challenge.id, |(id, ..)| *id)
            .ok()
            .map_or(PlayerChallengeState::ChallengeLimitReached, |idx: usize| {
                let (_, flags, is_correct) = &submissions[idx];

                if *is_correct {
                    PlayerChallengeState::Solved
                } else if max_attempts.is_some_and(|max_attempts| flags.len() == max_attempts) {
                    PlayerChallengeState::ChallengeLimitReached
                } else {
                    PlayerChallengeState::Unsolved
                }
            });

        summaries.push(ChallengeSummary {
            challenge,
            tags,
            state,
        });
    }

    // TODO: check performance

    Ok(summaries)
}

pub async fn detailed_challenge(
    player_id: Uuid,
    challenge_id: Uuid,
    db: &DbConn,
) -> Result<DetailedChallenge> {
    let hints = Hint::find()
        .find_also_related(Unlock)
        .select_only()
        .columns(entity::hint::Column::iter())
        .columns(entity::unlock::Column::iter())
        .filter(entity::hint::Column::ChallengeId.eq(challenge_id))
        .filter(entity::unlock::Column::PlayerId.eq(player_id))
        .into_model::<HintModel, UnlockModel>()
        .all(db)
        .await?
        .into_iter()
        .map(|(hint, unlock)| HintSummary {
            id: hint.id,
            cost: hint.cost,
            status: if unlock.is_some() {
                UnlockStatus::Unlocked {
                    value: hint.description,
                }
            } else {
                UnlockStatus::Locked
            },
        })
        .collect();

    Ok(DetailedChallenge {
        files: File::find()
            .filter(entity::file::Column::ChallengeId.eq(challenge_id))
            .into_partial_model::<CreateFileSchema>()
            .all(db)
            .await?,
        hints,
    })
}
