use bollard::secret::ContainerStateStatusEnum;
use entity::links::{TeamToAward, TeamToChallenge, TeamToHint};
use fred::prelude::*;
use sea_orm::prelude::*;
use sea_orm::{Condition, QuerySelect};

use crate::docker::Manager;
use crate::errors::Result;
use crate::redis_keys::{
    CHALLENGE_SOLVES, PLAYER_LAST_UPDATED, PLAYER_LEADERBOARD, TEAM_LEADERBOARD,
};
use crate::schemas::{
    Award, Challenge, ChallengeKindEnum, Deployment, Hint, Instance, Player, Submission, Team,
};

pub async fn load_leaderboard(db: &DbConn, redis_pool: &Pool) -> Result<()> {
    let players = Player::find().all(db).await?;
    let mut leaderboard_player = Vec::with_capacity(players.len());

    for player in players {
        let challenge_points = player
            .find_related(Challenge)
            .select_only()
            .column_as(
                Expr::col(entity::challenge::Column::Points).sum(),
                "challenge_points",
            )
            .filter(entity::submission::Column::IsCorrect.eq(true))
            .into_tuple::<(i32,)>()
            .one(db)
            .await?
            .unwrap()
            .0;

        let hint_costs = player
            .find_related(Hint)
            .select_only()
            .column_as(Expr::col(entity::hint::Column::Cost).sum(), "hint_costs")
            .into_tuple::<(i32,)>()
            .one(db)
            .await?
            .unwrap()
            .0;

        let award_prizes = player
            .find_related(Award)
            .select_only()
            .column_as(
                Expr::col(entity::award::Column::Prize).sum(),
                "award_prizes",
            )
            .into_tuple::<(i32,)>()
            .one(db)
            .await?
            .unwrap()
            .0;

        leaderboard_player.push((
            f64::from(challenge_points + award_prizes - hint_costs),
            player.id.to_string(),
        ));
    }

    redis_pool
        .zadd::<(), _, _>(
            PLAYER_LEADERBOARD,
            None,
            None,
            false,
            false,
            leaderboard_player,
        )
        .await?;

    let teams = Team::find().all(db).await?;
    let mut leaderboard_team = Vec::with_capacity(teams.len());

    for team in teams {
        let challenge_points = team
            .find_linked(TeamToChallenge)
            .select_only()
            .column_as(
                Expr::col(entity::challenge::Column::Points).sum(),
                "challenge_points",
            )
            .filter(entity::submission::Column::IsCorrect.eq(true))
            .into_tuple::<(i32,)>()
            .one(db)
            .await?
            .unwrap()
            .0;

        let hint_costs = team
            .find_linked(TeamToHint)
            .select_only()
            .column_as(Expr::col(entity::hint::Column::Cost).sum(), "hint_costs")
            .into_tuple::<(i32,)>()
            .one(db)
            .await?
            .unwrap()
            .0;

        let award_prizes = team
            .find_linked(TeamToAward)
            .select_only()
            .column_as(
                Expr::col(entity::award::Column::Prize).sum(),
                "award_prizes",
            )
            .into_tuple::<(i32,)>()
            .one(db)
            .await?
            .unwrap()
            .0;

        leaderboard_team.push((
            f64::from(challenge_points + award_prizes - hint_costs),
            team.id.to_string(),
        ));
    }

    redis_pool
        .zadd::<(), _, _>(TEAM_LEADERBOARD, None, None, false, false, leaderboard_team)
        .await?;

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

pub async fn load_static_deployments(db: &DbConn, manager: &Manager) -> Result<()> {
    for challenge_model in Challenge::find()
        .filter(entity::challenge::Column::Kind.eq(ChallengeKindEnum::StaticContainerized))
        .all(db)
        .await?
    {
        manager.deploy_challenge(&challenge_model, None).await?;
    }

    Ok(())
}

pub async fn unload_deployments(db: &DbConn, manager: &Manager) -> Result<()> {
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

pub async fn watch_static_deployments(db: &DbConn, manager: &Manager) -> Result<()> {
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
