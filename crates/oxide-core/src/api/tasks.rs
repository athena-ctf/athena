use fred::prelude::{RedisPool, SortedSetsInterface};
use sea_orm::{DatabaseTransaction, EntityTrait, QuerySelect};
use uuid::Uuid;

use crate::errors::Result;

pub async fn load_leaderboard(db: &DatabaseTransaction, pool: &RedisPool) -> Result<()> {
    pool.zadd::<(), _, _>(
        "leaderboard:player",
        None,
        None,
        false,
        false,
        Vec::<(f64, String)>::new(),
    )
    .await?;

    pool.zadd::<(), _, _>(
        "leaderboard:team",
        None,
        None,
        false,
        false,
        Vec::<(f64, String)>::new(),
    )
    .await?;

    todo!();

    Ok(())
}
