use std::sync::Arc;

use axum::routing::{get, post};
use axum::Router;

use crate::handlers::auth;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/auth/admin/login", post(auth::admin::login))
        .route(
            "/auth/admin/token/refresh",
            post(auth::admin::refresh_token),
        )
        .route("/auth/admin/profile", get(auth::admin::get_profile))
}
