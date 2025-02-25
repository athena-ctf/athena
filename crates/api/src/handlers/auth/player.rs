use std::str::FromStr;
use std::sync::Arc;
use std::time::Duration;

use argon2::password_hash::SaltString;
use argon2::password_hash::rand_core::OsRng;
use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use askama::Template;
use axum::Json;
use axum::extract::{Query, State};
use axum::http::StatusCode;
use axum_extra::extract::CookieJar;
use axum_extra::extract::cookie::Cookie;
use fred::prelude::*;
use jsonwebtoken::{DecodingKey, Validation};
use lettre::message::header::ContentType;
use lettre::message::{Mailbox, MultiPart, SinglePart};
use lettre::{AsyncTransport, Message};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, Condition, IntoActiveModel, TransactionTrait};

use crate::errors::{Error, Result};
use crate::jwt::{RefreshClaims, TokenPair};
use crate::redis_keys::{PLAYER_LAST_UPDATED, REFRESH_TOKEN_BLACKLIST};
use crate::schemas::{
    Invite, InviteVerificationResult, JsonResponse, LoginRequest, LoginResponse, Player, PlayerModel, RegisterPlayer,
    RegisterVerifyEmailQuery, RegisterVerifyInviteQuery, ResetPasswordSchema, SendTokenSchema, Team, TeamModel,
    TeamRegister,
};
use crate::templates::{ResetPasswordHtml, ResetPasswordPlain, VerifyEmailHtml, VerifyEmailPlain};
use crate::{ApiResponse, AppState};

