use std::sync::Arc;

use axum::extract::{Query, State};
use axum::Json;
use fred::prelude::*;

use crate::errors::Result;
use crate::schemas::{JsonResponse, LeaderboardRankings, Ranking, RankingQuery};
use crate::service::AppState;

#[utoipa::path(
    post,
    path = "/player/leaderboard/top10",
    responses(
        (status = 200, description = "Listed top 10 players successfully", body = [Ranking]),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// List top 10 players of leaderboard
pub async fn player_top_10(state: State<Arc<AppState>>) -> Result<Json<Vec<Ranking>>> {
    Ok(Json(
        state
            .persistent_client
            .zrevrange::<Vec<(String, f64)>, _>("leaderboard:player", 0, 10, true)
            .await?
            .into_iter()
            .map(|(k, v)| Ranking {
                member: k,
                score: v,
            })
            .collect(),
    ))
}

#[utoipa::path(
    post,
    path = "/player/leaderboard/rankings",
    params(
        ("offset" = i64, Query, description = "Offset of the rankings"),
        ("count" = i64, Query, description = "Number of players to get")
    ),
    responses(
        (status = 200, description = "Listed leaderboard rankings of players with offset and count successfully", body = LeaderboardRankings),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// List leaderboard rankings of players with offset and count
pub async fn player_rankings(
    Query(RankingQuery { offset, count }): Query<RankingQuery>,
    state: State<Arc<AppState>>,
) -> Result<Json<LeaderboardRankings>> {
    let rankings = state
        .persistent_client
        .zrange::<Vec<(String, f64)>, _, _, _>(
            "leaderboard:player",
            0,
            -1,
            None,
            true,
            Some((offset, count)),
            true,
        )
        .await?
        .into_iter()
        .map(|(k, v)| Ranking {
            member: k,
            score: v,
        })
        .collect();

    let total = state
        .persistent_client
        .zcard::<i64, _>("leaderboard:player")
        .await?;

    Ok(Json(LeaderboardRankings {
        total,
        offset,
        count,
        rankings,
    }))
}

#[utoipa::path(
    post,
    path = "/player/leaderboard/team/top10",
    responses(
        (status = 200, description = "Listed top 10 teams successfully", body = [Ranking]),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// List top 10 teams of leaderboard
pub async fn team_top_10(state: State<Arc<AppState>>) -> Result<Json<Vec<Ranking>>> {
    Ok(Json(
        state
            .persistent_client
            .zrevrange::<Vec<(String, f64)>, _>("leaderboard:team", 0, 10, true)
            .await?
            .into_iter()
            .map(|(k, v)| Ranking {
                member: k,
                score: v,
            })
            .collect(),
    ))
}

#[utoipa::path(
    post,
    path = "/player/leaderboard/team/rankings",
    params(
        ("offset" = i64, Query, description = "Offset of the rankings"),
        ("count" = i64, Query, description = "Number of teams to get")
    ),
    responses(
        (status = 200, description = "Listed leaderboard rankings of teams with offset and count successfully", body = LeaderboardRankings),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// List leaderboard rankings of teams with offset and count
pub async fn team_rankings(
    Query(RankingQuery { offset, count }): Query<RankingQuery>,
    state: State<Arc<AppState>>,
) -> Result<Json<LeaderboardRankings>> {
    let rankings = state
        .persistent_client
        .zrange::<Vec<(String, f64)>, _, _, _>(
            "leaderboard:team",
            0,
            -1,
            None,
            true,
            Some((offset, count)),
            true,
        )
        .await?
        .into_iter()
        .map(|(k, v)| Ranking {
            member: k,
            score: v,
        })
        .collect();

    let total = state
        .persistent_client
        .zcard::<i64, _>("leaderboard:team")
        .await?;

    Ok(Json(LeaderboardRankings {
        total,
        offset,
        count,
        rankings,
    }))
}
