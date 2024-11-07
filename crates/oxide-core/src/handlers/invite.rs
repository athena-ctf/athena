use std::sync::Arc;

use axum::extract::{Json, Path, State};
use fred::prelude::*;
use oxide_macros::{crud_interface_api, single_relation_api};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{
    CreateInviteSchema, Invite, InviteModel, InviteVerificationResult, JsonResponse, Team,
    TeamModel, VerifyInviteSchema,
};
use crate::service::{AppState, CachedJson};

crud_interface_api!(Invite);

single_relation_api!(Invite, Team);

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
    db::invite::verify(body.invite_id, body.team_name, &state.db_conn)
        .await
        .map(Json)
}
