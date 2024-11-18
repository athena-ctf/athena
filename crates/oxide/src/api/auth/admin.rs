use std::sync::Arc;

use axum::routing::{get, post};
use axum::Router;

use crate::handlers::auth;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/auth/admin/login", post(auth::admin::login))
        .route("/auth/admin/logout", get(auth::admin::logout))
}
