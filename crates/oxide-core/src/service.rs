use std::time::{SystemTime, UNIX_EPOCH};

use axum::response::IntoResponse;
use axum::Json;
use bollard::Docker;
pub use config::Settings;
use entity::prelude::*;
use fred::prelude::*;
use jsonwebtoken::{EncodingKey, Header};
use serde::Serialize;
use tokio::sync::RwLock;

use crate::errors::Result;
use crate::schemas::{TokenClaimKind, TokenClaims, TokenPair, TokenType};

pub struct AppState {
    pub db_conn: sea_orm::DatabaseConnection,
    pub settings: RwLock<Settings>,

    pub cache_client: RedisPool,
    pub persistent_client: RedisPool,
    pub docker_client: Docker,

    #[cfg(feature = "file-transport")]
    pub mail_transport: lettre::FileTransport,

    #[cfg(not(feature = "file-transport"))]
    pub mail_transport: lettre::SmtpTransport,
}

fn generate_token_pair<F>(token_claims_fn: F, settings: &config::Jwt) -> Result<TokenPair>
where
    F: Fn(TokenType, u64, u64) -> TokenClaims,
{
    let iat = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();

    let access_token = jsonwebtoken::encode(
        &Header::default(),
        &token_claims_fn(TokenType::Access, iat, iat + settings.access_token_timeout),
        &EncodingKey::from_base64_secret(&settings.secret)?,
    )?;

    let refresh_token = jsonwebtoken::encode(
        &Header::default(),
        &token_claims_fn(
            TokenType::Refresh,
            iat,
            iat + settings.refresh_token_timeout,
        ),
        &EncodingKey::from_base64_secret(&settings.secret)?,
    )?;

    Ok(TokenPair {
        access_token,
        refresh_token,
    })
}

pub fn generate_player_token_pair(
    model: &PlayerModel,
    settings: &config::Jwt,
) -> Result<TokenPair> {
    generate_token_pair(
        |token_type, iat, exp| TokenClaims {
            id: model.id,
            token_type,
            kind: TokenClaimKind::Player,
            exp,
            iat,
        },
        settings,
    )
}

pub fn generate_admin_token_pair(model: &AdminModel, settings: &config::Jwt) -> Result<TokenPair> {
    generate_token_pair(
        |token_type, iat, exp| TokenClaims {
            id: model.id,
            token_type,
            kind: TokenClaimKind::Admin(model.role),
            exp,
            iat,
        },
        settings,
    )
}

pub enum CachedJson<T> {
    Cached(String),
    New(Json<T>),
}

impl<T: Serialize> IntoResponse for CachedJson<T> {
    fn into_response(self) -> axum::response::Response {
        match self {
            Self::Cached(value) => value.into_response(),
            Self::New(value) => value.into_response(),
        }
    }
}
