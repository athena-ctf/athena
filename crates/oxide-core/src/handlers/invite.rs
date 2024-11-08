use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::routing::get;
use axum::Router;
use fred::prelude::*;
use oxide_macros::table_api;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{
    CreateInviteSchema, Invite, InviteModel, InviteVerificationResult, JsonResponse, Team,
    TeamModel, VerifyInviteSchema,
};
use crate::service::{AppState, CachedJson};

table_api!(Invite, single: [Team], optional: [], multiple: []);

#[utoipa::path(
    post,
    path = "/player/invite/verify",
    request_body = VerifyInviteSchema,
    operation_id = "verify_invite",
    responses(
        (status = 200, description = "Verified invite successfully", body = InviteVerificationResult),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Verify invite
pub async fn verify(
    state: State<Arc<AppState>>,
    Json(body): Json<VerifyInviteSchema>,
) -> Result<Json<InviteVerificationResult>> {
    let Some(team_model) = Team::find()
        .filter(entity::team::Column::Name.eq(body.team_name))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Team not found".to_owned()));
    };

    let Some(invite_model) = team_model
        .find_related(Invite)
        .filter(entity::invite::Column::Id.eq(body.invite_id))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("invalid invite code".to_owned()));
    };

    if invite_model.remaining == 0 {
        return Err(Error::BadRequest("invite used up".to_owned()));
    }

    Ok(Json(InviteVerificationResult {
        team_id: team_model.id,
    }))
}
