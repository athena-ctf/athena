use std::sync::Arc;

use axum::Router;
use axum::routing::post;

use crate::handlers::auth;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/auth/admin/token", post(auth::admin::token))
        .route(
            "/auth/admin/token/refresh",
            post(auth::admin::token_refresh),
        )
}
