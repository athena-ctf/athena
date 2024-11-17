use entity::links::{TeamToAchievement, TeamToChallenge, TeamToHint};
use fred::prelude::*;
use sea_orm::prelude::*;
use sea_orm::{DatabaseTransaction, QuerySelect};

use crate::errors::Result;
use crate::schemas::{Achievement, Challenge, Hint, Player, Submission, Team};

pub async fn load_leaderboard(db: &DatabaseTransaction, pool: &RedisPool) -> Result<()> {
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
            .into_tuple::<(u64,)>()
            .one(db)
            .await?
            .unwrap()
            .0;

        let hint_costs = player
            .find_related(Hint)
            .select_only()
            .column_as(Expr::col(entity::hint::Column::Cost).sum(), "hint_costs")
            .into_tuple::<(u64,)>()
            .one(db)
            .await?
            .unwrap()
            .0;

        let achievement_prizes = player
            .find_related(Achievement)
            .select_only()
            .column_as(
                Expr::col(entity::achievement::Column::Prize).sum(),
                "achievement_prizes",
            )
            .into_tuple::<(u64,)>()
            .one(db)
            .await?
            .unwrap()
            .0;

        leaderboard_player.push((
            (challenge_points + achievement_prizes - hint_costs) as f64,
            player.id.simple().to_string(),
        ));
    }

    pool.zadd::<(), _, _>(
        "leaderboard:player",
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
            .into_tuple::<(u64,)>()
            .one(db)
            .await?
            .unwrap()
            .0;

        let hint_costs = team
            .find_linked(TeamToHint)
            .select_only()
            .column_as(Expr::col(entity::hint::Column::Cost).sum(), "hint_costs")
            .into_tuple::<(u64,)>()
            .one(db)
            .await?
            .unwrap()
            .0;

        let achievement_prizes = team
            .find_linked(TeamToAchievement)
            .select_only()
            .column_as(
                Expr::col(entity::achievement::Column::Prize).sum(),
                "achievement_prizes",
            )
            .into_tuple::<(u64,)>()
            .one(db)
            .await?
            .unwrap()
            .0;

        leaderboard_team.push((
            (challenge_points + achievement_prizes - hint_costs) as f64,
            team.id.simple().to_string(),
        ));
    }

    pool.zadd::<(), _, _>(
        "leaderboard:team",
        None,
        None,
        false,
        false,
        leaderboard_team,
    )
    .await?;

    Ok(())
}

pub async fn load_challenge_solves(db: &DatabaseTransaction, pool: &RedisPool) -> Result<()> {
    for challenge in Challenge::find().all(db).await? {
        pool.hset::<(), _, _>(
            "challenge:solves",
            vec![(
                challenge.id.simple().to_string(),
                challenge
                    .find_related(Submission)
                    .filter(entity::submission::Column::IsCorrect.eq(true))
                    .count(db)
                    .await?,
            )],
        )
        .await?;
    }

    Ok(())
}

pub async fn verify_achievements(db: &DbConn) -> Result<bool> {
    let first_blood = Achievement::find()
        .filter(entity::achievement::Column::Value.eq("First Blood"))
        .count(db)
        .await?
        == 1;
    let second_blood = Achievement::find()
        .filter(entity::achievement::Column::Value.eq("Second Blood"))
        .count(db)
        .await?
        == 1;
    let third_blood = Achievement::find()
        .filter(entity::achievement::Column::Value.eq("Third Blood"))
        .count(db)
        .await?
        == 1;

    Ok(first_blood && second_blood && third_blood)
}
