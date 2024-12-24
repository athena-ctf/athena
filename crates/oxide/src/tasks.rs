use bollard::models::ContainerStateStatusEnum;
use fred::prelude::*;
use sea_orm::prelude::*;
use sea_orm::{Condition, QuerySelect};

use crate::errors::Result;
use crate::redis_keys::{CHALLENGE_SOLVES, PLAYER_LAST_UPDATED};
use crate::schemas::{
    Award, Challenge, ChallengeKindEnum, Deployment, Instance, Player, Submission,
};
use crate::{docker, leaderboard};

pub async fn load_leaderboard(
    db: &DbConn,
    leaderboard_manager: &leaderboard::Manager,
) -> Result<()> {
    leaderboard_manager.load_players(db).await?;
    leaderboard_manager.load_teams(db).await?;

    Ok(())
}

pub async fn load_challenge_solves(db: &DbConn, pool: &Pool) -> Result<()> {
    for challenge in Challenge::find().all(db).await? {
        pool.hset::<(), _, _>(
            CHALLENGE_SOLVES,
            (
                challenge.id.to_string(),
                challenge
                    .find_related(Submission)
                    .filter(entity::submission::Column::IsCorrect.eq(true))
                    .count(db)
                    .await?,
            ),
        )
        .await?;
    }

    Ok(())
}

pub async fn load_player_updates(db: &DbConn, pool: &Pool) -> Result<()> {
    for (player_id, updated_at) in Player::find()
        .select_only()
        .columns([
            entity::player::Column::Id,
            entity::player::Column::UpdatedAt,
        ])
        .into_tuple::<(Uuid, DateTimeWithTimeZone)>()
        .all(db)
        .await?
    {
        pool.hset::<(), _, _>(
            PLAYER_LAST_UPDATED,
            (player_id.to_string(), updated_at.timestamp()),
        )
        .await?;
    }

    Ok(())
}

pub async fn verify_awards(db: &DbConn) -> Result<bool> {
    let first_blood = Award::find()
        .filter(entity::award::Column::Value.eq("First Blood"))
        .count(db)
        .await?
        == 1;
    let second_blood = Award::find()
        .filter(entity::award::Column::Value.eq("Second Blood"))
        .count(db)
        .await?
        == 1;
    let third_blood = Award::find()
        .filter(entity::award::Column::Value.eq("Third Blood"))
        .count(db)
        .await?
        == 1;

    Ok(first_blood && second_blood && third_blood)
}

pub async fn load_static_deployments(db: &DbConn, manager: &docker::Manager) -> Result<()> {
    for challenge_model in Challenge::find()
        .filter(entity::challenge::Column::Kind.eq(ChallengeKindEnum::StaticContainerized))
        .all(db)
        .await?
    {
        manager.deploy_challenge(&challenge_model, None).await?;
    }

    Ok(())
}

pub async fn unload_deployments(db: &DbConn, manager: &docker::Manager) -> Result<()> {
    for challenge_model in Challenge::find()
        .filter(
            Condition::any()
                .add(entity::challenge::Column::Kind.eq(ChallengeKindEnum::StaticContainerized))
                .add(entity::challenge::Column::Kind.eq(ChallengeKindEnum::DynamicContainerized)),
        )
        .all(db)
        .await?
    {
        manager.cleanup_challenge(challenge_model.id, None).await?;
    }

    Ok(())
}

pub async fn watch_static_deployments(db: &DbConn, manager: &docker::Manager) -> Result<()> {
    for (challenge_model, deployment_model) in Challenge::find()
        .filter(entity::challenge::Column::Kind.eq(ChallengeKindEnum::StaticContainerized))
        .find_also_related(Deployment)
        .all(db)
        .await?
    {
        if let Some(deployment_model) = deployment_model {
            for instance_model in deployment_model.find_related(Instance).all(db).await? {
                if !matches!(
                    manager
                        .get_container_status(&instance_model.container_id)
                        .await?,
                    ContainerStateStatusEnum::RUNNING | ContainerStateStatusEnum::RESTARTING
                ) {
                    manager
                        .restart_container(&instance_model.container_id)
                        .await?;
                }
            }
        } else {
            manager.deploy_challenge(&challenge_model, None).await?;
        }
    }

    Ok(())
}
