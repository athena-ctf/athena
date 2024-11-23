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
        let player_model = Player::find_by_id(model.player_id).one(&state.db_conn).await?.unwrap(); // TODO: remove unwrap
        let challenge_model = Challenge::find_by_id(model.challenge_id).one(&state.db_conn).await?.unwrap();

        state
            .persistent_client
            .zincrby::<(), _, _>(
                PLAYER_LEADERBOARD,
                -f64::from(challenge_model.points),
                player_model.id.simple().to_string()
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
                player_model.team_id.simple().to_string(),
            )
            .await?;
    },
    on_update: {
        match (old_model.is_correct, model.is_correct) {
            (true, false) => {
                let player_model = Player::find_by_id(model.player_id).one(&state.db_conn).await?.unwrap(); // TODO: remove unwrap
                let challenge_model = Challenge::find_by_id(model.challenge_id).one(&state.db_conn).await?.unwrap();

                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        PLAYER_LEADERBOARD,
                        -f64::from(challenge_model.points),
                        player_model.id.simple().to_string()
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
                        player_model.team_id.simple().to_string(),
                    )
                    .await?;
            }
            (false, true) => {
                let player_model = Player::find_by_id(model.player_id).one(&state.db_conn).await?.unwrap(); // TODO: remove unwrap
                let challenge_model = Challenge::find_by_id(model.challenge_id).one(&state.db_conn).await?.unwrap();

                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        PLAYER_LEADERBOARD,
                        f64::from(challenge_model.points),
                        player_model.id.simple().to_string()
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
                        player_model.team_id.simple().to_string(),
                    )
                    .await?;
            }
            _ => {}
        }
    }
);
