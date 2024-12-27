use std::sync::Arc;
use std::time::Duration;

use axum::Router;
use axum::extract::{DefaultBodyLimit, MatchedPath, Request};
use axum::http::Method;
use tower_http::cors::{Any, CorsLayer};
use tower_http::timeout::TimeoutLayer;
use tower_http::trace::TraceLayer;
use tracing::info_span;
use utoipa::OpenApi;

use crate::errors::Result;
use crate::{AppState, middleware};

mod admin_routes;
mod auth;
mod doc;
mod player_routes;

pub fn router(state: Arc<AppState>) -> axum::Router {
    Router::new()
        .merge(auth::router())
        .merge(admin_routes::router())
        .merge(player_routes::router())
        .layer(axum::middleware::from_fn_with_state(
            state.clone(),
            middleware::ctf,
        ))
        .layer(axum::middleware::from_fn_with_state(
            state.clone(),
            middleware::auth,
        ))
        .layer(
            CorsLayer::new()
                .allow_methods([
                    Method::GET,
                    Method::POST,
                    Method::PATCH,
                    Method::DELETE,
                    Method::OPTIONS,
                    Method::HEAD,
                    Method::TRACE,
                ])
                .allow_origin(Any),
        )
        .layer(
            TraceLayer::new_for_http().make_span_with(|request: &Request<_>| {
                let matched_path = request
                    .extensions()
                    .get::<MatchedPath>()
                    .map(MatchedPath::as_str);

                info_span!(
                    "http_request",
                    method = ?request.method(),
                    matched_path,
                    some_other_field = tracing::field::Empty,
                )
            }),
        )
        .layer(TimeoutLayer::new(Duration::from_secs(5)))
        .layer(DefaultBodyLimit::max(1024 * 1024 * 512))
        .with_state(state)
}

pub fn get_schema() -> Result<String> {
    Ok(doc::Openapi::openapi().to_pretty_json()?)
}
