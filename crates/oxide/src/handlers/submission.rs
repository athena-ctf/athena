use chrono::Utc;

use crate::redis_keys::{player_history_key, PLAYER_LEADERBOARD, TEAM_LEADERBOARD};
use crate::schemas::{
    Challenge, ChallengeModel, CreateSubmissionSchema, JsonResponse, Player, PlayerModel,
    Submission, SubmissionModel,
};

oxide_macros::crud_join!(
    Submission,
    Challenge,
    Player,
    on_delete: {
        let Some(player_model) = Player::find_by_id(model.player_id).one(&state.db_conn).await? else {
            return Err(Error::NotFound("Player not found".to_owned()))
        };
        let Some(challenge_model) = Challenge::find_by_id(model.challenge_id).one(&state.db_conn).await? else {
            return Err(Error::NotFound("Challenge not found".to_owned()))
        };

        state
            .persistent_client
            .zincrby::<(), _, _>(
                PLAYER_LEADERBOARD,
                -f64::from(challenge_model.points),
                player_model.id.to_string()
            )
            .await?;

        state
            .persistent_client
            .lpush::<(), _, _>(
                player_history_key(player_model.id),
                vec![format!(
                    "{}:{}",
                    Utc::now().timestamp(),
                    -f64::from(challenge_model.points)
                )]
            )
            .await?;

        state
            .persistent_client
            .zincrby::<(), _, _>(
                TEAM_LEADERBOARD,
                -f64::from(challenge_model.points),
                player_model.team_id.to_string(),
            )
            .await?;
    },
    on_update: {
        match (old_model.is_correct, model.is_correct) {
            (true, false) => {
                let Some(player_model) = Player::find_by_id(model.player_id).one(&state.db_conn).await? else {
                    return Err(Error::NotFound("Player not found".to_owned()))
                };
                let Some(challenge_model) = Challenge::find_by_id(model.challenge_id).one(&state.db_conn).await? else {
                    return Err(Error::NotFound("Challenge not found".to_owned()))
                };

                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        PLAYER_LEADERBOARD,
                        -f64::from(challenge_model.points),
                        player_model.id.to_string()
                    )
                    .await?;

                state
                    .persistent_client
                    .lpush::<(), _, _>(
                        player_history_key(player_model.id),
                        vec![format!(
                            "{}:{}",
                            Utc::now().timestamp(),
                            -f64::from(challenge_model.points)
                        )]
                    )
                    .await?;

                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        TEAM_LEADERBOARD,
                        -f64::from(challenge_model.points),
                        player_model.team_id.to_string(),
                    )
                    .await?;
            }
            (false, true) => {
                let Some(player_model) = Player::find_by_id(model.player_id).one(&state.db_conn).await? else {
                    return Err(Error::NotFound("Player not found".to_owned()))
                };
                let Some(challenge_model) = Challenge::find_by_id(model.challenge_id).one(&state.db_conn).await? else {
                    return Err(Error::NotFound("Challenge not found".to_owned()))
                };

                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        PLAYER_LEADERBOARD,
                        f64::from(challenge_model.points),
                        player_model.id.to_string()
                    )
                    .await?;

                state
                    .persistent_client
                    .lpush::<(), _, _>(
                        player_history_key(player_model.id),
                        vec![format!(
                            "{}:{}",
                            Utc::now().timestamp(),
                            f64::from(challenge_model.points)
                        )]
                    )
                    .await?;

                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        TEAM_LEADERBOARD,
                        f64::from(challenge_model.points),
                        player_model.team_id.to_string(),
                    )
                    .await?;
            }
            _ => {}
        }
    }
);
