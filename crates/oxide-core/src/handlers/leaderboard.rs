use std::sync::Arc;

use axum::extract::{Query, State};
use axum::Json;
use fred::prelude::*;

use crate::errors::Result;
use crate::schemas::{LeaderboardRankings, RankingQuery};
use crate::service::AppState;

pub async fn top_10(state: State<Arc<AppState>>) -> Result<Json<Vec<(String, f64)>>> {
    Ok(Json(
        state
            .persistent_client
            .zrevrange("leaderboard", 0, 10, true)
            .await?,
    ))
}

pub async fn rankings(
    Query(RankingQuery { offset, count }): Query<RankingQuery>,
    state: State<Arc<AppState>>,
) -> Result<Json<LeaderboardRankings>> {
    let rankings = state
        .persistent_client
        .zrange::<Vec<(String, f64)>, _, _, _>(
            "leaderboard",
            0,
            -1,
            None,
            true,
            Some((offset, count)),
            true,
        )
        .await?;

    let total = state
        .persistent_client
        .zcard::<i64, _>("leaderboard")
        .await?;

    Ok(Json(LeaderboardRankings {
        total,
        offset,
        count,
        rankings,
    }))
}
