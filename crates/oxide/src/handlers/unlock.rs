use chrono::Utc;

use crate::redis_keys::{player_history_key, PLAYER_LEADERBOARD, TEAM_LEADERBOARD};
use crate::schemas::{
    CreateUnlockSchema, Hint, HintModel, JsonResponse, Player, PlayerModel, Unlock, UnlockModel,
};

oxide_macros::crud_join!(
    Unlock,
    Player,
    Hint,
    on_delete: {
        let player_model = Player::find_by_id(model.player_id).one(&state.db_conn).await?.unwrap(); // TODO: remove unwrap
        let hint_model = Hint::find_by_id(model.hint_id).one(&state.db_conn).await?.unwrap();

        state
            .persistent_client
            .zincrby::<(), _, _>(
                PLAYER_LEADERBOARD,
                f64::from(hint_model.cost),
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
                    f64::from(hint_model.cost)
                )]
            )
            .await?;

        state
            .persistent_client
            .zincrby::<(), _, _>(
                TEAM_LEADERBOARD,
                f64::from(hint_model.cost),
                player_model.team_id.simple().to_string(),
            )
            .await?;
    }
);
