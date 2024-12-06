use std::sync::Arc;

use axum::extract::{Query, State};
use axum::Json;

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
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// List top 10 players of leaderboard
pub async fn player_top_10(state: State<Arc<AppState>>) -> Result<Json<Vec<Ranking>>> {
    state.leaderboard_manager.top_10_players().await.map(Json)
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
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// List leaderboard rankings of players with offset and count
pub async fn player_rankings(
    Query(RankingQuery { offset, count }): Query<RankingQuery>,
    state: State<Arc<AppState>>,
) -> Result<Json<LeaderboardRankings>> {
    let rankings = state
        .leaderboard_manager
        .list_players(offset, count)
        .await?;
    let total = state.leaderboard_manager.player_count().await?;

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
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// List top 10 teams of leaderboard
pub async fn team_top_10(state: State<Arc<AppState>>) -> Result<Json<Vec<Ranking>>> {
    state.leaderboard_manager.top_10_teams().await.map(Json)
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
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// List leaderboard rankings of teams with offset and count
pub async fn team_rankings(
    Query(RankingQuery { offset, count }): Query<RankingQuery>,
    state: State<Arc<AppState>>,
) -> Result<Json<LeaderboardRankings>> {
    let rankings = state.leaderboard_manager.list_teams(offset, count).await?;
    let total = state.leaderboard_manager.team_count().await?;

    Ok(Json(LeaderboardRankings {
        total,
        offset,
        count,
        rankings,
    }))
}
