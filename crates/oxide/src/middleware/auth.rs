use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Request, State};
use axum::middleware::Next;
use axum::response::IntoResponse;
use axum_extra::TypedHeader;
use axum_extra::extract::CookieJar;
use axum_extra::headers::Authorization;
use axum_extra::headers::authorization::Bearer;
use fred::prelude::*;
use jsonwebtoken::{DecodingKey, Validation};

use crate::errors::{Error, Result};
use crate::jwt::{AdminAccessClaims, PlayerAccessClaims, RefreshClaims};
use crate::permissions::has_permission;
use crate::redis_keys::{ADMIN_LAST_UPDATED, PLAYER_LAST_UPDATED};
use crate::service::AppState;

// TODO: check for invalid jwt in all the errors and return instead of simply returning

pub async fn middleware(
    state: State<Arc<AppState>>,
    header: TypedHeader<Authorization<Bearer>>,
    jar: CookieJar,
    mut req: Request<Body>,
    next: Next,
) -> Result<impl IntoResponse> {
    let path = req.uri().path();

    if path.starts_with("/auth") {
        return Ok(next.run(req).await);
    }

    let Some(refresh_token) = jar.get("refresh_token") else {
        return Err(Error::Unauthorized(None, "No refresh token".to_owned()));
    };
    let refresh_claims = jsonwebtoken::decode::<RefreshClaims>(
        refresh_token.value(),
        &DecodingKey::from_base64_secret(&state.settings.read().await.jwt.secret)?,
        &Validation::new(jsonwebtoken::Algorithm::HS256),
    )?
    .claims;

    if path.starts_with("/admin") {
        let claims = jsonwebtoken::decode::<AdminAccessClaims>(
            header.token(),
            &DecodingKey::from_base64_secret(&state.settings.read().await.jwt.secret)?,
            &Validation::new(jsonwebtoken::Algorithm::HS256),
        )
        .map_err(|err| Error::Unauthorized(None, err.to_string()))?
        .claims;

        let timestamp = state
            .redis_client
            .hget::<u64, _, _>(ADMIN_LAST_UPDATED, claims.sub.to_string())
            .await?;

        if claims.iat < timestamp || refresh_claims.iat < timestamp {
            return Err(Error::Unauthorized(
                Some(jar.remove("refresh_token")),
                "Player updated".to_owned(),
            ));
        }

        if has_permission(req.method(), &path[7..], claims.role) {
            req.extensions_mut().insert(claims);
            return Ok(next.run(req).await);
        }

        return Err(Error::Forbidden(
            "Cannot access specified resource".to_owned(),
        ));
    }

    if path.starts_with("/player") {
        let claims = jsonwebtoken::decode::<PlayerAccessClaims>(
            header.token(),
            &DecodingKey::from_base64_secret(&state.settings.read().await.jwt.secret)?,
            &Validation::new(jsonwebtoken::Algorithm::HS256),
        )
        .map_err(|err| Error::Unauthorized(None, err.to_string()))?
        .claims;

        let timestamp = state
            .redis_client
            .hget::<u64, _, _>(PLAYER_LAST_UPDATED, claims.sub.to_string())
            .await?;

        if claims.iat < timestamp || refresh_claims.iat < timestamp {
            return Err(Error::Unauthorized(
                Some(jar.remove("refresh_token")),
                "Player updated".to_owned(),
            ));
        }

        req.extensions_mut().insert(claims);
        return Ok(next.run(req).await);
    }

    Err(Error::NotFound(
        "The requested url does not exist.".to_owned(),
    ))
}
