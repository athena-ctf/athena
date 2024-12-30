use std::sync::Arc;

use axum::Json;
use axum::extract::{Query, State};

use crate::errors::Result;
use crate::schemas::{JsonResponse, LeaderboardRankings, Ranking, RankingQuery};
use crate::{ApiResponse, AppState};

#[utoipa::path(
    get,
    path = "/player/leaderboard/top10",
    responses(
        (status = 200, body = [Ranking]),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn player_top_10(state: State<Arc<AppState>>) -> Result<ApiResponse<Json<Vec<Ranking>>>> {
    state
        .leaderboard_manager
        .top_10_players()
        .await
        .map(ApiResponse::json_ok)
}

#[utoipa::path(
    get,
    path = "/player/leaderboard/rankings",
    params(
        ("offset" = i64, Query),
        ("count" = i64, Query)
    ),
    responses(
        (status = 200, body = LeaderboardRankings),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn player_rankings(
    Query(RankingQuery { offset, count }): Query<RankingQuery>,
    state: State<Arc<AppState>>,
) -> Result<ApiResponse<Json<LeaderboardRankings>>> {
    let rankings = state.leaderboard_manager.list_players(offset, count).await?;
    let total = state.leaderboard_manager.player_count().await?;

    Ok(ApiResponse::json_ok(LeaderboardRankings {
        total,
        offset,
        count,
        rankings,
    }))
}

#[utoipa::path(
    get,
    path = "/player/leaderboard/team/top10",
    responses(
        (status = 200, body = [Ranking]),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn team_top_10(state: State<Arc<AppState>>) -> Result<ApiResponse<Json<Vec<Ranking>>>> {
    state.leaderboard_manager.top_10_teams().await.map(ApiResponse::json_ok)
}

#[utoipa::path(
    get,
    path = "/player/leaderboard/team/rankings",
    params(
        ("offset" = i64, Query),
        ("count" = i64, Query)
    ),
    responses(
        (status = 200, body = LeaderboardRankings),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn team_rankings(
    Query(RankingQuery { offset, count }): Query<RankingQuery>,
    state: State<Arc<AppState>>,
) -> Result<ApiResponse<Json<LeaderboardRankings>>> {
    let rankings = state.leaderboard_manager.list_teams(offset, count).await?;
    let total = state.leaderboard_manager.team_count().await?;

    Ok(ApiResponse::json_ok(LeaderboardRankings {
        total,
        offset,
        count,
        rankings,
    }))
}
