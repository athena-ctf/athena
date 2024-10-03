use std::time::Duration;

use bollard::Docker;
use chrono::Utc;
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DbConn, EntityTrait, IntoActiveModel, Order, QueryFilter,
    QueryOrder, QuerySelect,
};
use tokio::task::AbortHandle;

use crate::db::leaderboard;
use crate::errors::{Error, Result};
use crate::schemas::{CategoryEnum, Instance, LeaderboardDetails, Player, Team};

pub async fn update_leaderboard(db_conn: &DbConn) -> Result<()> {
    let players = Player::find()
        .limit(10)
        .order_by(entity::player::Column::Score, Order::Desc)
        .all(db_conn)
        .await?
        .into_iter()
        .map(|player| player.display_name)
        .collect::<Vec<_>>();

    let teams = Team::find()
        .limit(10)
        .order_by(entity::team::Column::Score, Order::Desc)
        .all(db_conn)
        .await?
        .into_iter()
        .map(|player| player.name)
        .collect::<Vec<_>>();

    leaderboard::create(
        LeaderboardDetails {
            category: CategoryEnum::Player,
            rank0: players.first().cloned(),
            rank1: players.get(1).cloned(),
            rank2: players.get(2).cloned(),
            rank3: players.get(3).cloned(),
            rank4: players.get(4).cloned(),
            rank5: players.get(5).cloned(),
            rank6: players.get(6).cloned(),
            rank7: players.get(7).cloned(),
            rank8: players.get(8).cloned(),
            rank9: players.get(9).cloned(),
        },
        db_conn,
    )
    .await?;

    leaderboard::create(
        LeaderboardDetails {
            category: CategoryEnum::Team,
            rank0: teams.first().cloned(),
            rank1: teams.get(1).cloned(),
            rank2: teams.get(2).cloned(),
            rank3: teams.get(3).cloned(),
            rank4: teams.get(4).cloned(),
            rank5: teams.get(5).cloned(),
            rank6: teams.get(6).cloned(),
            rank7: teams.get(7).cloned(),
            rank8: teams.get(8).cloned(),
            rank9: teams.get(9).cloned(),
        },
        db_conn,
    )
    .await?;

    Ok(())
}

pub async fn remove_instances(docker_conn: &Docker, db_conn: &DbConn) -> Result<()> {
    let expired_instances = Instance::find()
        .filter(entity::instance::Column::Expiry.lte(Utc::now().naive_utc()))
        .all(db_conn)
        .await?;

    for instance in expired_instances {
        crate::docker::delete_instance(docker_conn, instance.container_id.clone()).await?;
        instance.into_active_model().delete(db_conn).await?;
    }

    Ok(())
}

pub fn run(docker_conn: &Docker, db_conn: &DbConn) -> Vec<AbortHandle> {
    let db_conn_cloned = db_conn.clone();

    #[allow(unreachable_code)]
    let update_leaderboard_handle = tokio::spawn(async move {
        loop {
            update_leaderboard(&db_conn_cloned).await?;
            tokio::time::sleep(Duration::from_secs(60)).await;
        }

        Ok::<(), Error>(())
    })
    .abort_handle();

    let db_conn_cloned = db_conn.clone();
    let docker_conn_cloned = docker_conn.clone();

    #[allow(unreachable_code)]
    let remove_instances_handle = tokio::spawn(async move {
        loop {
            remove_instances(&docker_conn_cloned, &db_conn_cloned).await?;
            tokio::time::sleep(Duration::from_secs(10)).await;
        }

        Ok::<(), Error>(())
    })
    .abort_handle();

    vec![update_leaderboard_handle, remove_instances_handle]
}

pub fn stop(handles: Vec<AbortHandle>) {
    for handle in handles {
        handle.abort();
    }
}
