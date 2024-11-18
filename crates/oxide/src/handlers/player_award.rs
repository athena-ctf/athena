use chrono::Local;

use crate::schemas::{
    Award, AwardModel, CreatePlayerAwardSchema, JsonResponse, Player, PlayerAward,
    PlayerAwardModel, PlayerModel,
};

oxide_macros::crud_join!(
    PlayerAward,
    Player,
    Award,
    on_delete: {
        let player_model = Player::find_by_id(model.player_id).one(&state.db_conn).await?.unwrap(); // TODO: remove unwrap
        let award_model = Award::find_by_id(model.award_id).one(&state.db_conn).await?.unwrap();

        state
            .persistent_client
            .zincrby::<(), _, _>(
                "leaderboard:player",
                -f64::from(award_model.prize),
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
                    -f64::from(award_model.prize)
                )]
            )
            .await?;

        state
            .persistent_client
            .zincrby::<(), _, _>(
                "leaderboard:team",
                -f64::from(award_model.prize),
                player_model.team_id.simple().to_string(),
            )
            .await?;
    }
);
