use std::sync::Arc;

use axum::Router;
use axum::routing::{get, post};

use crate::AppState;
use crate::handlers::auth;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/auth/player/reset-password", post(auth::player::reset_password))
        .route(
            "/auth/player/reset-password/send-token",
            post(auth::player::reset_password_send_token),
        )
        .route("/auth/player/token", post(auth::player::token))
        .route("/auth/player/token/refresh", post(auth::player::token_refresh))
        .route("/auth/player/register", post(auth::player::register))
        .route(
            "/auth/player/register/verify/invite",
            get(auth::player::register_verify_invite),
        )
        .route(
            "/auth/player/register/verify/email",
            get(auth::player::register_verify_email),
        )
        .route(
            "/auth/player/register/send-token",
            post(auth::player::register_send_token),
        )
}
