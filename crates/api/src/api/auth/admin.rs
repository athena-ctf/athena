use std::sync::Arc;

use axum::Router;
use axum::routing::post;

use crate::AppState;
use crate::handlers::auth;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/auth/admin/token", post(auth::admin::token))
        .route("/auth/admin/token/refresh", post(auth::admin::token_refresh))
}
