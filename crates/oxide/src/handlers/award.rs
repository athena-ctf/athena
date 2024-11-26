use chrono::Utc;

use crate::redis_keys::{player_history_key, PLAYER_LEADERBOARD, TEAM_LEADERBOARD};
use crate::schemas::{
    Award, AwardModel, CreateAwardSchema, JsonResponse, Player, PlayerAward, PlayerAwardModel,
    PlayerModel,
};

oxide_macros::crud!(
    Award,
    single: [Player, PlayerAward],
    optional: [],
    multiple: [],
    on_delete: {
        for player_model in model.find_related(Player).all(&state.db_conn).await? {
            state
                .persistent_client
                .zincrby::<(), _, _>(
                    PLAYER_LEADERBOARD,
                    -f64::from(model.prize),
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
                        -f64::from(model.prize)
                    )]
                )
                .await?;

            state
                .persistent_client
                .zincrby::<(), _, _>(
                    TEAM_LEADERBOARD,
                    -f64::from(model.prize),
                    player_model.team_id.to_string(),
                )
                .await?;
        }
    },
    on_update: {
        if model.prize != old_model.prize {
            for player_model in model.find_related(Player).all(&state.db_conn).await? {
                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        PLAYER_LEADERBOARD,
                        f64::from(model.prize - old_model.prize),
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
                            f64::from(model.prize - old_model.prize),
                        )]
                    ).await?;

                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        TEAM_LEADERBOARD,
                        f64::from(model.prize - old_model.prize),
                        player_model.team_id.to_string(),
                    )
                    .await?;
            }
        }
    }
);
