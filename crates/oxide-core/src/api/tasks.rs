// use std::time::Duration;

// use bollard::Docker;
// use chrono::Utc;
// use fred::prelude::{RedisPool, SortedSetsInterface};
// use sea_orm::{
//     ActiveModelTrait, ColumnTrait, DbConn, EntityTrait, IntoActiveModel, QueryFilter, QuerySelect,
// };
// use tokio::task::AbortHandle;

// use crate::docker::DockerManager;
// use crate::errors::{Error, Result};
// use crate::schemas::Instance;

// pub async fn remove_instances(docker_conn: &Docker, db_conn: &DbConn) -> Result<()> {
//     let expired_instances = Instance::find()
//         .filter(entity::instance::Column::Expiry.lte(Utc::now().naive_utc()))
//         .all(db_conn)
//         .await?;

//     for instance in expired_instances {
//         crate::docker::delete_instance(docker_conn, instance.container_id.clone()).await?;
//         instance.into_active_model().delete(db_conn).await?;
//     }

//     Ok(())
// }

use fred::prelude::{RedisPool, SortedSetsInterface};
use sea_orm::{DbConn, EntityTrait, QuerySelect};

use crate::errors::Result;

pub async fn load_leaderboard(db: &DbConn, pool: &RedisPool) -> Result<()> {
    let player_scores = entity::player::Entity::find()
        .select_only()
        .columns([
            entity::player::Column::Score,
            entity::player::Column::DisplayName,
        ])
        .into_tuple::<(i32, String)>()
        .all(db)
        .await?
        .into_iter()
        .map(|(score, disp_name)| (f64::from(score), disp_name))
        .collect::<Vec<_>>();

    pool.zadd::<(), _, _>("leaderboard", None, None, false, false, player_scores)
        .await?;

    Ok(())
}

// pub async fn start_instances(docker_manager: &DockerManager, db_conn: &DbConn) -> Result<()> {
//     Ok(())
// }

// pub fn run(docker_manager: &DockerManager, db_conn: &DbConn) -> Vec<AbortHandle> {
//     let db_conn_cloned = db_conn.clone();
//     let docker_conn_cloned = docker_conn.clone();

//     let remove_instances_handle = tokio::task::spawn_blocking(|| async move {
//         loop {
//             remove_instances(&docker_conn_cloned, &db_conn_cloned).await?;
//             tokio::time::sleep(Duration::from_secs(1)).await;
//         }

//         #[allow(unreachable_code)]
//         Ok::<(), Error>(())
//     })
//     .abort_handle();

//     vec![remove_instances_handle]
// }

// pub fn stop(handles: Vec<AbortHandle>) {
//     for handle in handles {
//         handle.abort();
//     }
// }
