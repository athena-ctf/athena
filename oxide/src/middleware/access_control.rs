use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Request, State};
use axum::http::StatusCode;
use axum::middleware::Next;
use axum::response::IntoResponse;
use axum::{Extension, Json};

use crate::schemas::{ErrorModel, JsonResponse, TokenClaims};
use crate::service::AppState;

pub async fn middleware(
    Extension(_claims): Extension<TokenClaims>,
    State(_state): State<Arc<AppState>>,
    req: Request<Body>,
    next: Next,
) -> Result<impl IntoResponse, (StatusCode, Json<ErrorModel>)> {
    if req.uri().path().starts_with("/auth") && req.uri().path() != "/auth/me" {
        return Ok(next.run(req).await);
    }

    Ok((
        StatusCode::FORBIDDEN,
        Json(JsonResponse {
            message: String::new(),
        }),
    )
        .into_response())
}
