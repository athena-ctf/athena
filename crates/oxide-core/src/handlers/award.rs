use chrono::Local;

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
            state.persistent_client.zincrby::<(), _, _>(
                "leaderboard:player",
                -f64::from(model.prize),
                player_model.id.simple().to_string()
            ).await?;

            state.persistent_client.lpush::<(), _, _>(
                format!("player:{}:history", player_model.id.simple()),
                vec![format!("{}:{}", Local::now().timestamp_millis(), -f64::from(model.prize))]
            ).await?;
        }
    },
    on_update: {
        if model.prize != old_model.prize {
            for player_model in model.find_related(Player).all(&state.db_conn).await? {
                state.persistent_client.zincrby::<(), _, _>(
                    "leaderboard:player",
                    f64::from(model.prize - old_model.prize),
                    player_model.id.simple().to_string()
                ).await?;
            }
        }
    }
);