#[utoipa::path(
    get,
    path = "/auth/player/register/verify/email",
    params(
        ("email" = String, Query)
    ),
    operation_id = "player_register_verify_email",
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
    security(())
)]
pub async fn register_verify_email(
    state: State<Arc<AppState>>,
    Query(query): Query<RegisterVerifyEmailQuery>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    if Player::find()
        .filter(Condition::any().add(entity::player::Column::Email.eq(query.email)))
        .one(&state.db_conn)
        .await?
        .is_some()
    {
        return Err(Error::BadRequest(
            "Player with username or email already exists".to_owned(),
        ));
    }

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Player exists".to_owned(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/register",
    request_body = RegisterPlayer,
    operation_id = "player_register",
    responses(
        (status = 201, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
    security(())
)]
pub async fn register(
    state: State<Arc<AppState>>,
    Json(body): Json<RegisterPlayer>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    let txn = state.db_conn.begin().await?;

    let verified = state.token_manager.verify("register", &body.email, &body.token).await?;

    if verified.is_invalid() {
        return Err(Error::BadRequest("Incorrect token".to_owned()));
    } else if verified.is_retries_exceeded() {
        return Err(Error::BadRequest("Too many retries".to_owned()));
    }

    let salt = SaltString::generate(&mut OsRng);
    let password = Argon2::default()
        .hash_password(body.password.as_bytes(), &salt)?
        .to_string();

    let team_id = match body.team {
        TeamRegister::Join { team_id, invite_id } => {
            Invite::update_many()
                .col_expr(
                    entity::invite::Column::Remaining,
                    Expr::col(entity::invite::Column::Remaining).sub(1),
                )
                .filter(entity::invite::Column::Id.eq(Uuid::from_u128(
                    base62::decode(invite_id).map_err(|_| Error::BadRequest("Invalid invite code".to_owned()))?,
                ))) // Remove update many
                .exec(&txn)
                .await?;

            team_id
        }

        TeamRegister::Create { team_name } => {
            let team_model = TeamModel::new(&body.email, team_name)
                .into_active_model()
                .insert(&txn)
                .await?;

            team_model.id
        }
    };

    let player_model = PlayerModel::new(
        team_id,
        None,
        None,
        body.username,
        body.email,
        body.avatar_url,
        password,
    )
    .into_active_model()
    .insert(&txn)
    .await?;

    txn.commit().await?;

    state.leaderboard_manager.init_player(player_model.id).await?;

    state.leaderboard_manager.init_player(team_id).await?;

    Ok(ApiResponse::json_created(JsonResponse {
        message: "Successfully registered".to_string(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/register/send-token",
    request_body = SendTokenSchema,
    operation_id = "player_register_send_token",
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
    security(())
)]
pub async fn register_send_token(
    state: State<Arc<AppState>>,
    Json(body): Json<SendTokenSchema>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    let token = state.token_manager.generate("register", &body.email).await?;

    let email = Message::builder()
        .from(Mailbox::from_str(&state.settings.read().await.smtp.from).unwrap())
        .to(body.email.parse().unwrap())
        .subject("Verification email for Athena CTF")
        .multipart(
            MultiPart::alternative()
                .singlepart(
                    SinglePart::builder()
                        .header(ContentType::TEXT_PLAIN)
                        .body(VerifyEmailPlain { token: token.clone() }.render().unwrap()),
                )
                .singlepart(
                    SinglePart::builder()
                        .header(ContentType::TEXT_HTML)
                        .body(VerifyEmailHtml { token }.render().unwrap()),
                ),
        )
        .unwrap();

    tokio::spawn(async move {
        if let Err(err) = state.mail_transport.send(email).await {
            tracing::error!("{err:?}");
        }
    });

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully sent mail".to_owned(),
    }))
}

#[utoipa::path(
    get,
    path = "/auth/player/register/verify/invite",
    params(
        ("team_name" = String, Query),
        ("invite_code" = String, Query)
    ),
    operation_id = "player_register_verify_invite",
    responses(
        (status = 200, body = InviteVerificationResult),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn register_verify_invite(
    state: State<Arc<AppState>>,
    Query(body): Query<RegisterVerifyInviteQuery>,
) -> Result<ApiResponse<Json<InviteVerificationResult>>> {
    let Some(team_model) = Team::find()
        .filter(entity::team::Column::Name.eq(body.team_name))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Team not found".to_owned()));
    };

    let invite_id = Uuid::from_u128(
        base62::decode(body.invite_code).map_err(|_| Error::BadRequest("Invalid invite code".to_owned()))?,
    );

    let Some(invite_model) = team_model
        .find_related(Invite)
        .filter(entity::invite::Column::Id.eq(invite_id))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("invalid invite code".to_owned()));
    };

    if invite_model.remaining == 0 {
        return Err(Error::BadRequest("invite used up".to_owned()));
    }

    Ok(ApiResponse::json_ok(InviteVerificationResult {
        team_id: team_model.id,
        invite_id,
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/reset-password",
    request_body = ResetPasswordSchema,
    operation_id = "player_reset_password",
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
    security(())
)]
pub async fn reset_password(
    state: State<Arc<AppState>>,
    Json(body): Json<ResetPasswordSchema>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    let verified = state.token_manager.verify("reset", &body.email, &body.token).await?;

    if verified.is_invalid() {
        return Err(Error::BadRequest("Incorrect token".to_owned()));
    } else if verified.is_retries_exceeded() {
        return Err(Error::BadRequest("Too many retries".to_owned()));
    }

    let txn = state.db_conn.begin().await?;

    let Some(player_model) = Player::find()
        .filter(entity::player::Column::Email.eq(&body.email))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Player does not exist".to_owned()));
    };

    let mut active_player = player_model.into_active_model();
    let salt = SaltString::generate(&mut OsRng);

    active_player.password = ActiveValue::Set(
        Argon2::default()
            .hash_password(body.new_password.as_bytes(), &salt)?
            .to_string(),
    );

    let player_model = active_player.update(&txn).await?;

    txn.commit().await?;

    state
        .redis_client
        .hset::<(), _, _>(
            PLAYER_LAST_UPDATED,
            (player_model.id.to_string(), player_model.updated_at.timestamp()),
        )
        .await?;

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully reset password".to_owned(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/reset-password/send-token",
    request_body = SendTokenSchema,
    operation_id = "player_reset_password_send_token",
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
    security(())
)]
pub async fn reset_password_send_token(
    state: State<Arc<AppState>>,
    Json(body): Json<SendTokenSchema>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    let token = state.token_manager.generate("reset", &body.email).await?;

    let email = Message::builder()
        .from(Mailbox::from_str(&state.settings.read().await.smtp.from).unwrap())
        .to(body.email.parse().unwrap())
        .subject("Reset email for Athena CTF")
        .multipart(
            MultiPart::alternative()
                .singlepart(
                    SinglePart::builder()
                        .header(ContentType::TEXT_PLAIN)
                        .body(ResetPasswordPlain { token: token.clone() }.render().unwrap()),
                )
                .singlepart(
                    SinglePart::builder()
                        .header(ContentType::TEXT_HTML)
                        .body(ResetPasswordHtml { token }.render().unwrap()),
                ),
        )
        .unwrap();

    tokio::spawn(async move {
        if let Err(err) = state.mail_transport.send(email).await {
            tracing::error!("{err:?}");
        }
    });

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully sent mail".to_owned(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/token",
    request_body = LoginRequest,
    operation_id = "player_token",
    responses(
        (status = 200, body = LoginResponse<PlayerModel>),
        (status = 400, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
    security(())
)]
pub async fn token(
    state: State<Arc<AppState>>,
    jar: CookieJar,
    Json(body): Json<LoginRequest>,
) -> Result<ApiResponse<(CookieJar, Json<LoginResponse<PlayerModel>>)>> {
    let Some(player_model) = Player::find()
        .filter(entity::admin::Column::Username.eq(&body.username))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("No player with username exists".to_owned()));
    };

    if Argon2::default()
        .verify_password(body.password.as_bytes(), &PasswordHash::new(&player_model.password)?)
        .is_err()
    {
        return Err(Error::BadRequest("Invalid password".to_owned()));
    }

    if player_model.ban_id.is_some() {
        return Err(Error::BadRequest("Player is banned".to_owned()));
    }

    let TokenPair(access_token, refresh_token) = TokenPair::new_player(
        &state.settings.read().await.jwt,
        player_model.id,
        player_model.team_id,
        player_model.email.clone(),
    )?;

    let cookie = Cookie::build(("refresh_token", refresh_token))
        .secure(true)
        .http_only(true)
        .max_age(
            Duration::from_secs(state.settings.read().await.jwt.refresh_expiry_duration)
                .try_into()
                .unwrap(),
        );

    Ok(ApiResponse(
        StatusCode::OK,
        (
            jar.add(cookie),
            Json(LoginResponse {
                model: player_model,
                access_token,
            }),
        ),
    ))
}

