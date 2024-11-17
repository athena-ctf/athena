use crate::schemas::{
    Achievement, AchievementModel, CreateAchievementSchema, JsonResponse, Player,
    PlayerAchievement, PlayerAchievementModel, PlayerModel,
};

oxide_macros::crud!(
    Achievement,
    single: [Player, PlayerAchievement],
    optional: [],
    multiple: [],
    on_delete: async move {
        for player_model in model.find_related(Player).all(&state_cloned.db_conn).await? {
            state_cloned.persistent_client.zincrby::<(), _, _>(
                "leaderboard:player",
                f64::from(model.prize),
                player_model.id.simple().to_string()
            ).await?;
        }

        Ok::<(), Error>(())
    },
    on_update: async move {
        for player_model in model.find_related(Player).all(&state_cloned.db_conn).await? {
            state_cloned.persistent_client.zincrby::<(), _, _>(
                "leaderboard:player",
                f64::from(model.prize),
                player_model.id.simple().to_string()
            ).await?;
        }

        Ok::<(), Error>(())
    }
);
