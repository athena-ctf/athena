use std::fmt::Debug;
use std::time::{SystemTime, UNIX_EPOCH};

use aws_sdk_s3::Client;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::Json;
use bollard::Docker;
use jsonwebtoken::{EncodingKey, Header};
use tokio::sync::RwLock;

use crate::entity::prelude::*;
use crate::errors::{AthenaError, Result};
use crate::schemas::{ErrorModel, TokenClaimKind, TokenClaims, TokenPair, TokenType};
pub use crate::settings::Settings;

#[derive(Debug)]
pub enum ApiError {
    BadRequest(String),
    InternalError(String),
    NotFound(String),
}

impl IntoResponse for ApiError {
    fn into_response(self) -> axum::response::Response {
        tracing::error!("{:?}", self);

        match self {
            Self::BadRequest(message) => {
                (StatusCode::BAD_REQUEST, Json(ErrorModel { message })).into_response()
            }
            Self::InternalError(message) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorModel { message }),
            )
                .into_response(),
            Self::NotFound(message) => {
                (StatusCode::NOT_FOUND, Json(ErrorModel { message })).into_response()
            }
        }
    }
}

pub type ApiResult<T, E = ApiError> = Result<T, E>;

pub struct AppState {
    pub db_conn: sea_orm::DatabaseConnection,
    pub settings: RwLock<Settings>,

    pub s3_client: Option<Client>,
    pub redis_client: bb8::Pool<bb8_redis::RedisConnectionManager>,
    pub docker_client: Docker,

    #[cfg(feature = "file-transport")]
    pub mail_transport: lettre::FileTransport,

    #[cfg(not(feature = "file-transport"))]
    pub mail_transport: lettre::SmtpTransport,
}

impl From<AthenaError> for ApiError {
    fn from(value: AthenaError) -> Self {
        Self::InternalError(value.to_string())
    }
}

pub fn generate_player_token_pair(
    model: &PlayerModel,
    settings: &crate::settings::Jwt,
) -> Result<TokenPair> {
    let iat = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();

    let access_token = jsonwebtoken::encode(
        &Header::default(),
        &TokenClaims {
            id: model.id,
            token_type: TokenType::Access,
            kind: TokenClaimKind::Player,
            exp: iat + settings.access_token_timeout,
            iat,
        },
        &EncodingKey::from_base64_secret(&settings.secret)?,
    )?;

    let refresh_token = jsonwebtoken::encode(
        &Header::default(),
        &TokenClaims {
            id: model.id,
            token_type: TokenType::Refresh,
            kind: TokenClaimKind::Player,
            exp: iat + settings.refresh_token_timeout,
            iat,
        },
        &EncodingKey::from_base64_secret(&settings.secret)?,
    )?;

    Ok(TokenPair {
        access_token,
        refresh_token,
    })
}

pub fn generate_manager_token_pair(
    model: &ManagerModel,
    settings: &crate::settings::Jwt,
) -> Result<TokenPair> {
    let iat = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();

    let access_token = jsonwebtoken::encode(
        &Header::default(),
        &TokenClaims {
            id: model.id,
            token_type: TokenType::Access,
            kind: TokenClaimKind::Manager(model.role),
            exp: iat + settings.access_token_timeout,
            iat,
        },
        &EncodingKey::from_base64_secret(&settings.secret)?,
    )?;

    let refresh_token = jsonwebtoken::encode(
        &Header::default(),
        &TokenClaims {
            id: model.id,
            token_type: TokenType::Refresh,
            kind: TokenClaimKind::Manager(model.role),
            exp: iat + settings.refresh_token_timeout,
            iat,
        },
        &EncodingKey::from_base64_secret(&settings.secret)?,
    )?;

    Ok(TokenPair {
        access_token,
        refresh_token,
    })
}
