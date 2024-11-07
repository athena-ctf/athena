use fred::prelude::{RedisPool, SortedSetsInterface};
use sea_orm::{DatabaseTransaction, EntityTrait, QuerySelect};
use uuid::Uuid;

use crate::errors::Result;

pub async fn load_leaderboard(db: &DatabaseTransaction, pool: &RedisPool) -> Result<()> {
    let player_scores = entity::player::Entity::find()
        .select_only()
        .columns([entity::player::Column::Score, entity::player::Column::Id])
        .into_tuple::<(i32, Uuid)>()
        .all(db)
        .await?
        .into_iter()
        .map(|(score, id)| (f64::from(score), id.simple().to_string()))
        .collect::<Vec<_>>();

    pool.zadd::<(), _, _>("leaderboard", None, None, false, false, player_scores)
        .await?;

    Ok(())
}

// TODO: add expire challenge deployments task
