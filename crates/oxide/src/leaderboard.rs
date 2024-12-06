use chrono::Utc;
use entity::links::{TeamToAward, TeamToChallenge, TeamToHint};
use fred::prelude::*;
use sea_orm::prelude::*;
use sea_orm::QuerySelect;

use crate::errors::Result;
use crate::schemas::{Award, Challenge, Hint, Player, PointsHistory, Ranking, Team};

const PLAYER_LEADERBOARD: &str = "leaderboard:player";
const TEAM_LEADERBOARD: &str = "leaderboard:team";

pub struct Manager {
    redis_pool: Pool,
    end_timestamp: i64,
    num_digits: u32,
}

impl Manager {
    pub fn new(redis_pool: Pool, end_timestamp: i64, max_duration: i64) -> Self {
        Self {
            redis_pool,
            end_timestamp,
            num_digits: max_duration.ilog10() + 1,
        }
    }

    fn player_history_key(id: Uuid) -> String {
        format!("player:history:{id}")
    }

    fn team_history_key(id: Uuid) -> String {
        format!("team:history:{id}")
    }

    fn get_points(&self, score: f64) -> i32 {
        (score / 10f64.powi(self.num_digits as i32)) as i32
    }

    fn get_score(&self, points: i32) -> f64 {
        ((points * 10i32.pow(self.num_digits)) as f64)
            + (self.end_timestamp - Utc::now().timestamp()) as f64
    }

    pub async fn load_players(&self, db: &DbConn) -> Result<()> {
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

        Ok(self
            .redis_pool
            .zadd(
                PLAYER_LEADERBOARD,
                None,
                None,
                false,
                false,
                leaderboard_player,
            )
            .await?)
    }

    pub async fn load_teams(&self, db: &DbConn) -> Result<()> {
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

        Ok(self
            .redis_pool
            .zadd(TEAM_LEADERBOARD, None, None, false, false, leaderboard_team)
            .await?)
    }

    pub async fn top_10_players(&self) -> Result<Vec<Ranking>> {
        Ok(self
            .redis_pool
            .zrevrange::<Vec<(String, f64)>, _>(PLAYER_LEADERBOARD, 0, 10, true)
            .await?
            .into_iter()
            .map(|(k, v)| Ranking {
                member: k,
                score: v,
            })
            .collect())
    }

    pub async fn top_10_teams(&self) -> Result<Vec<Ranking>> {
        Ok(self
            .redis_pool
            .zrevrange::<Vec<(String, f64)>, _>(TEAM_LEADERBOARD, 0, 10, true)
            .await?
            .into_iter()
            .map(|(k, v)| Ranking {
                member: k,
                score: v,
            })
            .collect())
    }

    pub async fn init_player(&self, id: Uuid) -> Result<()> {
        Ok(self
            .redis_pool
            .zadd(
                PLAYER_LEADERBOARD,
                None,
                None,
                false,
                false,
                (0.0, id.to_string()),
            )
            .await?)
    }

    pub async fn init_team(&self, id: Uuid) -> Result<()> {
        Ok(self
            .redis_pool
            .zadd(
                TEAM_LEADERBOARD,
                None,
                None,
                false,
                false,
                (0.0, id.to_string()),
            )
            .await?)
    }

    pub async fn update_player(&self, id: Uuid, points: i32) -> Result<()> {
        self.redis_pool
            .zadd::<(), _, _>(
                PLAYER_LEADERBOARD,
                None,
                None,
                false,
                false,
                (self.get_score(points), id.to_string()),
            )
            .await?;

        Ok(self
            .redis_pool
            .zadd(
                Self::player_history_key(id),
                None,
                None,
                false,
                false,
                (Utc::now().timestamp() as f64, points),
            )
            .await?)
    }

    pub async fn update_team(&self, id: Uuid, points: i32) -> Result<()> {
        self.redis_pool
            .zadd::<(), _, _>(
                TEAM_LEADERBOARD,
                None,
                None,
                false,
                false,
                (self.get_score(points), id.to_string()),
            )
            .await?;

        Ok(self
            .redis_pool
            .zadd(
                Self::team_history_key(id),
                None,
                None,
                false,
                false,
                (Utc::now().timestamp() as f64, points),
            )
            .await?)
    }

    pub async fn player_count(&self) -> Result<u64> {
        Ok(self.redis_pool.zcard(PLAYER_LEADERBOARD).await?)
    }

    pub async fn team_count(&self) -> Result<u64> {
        Ok(self.redis_pool.zcard(TEAM_LEADERBOARD).await?)
    }

    pub async fn list_players(&self, offset: u64, count: u64) -> Result<Vec<Ranking>> {
        Ok(self
            .redis_pool
            .zrange::<Vec<(String, f64)>, _, _, _>(
                PLAYER_LEADERBOARD,
                0,
                -1,
                None,
                true,
                Some((offset as i64, count as i64)),
                true,
            )
            .await?
            .into_iter()
            .map(|(k, v)| Ranking {
                member: k,
                score: v,
            })
            .collect())
    }

    pub async fn list_teams(&self, offset: u64, count: u64) -> Result<Vec<Ranking>> {
        Ok(self
            .redis_pool
            .zrange::<Vec<(String, f64)>, _, _, _>(
                TEAM_LEADERBOARD,
                0,
                -1,
                None,
                true,
                Some((offset as i64, count as i64)),
                true,
            )
            .await?
            .into_iter()
            .map(|(k, v)| Ranking {
                member: k,
                score: v,
            })
            .collect())
    }

    pub async fn player_rank(&self, id: Uuid) -> Result<(u64, i32)> {
        let (rank, score) = self
            .redis_pool
            .zrevrank(PLAYER_LEADERBOARD, id.to_string(), true)
            .await?;

        Ok((rank, self.get_points(score)))
    }

    pub async fn team_rank(&self, id: Uuid) -> Result<(u64, i32)> {
        let (rank, score) = self
            .redis_pool
            .zrevrank(TEAM_LEADERBOARD, id.to_string(), true)
            .await?;

        Ok((rank, self.get_points(score)))
    }

    pub async fn player_history(&self, id: Uuid) -> Result<Vec<PointsHistory>> {
        Ok(self
            .redis_pool
            .zrange::<Vec<(i64, f64)>, _, _, _>(
                Self::player_history_key(id),
                0,
                -1,
                None,
                false,
                None,
                true,
            )
            .await?
            .into_iter()
            .map(|(points, timestamp)| PointsHistory {
                timestamp: timestamp as i64,
                points,
            })
            .collect())
    }

    pub async fn team_history(&self, id: Uuid) -> Result<Vec<PointsHistory>> {
        Ok(self
            .redis_pool
            .zrange::<Vec<(i64, f64)>, _, _, _>(
                Self::team_history_key(id),
                0,
                -1,
                None,
                false,
                None,
                true,
            )
            .await?
            .into_iter()
            .map(|(points, timestamp)| PointsHistory {
                timestamp: timestamp as i64,
                points,
            })
            .collect())
    }
}
