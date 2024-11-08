use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Request, State};
use axum::http::StatusCode;
use axum::middleware::Next;
use axum::response::IntoResponse;
use axum::Json;
use chrono::Utc;

use crate::schemas::JsonResponse;
use crate::service::AppState;

pub async fn middleware(
    state: State<Arc<AppState>>,
    req: Request<Body>,
    next: Next,
) -> Result<impl IntoResponse, (StatusCode, Json<JsonResponse>)> {
    let now = Utc::now();

    let time = state.settings.read().await.ctf.time.clone();

    if req.uri().path().starts_with("/player") {
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
