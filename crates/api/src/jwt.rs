use axum::extract::FromRequestParts;
use axum::http::request::Parts;
use jsonwebtoken::{EncodingKey, Header};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use uuid::Uuid;

use crate::errors::{Error, Result};

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct AdminAccessClaims {
    pub exp: u64,
    pub iat: u64,
    pub sub: Uuid,
    pub jti: Uuid,
    pub role: String,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct PlayerAccessClaims {
    pub exp: u64,
    pub iat: u64,
    pub sub: Uuid,
    pub jti: Uuid,
    pub team_id: Uuid,
    pub email: String,
}

#[derive(Serialize, Debug, Deserialize, Clone, Copy, ToSchema)]
pub struct RefreshClaims {
    pub exp: u64,
    pub iat: u64,
    pub sub: Uuid,
    pub jti: Uuid,
}

pub struct TokenPair(pub String, pub String);

impl TokenPair {
    pub fn new_admin(conf: &config::Jwt, sub: Uuid, role: String) -> Result<Self> {
        let exp = jsonwebtoken::get_current_timestamp();
        let access_token = jsonwebtoken::encode(
            &Header::new(jsonwebtoken::Algorithm::HS256),
            &AdminAccessClaims {
                exp,
                iat: exp + conf.access_expiry_duration,
                jti: Uuid::new_v4(),
                sub,
                role,
            },
            &EncodingKey::from_base64_secret(&conf.secret)?,
        )?;

        let refresh_token = jsonwebtoken::encode(
            &Header::new(jsonwebtoken::Algorithm::HS256),
            &RefreshClaims {
                exp,
                iat: exp + conf.refresh_expiry_duration,
                jti: Uuid::new_v4(),
                sub,
            },
            &EncodingKey::from_base64_secret(&conf.secret)?,
        )?;

        Ok(Self(access_token, refresh_token))
    }

    pub fn new_player(conf: &config::Jwt, sub: Uuid, team_id: Uuid, email: String) -> Result<Self> {
        let exp = jsonwebtoken::get_current_timestamp();
        let access_token = jsonwebtoken::encode(
            &Header::new(jsonwebtoken::Algorithm::HS256),
            &PlayerAccessClaims {
                exp,
                iat: exp + conf.access_expiry_duration,
                jti: Uuid::new_v4(),
                sub,
                team_id,
                email,
            },
            &EncodingKey::from_base64_secret(&conf.secret)?,
        )?;

        let refresh_token = jsonwebtoken::encode(
            &Header::new(jsonwebtoken::Algorithm::HS256),
            &RefreshClaims {
                exp,
                iat: exp + conf.refresh_expiry_duration,
                jti: Uuid::new_v4(),
                sub,
            },
            &EncodingKey::from_base64_secret(&conf.secret)?,
        )?;

        Ok(Self(access_token, refresh_token))
    }
}

pub struct AuthAdmin(pub AdminAccessClaims);

pub struct AuthPlayer(pub PlayerAccessClaims);

impl<S> FromRequestParts<S> for AuthAdmin
where
    S: Send + Sync,
{
    type Rejection = Error;

    async fn from_request_parts(req: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        let Some(claims) = req.extensions.get::<AdminAccessClaims>() else {
            return Err(Error::Unauthorized(None, "'access_token' not found".to_owned()));
        };

        Ok(Self(claims.clone()))
    }
}

impl<S> FromRequestParts<S> for AuthPlayer
where
    S: Send + Sync,
{
    type Rejection = Error;

    async fn from_request_parts(req: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        let Some(claims) = req.extensions.get::<PlayerAccessClaims>() else {
            return Err(Error::Unauthorized(None, "'access_token' not found".to_owned()));
        };

        Ok(Self(claims.clone()))
    }
}
