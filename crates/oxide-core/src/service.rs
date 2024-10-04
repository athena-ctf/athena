use std::time::{SystemTime, UNIX_EPOCH};

use aws_sdk_s3::Client;
use bollard::Docker;
use entity::prelude::*;
use jsonwebtoken::{EncodingKey, Header};
use tokio::sync::RwLock;

use crate::errors::Result;
use crate::schemas::{TokenClaimKind, TokenClaims, TokenPair, TokenType};
pub use crate::settings::Settings;

pub struct AppState {
    pub db_conn: sea_orm::DatabaseConnection,
    pub settings: RwLock<Settings>,

    pub s3_client: Option<Client>,
    pub cache_client: bb8::Pool<bb8_redis::RedisConnectionManager>,
    pub token_client: bb8::Pool<bb8_redis::RedisConnectionManager>,
    pub docker_client: Docker,

    #[cfg(feature = "file-transport")]
    pub mail_transport: lettre::FileTransport,

    #[cfg(not(feature = "file-transport"))]
    pub mail_transport: lettre::SmtpTransport,
}

fn generate_token_pair<F>(token_claims_fn: F, settings: &crate::settings::Jwt) -> Result<TokenPair>
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
    settings: &crate::settings::Jwt,
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

pub fn generate_admin_token_pair(
    model: &AdminModel,
    settings: &crate::settings::Jwt,
) -> Result<TokenPair> {
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
