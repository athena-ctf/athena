use crate::schemas::{
    Achievement, AchievementModel, CreateAchievementSchema, JsonResponse, Player,
    PlayerAchievement, PlayerAchievementModel, PlayerModel,
};

oxide_macros::crud!(
    Achievement,
    single: [Player, PlayerAchievement],
    optional: [],
    multiple: [],
    on_delete: {
        for player_model in model.find_related(Player).all(&state.db_conn).await? {
            state.persistent_client.zincrby::<(), _, _>(
                "leaderboard:player",
                -f64::from(model.prize),
                player_model.id.simple().to_string()
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
