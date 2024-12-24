use std::sync::Arc;

use axum::Json;
use axum::body::Body;
use axum::extract::{Request, State};
use axum::http::StatusCode;
use axum::middleware::Next;
use axum::response::IntoResponse;
use chrono::Utc;
use fred::prelude::*;

use crate::app_state::AppState;
use crate::jwt::PlayerAccessClaims;
use crate::schemas::JsonResponse;

pub async fn middleware(
    state: State<Arc<AppState>>,
    req: Request<Body>,
    next: Next,
) -> Result<impl IntoResponse, (StatusCode, Json<JsonResponse>)> {
    let now = Utc::now();

    let time = state.settings.read().await.ctf.time.clone();

    if req.uri().path().starts_with("/player") {
        let claims = req.extensions().get::<PlayerAccessClaims>().unwrap();
        let is_banned = state
            .redis_client
            .hget::<Option<()>, _, _>("player:is_banned", claims.sub.to_string())
            .await
            .map_err(|err| {
                (
                    StatusCode::BAD_REQUEST,
                    Json(JsonResponse {
                        message: err.to_string(),
                    }),
                )
            })?;

        if is_banned.is_some() {
            return Err((
                StatusCode::FORBIDDEN,
                Json(JsonResponse {
                    message: "Player is banned".to_owned(),
                }),
            ));
        }

        if now < time.start {
            return Err((
                StatusCode::FORBIDDEN,
                Json(JsonResponse {
                    message: "CTF not started yet".to_owned(),
                }),
            ));
        } else if now > time.freeze && now < time.end {
            return Err((
                StatusCode::FORBIDDEN,
                Json(JsonResponse {
                    message: "CTF has been frozen".to_owned(),
                }),
            ));
        } else if now > time.end {
            return Err((
                StatusCode::FORBIDDEN,
                Json(JsonResponse {
                    message: "CTF not finished".to_owned(),
                }),
            ));
        }
    }

    Ok(next.run(req).await)
}
