use std::sync::Arc;

use axum::routing::{get, post};
use axum::Router;

use crate::handlers::auth::{self};
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/auth/reset-password", post(auth::reset_password::action))
        .route(
            "/auth/reset-password/send-token",
            post(auth::reset_password::send_token),
        )
        .route("/auth/token", post(auth::token::create))
        .route("/auth/token/refresh", post(auth::token::refresh))
        .route("/auth/register", post(auth::register::action))
        .route(
            "/auth/register/send-token",
            post(auth::register::send_token),
        )
        .route("/auth/me", get(auth::get_me))
}
