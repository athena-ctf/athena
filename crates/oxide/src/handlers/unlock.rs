use chrono::Local;

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
                "leaderboard:player",
                f64::from(hint_model.cost),
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
                    f64::from(hint_model.cost)
                )]
            )
            .await?;

        state
            .persistent_client
            .zincrby::<(), _, _>(
                "leaderboard:team",
                f64::from(hint_model.cost),
                player_model.team_id.simple().to_string(),
            )
            .await?;
    }
);
