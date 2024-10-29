use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Request, State};
use axum::http::StatusCode;
use axum::middleware::Next;
use axum::response::IntoResponse;
use axum::Json;

use crate::schemas::JsonResponse;
use crate::service::AppState;

pub async fn middleware(
    _state: State<Arc<AppState>>,
    req: Request<Body>,
    next: Next,
) -> Result<impl IntoResponse, (StatusCode, Json<JsonResponse>)> {
    Ok(next.run(req).await)
}
