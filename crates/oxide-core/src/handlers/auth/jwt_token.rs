use std::sync::Arc;

use axum::extract::State;
use axum::{Extension, Json};
use jsonwebtoken::{DecodingKey, Validation};

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{LoginModel, Source, TokenClaims, TokenPair};
use crate::service::AppState;

#[utoipa::path(
    post,
    path = "/auth/token",
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
pub async fn create(
    Extension(source): Extension<Source>,
    state: State<Arc<AppState>>,
    Json(body): Json<LoginModel>,
) -> Result<Json<TokenPair>> {
    let settings = state.settings.read().await;

    let token_pair = match source {
        Source::Codex => {
            let Some(player_model) =
                db::player::verify(body.username, body.password, &state.db_conn).await?
            else {
                return Err(Error::BadRequest("Username invalid".to_owned()));
            };

            if !player_model.verified {
                return Err(Error::BadRequest("Player is not verified.".to_owned()));
            }

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

            crate::service::generate_player_token_pair(&player_model, &settings.jwt)?
        }

        Source::Admin => {
            let Some(manager_model) =
                db::manager::verify(body.username, body.password, &state.db_conn).await?
            else {
                return Err(Error::BadRequest(
                    "Username or Password incorrect".to_owned(),
                ));
            };

            crate::service::generate_manager_token_pair(&manager_model, &settings.jwt)?
        }
    };

    Ok(Json(token_pair))
}

#[utoipa::path(
    post,
    path = "/auth/token/refresh",
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
pub async fn refresh(
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
