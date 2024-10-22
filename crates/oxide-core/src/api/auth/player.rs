use std::sync::Arc;

use axum::routing::{get, post};
use axum::Router;

use crate::handlers::auth;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/auth/player/reset-password",
            post(auth::player::reset_password),
        )
        .route(
            "/auth/player/reset-password/send-token",
            post(auth::player::reset_password_send_token),
        )
        .route("/auth/player/login", post(auth::player::login))
        .route(
            "/auth/player/token/refresh",
            post(auth::player::refresh_token),
        )
        .route("/auth/player/register", post(auth::player::register))
        .route(
            "/auth/player/register/send-token",
            post(auth::player::register_send_token),
        )
        .route("/auth/player/profile", get(auth::player::get_profile))
}
