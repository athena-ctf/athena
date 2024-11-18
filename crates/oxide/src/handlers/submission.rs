use chrono::Local;

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
                "leaderboard:player",
                -f64::from(challenge_model.points),
                player_model.id.simple().to_string()
            )
            .await?;

        state
            .persistent_client
            .lpush::<(), _, _>(
                format!("player:{}:history", player_model.id.simple()),
                vec![format!(
                    "{}:{}",
                    Local::now().timestamp_millis(),
                    -f64::from(challenge_model.points)
                )]
            )
            .await?;

        state
            .persistent_client
            .zincrby::<(), _, _>(
                "leaderboard:team",
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
                        "leaderboard:player",
                        -f64::from(challenge_model.points),
                        player_model.id.simple().to_string()
                    )
                    .await?;

                state
                    .persistent_client
                    .lpush::<(), _, _>(
                        format!("player:{}:history", player_model.id.simple()),
                        vec![format!(
                            "{}:{}",
                            Local::now().timestamp_millis(),
                            -f64::from(challenge_model.points)
                        )]
                    )
                    .await?;

                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        "leaderboard:team",
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
                        "leaderboard:player",
                        f64::from(challenge_model.points),
                        player_model.id.simple().to_string()
                    )
                    .await?;

                state
                    .persistent_client
                    .lpush::<(), _, _>(
                        format!("player:{}:history", player_model.id.simple()),
                        vec![format!(
                            "{}:{}",
                            Local::now().timestamp_millis(),
                            f64::from(challenge_model.points)
                        )]
                    )
                    .await?;

                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        "leaderboard:team",
                        f64::from(challenge_model.points),
                        player_model.team_id.simple().to_string(),
                    )
                    .await?;
            }
            _ => {}
        }
    }
);
