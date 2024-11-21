use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Request, State};
use axum::http::StatusCode;
use axum::middleware::Next;
use axum::response::IntoResponse;
use axum::Json;
use axum_extra::headers::authorization::Bearer;
use axum_extra::headers::Authorization;
use axum_extra::TypedHeader;
use fred::prelude::*;
use jsonwebtoken::{DecodingKey, Validation};

use crate::permissions::has_permission;
use crate::schemas::{AdminClaims, JsonResponse, PlayerClaims};
use crate::service::AppState;

pub async fn middleware(
    state: State<Arc<AppState>>,
    header: TypedHeader<Authorization<Bearer>>,
    mut req: Request<Body>,
    next: Next,
) -> Result<impl IntoResponse, (StatusCode, Json<JsonResponse>)> {
    let path = req.uri().path();

    if path.starts_with("/auth") {
        return Ok(next.run(req).await);
    }

    if path.starts_with("/admin") {
        let claims = jsonwebtoken::decode::<AdminClaims>(
            header.token(),
            &DecodingKey::from_base64_secret(&state.settings.read().await.jwt.secret).map_err(
                |err| {
                    (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        Json(JsonResponse {
                            message: err.to_string(),
                        }),
                    )
                },
            )?,
            &Validation::new(jsonwebtoken::Algorithm::HS256),
        )
        .map_err(|err| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(JsonResponse {
                    message: err.to_string(),
                }),
            )
        })?
        .claims;

        if has_permission(req.method(), &path[7..], claims.role) {
            req.extensions_mut().insert(claims);
            return Ok(next.run(req).await);
        }

        return Err((
            StatusCode::FORBIDDEN,
            Json(JsonResponse {
                message: "Cannot access specified resource".to_owned(),
            }),
        ));
    }

    if path.starts_with("/player") {
        let claims = jsonwebtoken::decode::<PlayerClaims>(
            header.token(),
            &DecodingKey::from_base64_secret(&state.settings.read().await.jwt.secret).map_err(
                |err| {
                    (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        Json(JsonResponse {
                            message: err.to_string(),
                        }),
                    )
                },
            )?,
            &Validation::new(jsonwebtoken::Algorithm::HS256),
        )
        .map_err(|err| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(JsonResponse {
                    message: err.to_string(),
                }),
            )
        })?
        .claims;

        let is_banned = state
            .persistent_client
            .hget::<Option<()>, _, _>("player:is_banned", claims.sub.simple().to_string())
            .await
            .map_err(|err| {
                (
                    StatusCode::BAD_REQUEST,
                    Json(JsonResponse {
                        message: err.to_string(),
                    }),
                )
            })?;

        return if is_banned.is_some() {
            Err((
                StatusCode::FORBIDDEN,
                Json(JsonResponse {
                    message: "Player banned".to_owned(),
                }),
            ))
        } else {
            req.extensions_mut().insert(claims);
            Ok(next.run(req).await)
        };
    }

    Err((
        StatusCode::NOT_FOUND,
        Json(JsonResponse {
            message: "The requested url does not exist.".to_owned(),
        }),
    ))
}
