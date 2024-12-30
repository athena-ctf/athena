use crate::jwt::AuthPlayer;
use crate::schemas::UpdateInviteSchema;

api_macros::crud!(Invite, single: [Team], optional: [], multiple: []);

#[utoipa::path(
    post,
    path = "/player/invite/new",
    request_body = CreateInviteSchema,
    operation_id = "create_new_invite",
    responses(
        (status = 200, body = InviteModel),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn new(
    state: State<Arc<AppState>>,
    AuthPlayer(player_claims): AuthPlayer,
    Json(body): Json<CreateInviteSchema>,
) -> Result<ApiResponse<Json<InviteModel>>> {
    let Some(team_model) = Team::find_by_id(player_claims.team_id).one(&state.db_conn).await? else {
        return Err(Error::NotFound("Team not found".to_owned()));
    };

    if team_model.email != player_claims.email || body.team_id != player_claims.team_id {
        return Err(Error::Forbidden(
            "Cannot create invite for teams with no ownership".to_owned(),
        ));
    }

    let invite_model = body.into_active_model().insert(&state.db_conn).await?;

    Ok(ApiResponse::json_ok(invite_model))
}

#[utoipa::path(
    delete,
    path = "/player/invite/destroy/{value}",
    params(
        ("value" = String, Path)
    ),
    operation_id = "destroy_invite",
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn destroy(
    state: State<Arc<AppState>>,
    AuthPlayer(player_claims): AuthPlayer,
    Path(value): Path<String>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    let Some(team_model) = Team::find_by_id(player_claims.team_id).one(&state.db_conn).await? else {
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

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "successfully destroyed invite".to_owned(),
    }))
}

#[utoipa::path(
    patch,
    path = "/player/invite/update/{value}",
    params(
        ("value" = String, Path)
    ),
    operation_id = "update_invite",
    request_body = UpdateInviteSchema,
    responses(
        (status = 200, body = InviteModel),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn update(
    state: State<Arc<AppState>>,
    AuthPlayer(player_claims): AuthPlayer,
    Path(value): Path<String>,
    Json(body): Json<UpdateInviteSchema>,
) -> Result<ApiResponse<Json<InviteModel>>> {
    let Some(team_model) = Team::find_by_id(player_claims.team_id).one(&state.db_conn).await? else {
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

    let invite_model = invite_model.into_active_model().update(&state.db_conn).await?;

    Ok(ApiResponse::json_ok(invite_model))
}
