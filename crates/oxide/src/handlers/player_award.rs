use chrono::Utc;

use crate::redis_keys::{player_history_key, PLAYER_LEADERBOARD, TEAM_LEADERBOARD};
use crate::schemas::{
    Award, AwardModel, CreatePlayerAwardSchema, JsonResponse, Player, PlayerAward,
    PlayerAwardModel, PlayerModel,
};

oxide_macros::crud_join!(
    PlayerAward,
    Player,
    Award,
    on_delete: {
        let Some(player_model) = Player::find_by_id(model.player_id).one(&state.db_conn).await? else {
            return Err(Error::NotFound("Player not found".to_owned()))
        };
        let Some(award_model) = Award::find_by_id(model.award_id).one(&state.db_conn).await? else {
            return Err(Error::NotFound("Award not found".to_owned()))
        };

        state
            .persistent_client
            .zincrby::<(), _, _>(
                PLAYER_LEADERBOARD,
                -f64::from(award_model.prize),
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
                    -f64::from(award_model.prize)
                )]
            )
            .await?;

        state
            .persistent_client
            .zincrby::<(), _, _>(
                TEAM_LEADERBOARD,
                -f64::from(award_model.prize),
                player_model.team_id.to_string(),
            )
            .await?;
    }
);