#[utoipa::path(
    post,
    path = "/auth/player/token/refresh",
    operation_id = "player_token_refresh",
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
    security(())
)]
pub async fn token_refresh(
    state: State<Arc<AppState>>,
    jar: CookieJar,
) -> Result<ApiResponse<(CookieJar, Json<JsonResponse>)>> {
    let Some(refresh_token) = jar.get("refresh_token") else {
        return Err(Error::Unauthorized(None, "No refresh token found".to_owned()));
    };

    let refresh_claims = jsonwebtoken::decode::<RefreshClaims>(
        refresh_token.value(),
        &DecodingKey::from_base64_secret(&state.settings.read().await.jwt.secret)?,
        &Validation::new(jsonwebtoken::Algorithm::HS256),
    )?
    .claims;

    let is_blacklisted = state
        .redis_client
        .hexists::<u8, _, _>(REFRESH_TOKEN_BLACKLIST, refresh_claims.jti.to_string())
        .await?;

    if is_blacklisted == 0 {
        return Err(Error::Unauthorized(
            Some(jar.remove("refresh_token")),
            "Blacklisted refresh_token used".to_owned(),
        ));
    }

    state
        .redis_client
        .hset::<(), _, _>(REFRESH_TOKEN_BLACKLIST, (refresh_claims.jti.to_string(), 0))
        .await?;

    state
        .redis_client
        .hexpire::<(), _, _>(
            REFRESH_TOKEN_BLACKLIST,
            state
                .settings
                .read()
                .await
                .jwt
                .refresh_expiry_duration
                .try_into()
                .unwrap(),
            None,
            refresh_claims.jti.to_string(),
        )
        .await?;

    let Some(player_model) = Player::find_by_id(refresh_claims.sub).one(&state.db_conn).await? else {
        return Err(Error::Unauthorized(
            Some(jar.remove("refresh_token")),
            "Invalid refresh_token".to_owned(),
        ));
    };

    let TokenPair(access_token, refresh_token) = TokenPair::new_player(
        &state.settings.read().await.jwt,
        player_model.id,
        player_model.team_id,
        player_model.email,
    )?;

    let cookie = Cookie::build(("refresh_token", refresh_token))
        .secure(true)
        .http_only(true)
        .max_age(
            Duration::from_secs(state.settings.read().await.jwt.refresh_expiry_duration)
                .try_into()
                .unwrap(),
        );

    Ok(ApiResponse(
        StatusCode::OK,
        (jar.add(cookie), Json(JsonResponse { message: access_token })),
    ))
}
