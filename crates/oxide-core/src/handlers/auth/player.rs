use std::sync::Arc;

use askama::Template;
use axum::extract::State;
use axum::{Extension, Json};
use entity::prelude::*;
use jsonwebtoken::{DecodingKey, Validation};
use lettre::message::header::ContentType;
use lettre::message::{MultiPart, SinglePart};
use lettre::{Message, Transport};

use crate::db::player;
use crate::errors::{Error, Result};
use crate::schemas::{
    JsonResponse, LoginModel, PlayerDetails, RegisterPlayer, ResetPasswordSchema, SendTokenSchema,
    TokenClaims, TokenPair,
};
use crate::service::AppState;
use crate::templates::{ResetPasswordHtml, ResetPasswordPlain, VerifyEmailHtml, VerifyEmailPlain};
use crate::{db, token};

#[utoipa::path(
    post,
    path = "/auth/player/register",
    request_body = RegisterPlayer,
    responses(
        (status = 200, description = "Password reset email sent successful", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
    security(())
)]
/// Register user
pub async fn register(
    state: State<Arc<AppState>>,
    Json(body): Json<RegisterPlayer>,
) -> Result<Json<JsonResponse>> {
    if token::check(
        &body.email,
        &body.token,
        token::HashKey::Register,
        &mut state.token_client.get().await.unwrap(),
    )
    .await?
    {
        return Err(Error::BadRequest("Incorrect token".to_owned()));
    }

    let user = db::user::create(
        UserDetails {
            email: body.email,
            username: body.username,
            password: body.password,
            group: GroupEnum::Player,
        },
        &state.db_conn,
    )
    .await?;

    db::player::create(
        PlayerDetails {
            user_id: user.id,
            display_name: body.display_name,
            team_id: None,
            ban_id: None,
            discord_id: None,
            score: 0,
        },
        &state.db_conn,
    )
    .await?;

    Ok(Json(JsonResponse {
        message: "Successfully registered".to_string(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/register/send-token",
    request_body = SendTokenSchema,
    responses(
        (status = 200, description = "Token sent successful", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
    security(())
)]
/// Send verification token to email
pub async fn register_send_token(
    state: State<Arc<AppState>>,
    Json(body): Json<SendTokenSchema>,
) -> Result<Json<JsonResponse>> {
    let token = token::create();

    token::store(
        &body.email,
        &token,
        token::HashKey::Register,
        &mut state.token_client.get().await.unwrap(),
    )
    .await?;

    let email = Message::builder()
        .from(state.settings.read().await.smtp.from.clone())
        .to(body.email.parse().unwrap())
        .subject("Verification email for Athena CTF")
        .multipart(
            MultiPart::alternative()
                .singlepart(
                    SinglePart::builder().header(ContentType::TEXT_PLAIN).body(
                        VerifyEmailPlain {
                            token: token.clone(),
                        }
                        .render()
                        .unwrap(),
                    ),
                )
                .singlepart(
                    SinglePart::builder()
                        .header(ContentType::TEXT_HTML)
                        .body(VerifyEmailHtml { token }.render().unwrap()),
                ),
        )
        .unwrap();

    state.mail_transport.send(&email).unwrap();

    Ok(Json(JsonResponse {
        message: "Successfully sent mail".to_owned(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/reset-password",
    request_body = ResetPasswordSchema,
    responses(
        (status = 200, description = "Password reset email sent successful", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
    security(())
)]
/// Auth reset password
pub async fn reset_password(
    state: State<Arc<AppState>>,
    Json(body): Json<ResetPasswordSchema>,
) -> Result<Json<JsonResponse>> {
    if token::check(
        &body.email,
        &body.token,
        token::HashKey::Register,
        &mut state.token_client.get().await.unwrap(),
    )
    .await?
    {
        return Err(Error::BadRequest("Incorrect token".to_owned()));
    }

    let Some(user_model) = player::retrieve_by_email(
        body.email,
        &state.db_conn,
        &mut state.cache_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(Error::NotFound("User does not exist".to_owned()));
    };

    player::reset(user_model, body.new_password, &state.db_conn).await?;

    Ok(Json(JsonResponse {
        message: "Successfully reset password".to_owned(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/reset-password/send-token",
    request_body = SendTokenSchema,
    responses(
        (status = 200, description = "Token sent successful", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
    security(())
)]
/// Send reset token to email
pub async fn reset_password_send_token(
    state: State<Arc<AppState>>,
    Json(body): Json<SendTokenSchema>,
) -> Result<Json<JsonResponse>> {
    let token = token::create();

    token::store(
        &body.email,
        &token,
        token::HashKey::Register,
        &mut state.token_client.get().await.unwrap(),
    )
    .await?;

    let email = Message::builder()
        .from(state.settings.read().await.smtp.from.clone())
        .to(body.email.parse().unwrap())
        .subject("Verification email for Athena CTF")
        .multipart(
            MultiPart::alternative()
                .singlepart(
                    SinglePart::builder().header(ContentType::TEXT_PLAIN).body(
                        ResetPasswordPlain {
                            token: token.clone(),
                        }
                        .render()
                        .unwrap(),
                    ),
                )
                .singlepart(
                    SinglePart::builder()
                        .header(ContentType::TEXT_HTML)
                        .body(ResetPasswordHtml { token }.render().unwrap()),
                ),
        )
        .unwrap();

    state.mail_transport.send(&email).unwrap();

    Ok(Json(JsonResponse {
        message: "Successfully sent mail".to_owned(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/login",
    request_body = LoginModel,
    responses(
        (status = 200, description = "user logged in successfully", body = TokenPair),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
    security(())
)]
/// Create auth token
pub async fn login(
    state: State<Arc<AppState>>,
    Json(body): Json<LoginModel>,
) -> Result<Json<TokenPair>> {
    let Some(player_model) =
        db::player::verify(body.username, body.password, &state.db_conn).await?
    else {
        return Err(Error::BadRequest("Username invalid".to_owned()));
    };

    if player_model.ban_id.is_some() {
        return Err(Error::BadRequest("Player is banned".to_owned()));
    }

    if db::player::related_team(player_model.id, &state.db_conn)
        .await?
        .is_some_and(|(_, team_model)| {
            team_model.is_some_and(|team_model| team_model.ban_id.is_some())
        })
    {
        return Err(Error::BadRequest("Player team is banned".to_owned()));
    }

    let token_pair = crate::service::generate_player_token_pair(
        &player_model,
        &state.settings.read().await.jwt,
    )?;
    Ok(Json(token_pair))
}

#[utoipa::path(
    post,
    path = "/auth/player/token/refresh",
    request_body = TokenPair,
    responses(
        (status = 200, description = "user logged in successfully", body = TokenPair),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Refresh auth token
pub async fn refresh_token(
    state: State<Arc<AppState>>,
    Json(body): Json<TokenPair>,
) -> Result<Json<TokenPair>> {
    let claims = jsonwebtoken::decode::<TokenClaims>(
        &body.refresh_token,
        &DecodingKey::from_base64_secret(&state.settings.read().await.jwt.secret)?,
        &Validation::default(),
    )?
    .claims;

    let Some(player_model) = db::player::retrieve(
        claims.id,
        &state.db_conn,
        &mut state.cache_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(Error::NotFound("User does not exist".to_owned()));
    };

    let token_pair = crate::service::generate_player_token_pair(
        &player_model,
        &state.settings.read().await.jwt,
    )?;

    Ok(Json(token_pair))
}

#[utoipa::path(
    get,
    path = "/auth/player/me",
    responses(
        (status = 200, description = "Password reset email sent successful", body = Account),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
)]
/// Return currently authenticated user
pub async fn get_profile(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
) -> Result<Json<PlayerModel>> {
    db::player::retrieve(
        claims.id,
        &state.db_conn,
        &mut state.cache_client.get().await.unwrap(),
    )
    .await?
    .map_or_else(
        || Err(Error::NotFound("User does not exist".to_owned())),
        |user_model| Ok(Json(user_model)),
    )
}
