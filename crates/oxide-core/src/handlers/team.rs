use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use oxide_macros::{crud_interface_api, multiple_relation_api, optional_relation_api};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{
    BanModel, CreateTeamSchema, JsonResponse, InviteModel, PlayerModel, TeamModel, TeamProfile,
    TeamSummary, TokenClaims,
};
use crate::service::AppState;

crud_interface_api!(Team);

optional_relation_api!(Team, Ban);

multiple_relation_api!(Team, Invite);
multiple_relation_api!(Team, Player);

#[utoipa::path(
    get,
    path = "/player/team/{teamname}/profile",
    params(("teamname" = String, Path, description = "Team name of team")),
    responses(
        (status = 200, description = "Retrieved team details by id successfully", body = TeamProfile),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No player found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve team details by teamname
pub async fn retrieve_team_by_teamname(
    state: State<Arc<AppState>>,
    Path(teamname): Path<String>,
) -> Result<Json<TeamProfile>> {
    let Some(team_profile) = db::team::retrieve_team_by_teamname(teamname, &state.db_conn).await?
    else {
        return Err(Error::NotFound("Team does not exist".to_owned()));
    };

    Ok(Json(team_profile))
}

#[utoipa::path(
    put,
    path = "/player/team/{id}/profile",
    params(("id" = Uuid, Path, description = "Id of entity")),
    operation_id = "update_team_profile",
    responses(
        (status = 200, description = "Retrieved team details by id successfully", body = TeamModel),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No player found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve team details by teamname
pub async fn update_details(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
    Json(details): Json<CreateTeamSchema>,
) -> Result<Json<TeamModel>> {
    Ok(Json(
        db::team::update(
            id,
            details,
            &state.db_conn,
            &mut state.cache_client.get().await.unwrap(),
        )
        .await?,
    ))
}

#[utoipa::path(
    get,
    path = "/player/team/summary",
    operation_id = "retrieve_team_summary",
    responses(
        (status = 200, description = "Retrieved team summary by id successfully", body = TeamSummary),
        (status = 400, description = "Invalid parameters/request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No player found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve team summary
pub async fn retrieve_summary(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
) -> Result<Json<TeamSummary>> {
    let Some(summary) = db::team::retrieve_team_summary_by_id(claims.id, &state.db_conn).await?
    else {
        return Err(Error::NotFound("Player does not exist".to_owned()));
    };

    Ok(Json(summary))
}
