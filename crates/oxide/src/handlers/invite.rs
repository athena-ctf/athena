use crate::jwt::AuthPlayer;
use crate::schemas::{
    CreateInviteSchema, Invite, InviteModel, JsonResponse, Team, TeamModel, UpdateInviteSchema,
};

oxide_macros::crud!(Invite, single: [Team], optional: [], multiple: []);

#[utoipa::path(
    post,
    path = "/player/invite/new",
    request_body = CreateInviteSchema,
    operation_id = "create_new_invite",
    responses(
        (status = 200, description = "Created new invite successfully", body = InviteModel),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Create new invite
pub async fn new(
    state: State<Arc<AppState>>,
    AuthPlayer(player_claims): AuthPlayer,
    Json(body): Json<CreateInviteSchema>,
) -> Result<Json<InviteModel>> {
    let Some(team_model) = Team::find_by_id(player_claims.team_id)
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Team not found".to_owned()));
    };

    if team_model.email != player_claims.email || body.team_id != player_claims.team_id {
        return Err(Error::Forbidden(
            "Cannot create invite for teams with no ownership".to_owned(),
        ));
    }

    let invite_model = body.into_active_model().insert(&state.db_conn).await?;

    Ok(Json(invite_model))
}

#[utoipa::path(
    delete,
    path = "/player/invite/destroy/{value}",
    params(
        ("value" = String, Path, description = "The id of invite")
    ),
    operation_id = "destroy_invite",
    responses(
        (status = 200, description = "Destroyed invite successfully", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Destroy invite
pub async fn destroy(
    state: State<Arc<AppState>>,
    AuthPlayer(player_claims): AuthPlayer,
    Path(value): Path<String>,
) -> Result<Json<JsonResponse>> {
    let Some(team_model) = Team::find_by_id(player_claims.team_id)
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Team not found".to_owned()));
    };

    let Some(invite_model) = Invite::find_by_id(Uuid::from_u128(
        base62::decode(value).map_err(|_| Error::BadRequest("Invalid invite code".to_owned()))?,
    ))
    .one(&state.db_conn)
    .await?
    else {
        return Err(Error::Forbidden(
            "Cannot destroy invite for teams with no ownership".to_owned(),
        ));
    };

    if team_model.email != player_claims.email || invite_model.team_id != player_claims.team_id {
        return Err(Error::Forbidden(
            "Cannot destroy invite for teams with no ownership".to_owned(),
        ));
    }

    invite_model.delete(&state.db_conn).await?;

    Ok(Json(JsonResponse {
        message: "successfully destroyed invite".to_owned(),
    }))
}

#[utoipa::path(
    patch,
    path = "/player/invite/update/{value}",
    params(
        ("value" = String, Path, description = "The value of invite")
    ),
    operation_id = "update_invite",
    request_body = UpdateInviteSchema,
    responses(
        (status = 200, description = "Updated invite successfully", body = InviteModel),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Update invite
pub async fn update(
    state: State<Arc<AppState>>,
    AuthPlayer(player_claims): AuthPlayer,
    Path(value): Path<String>,
    Json(body): Json<UpdateInviteSchema>,
) -> Result<Json<InviteModel>> {
    let Some(team_model) = Team::find_by_id(player_claims.team_id)
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Team not found".to_owned()));
    };

    let Some(mut invite_model) = Invite::find_by_id(Uuid::from_u128(
        base62::decode(value).map_err(|_| Error::BadRequest("Invalid invite code".to_owned()))?,
    ))
    .one(&state.db_conn)
    .await?
    else {
        return Err(Error::Forbidden(
            "Cannot destroy invite for teams with no ownership".to_owned(),
        ));
    };

    if team_model.email != player_claims.email || invite_model.team_id != player_claims.team_id {
        return Err(Error::Forbidden(
            "Cannot destroy invite for teams with no ownership".to_owned(),
        ));
    }

    if let Some(remaining) = body.remaining {
        invite_model.remaining = remaining;
    }

    if let Some(expires_at) = body.expires_at {
        invite_model.expires_at = expires_at;
    }

    let invite_model = invite_model
        .into_active_model()
        .update(&state.db_conn)
        .await?;

    Ok(Json(invite_model))
}
