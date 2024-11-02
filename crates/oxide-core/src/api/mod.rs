use std::net::{Ipv4Addr, SocketAddrV4};
use std::sync::Arc;
use std::time::Duration;

use axum::extract::{MatchedPath, Request};
use axum::http::Method;
use axum::routing::get;
use axum::Router;
use fred::prelude::*;
use fred::types::RespVersion;
use lettre::Tokio1Executor;
use sea_orm::{Database, DatabaseConnection};
use tokio::signal;
use tokio::sync::RwLock;
use tower_http::cors::{Any, CorsLayer};
use tower_http::timeout::TimeoutLayer;
use tower_http::trace::TraceLayer;
use tracing::info_span;
use utoipa::OpenApi;

use crate::docker::DockerManager;
use crate::errors::{Error, Result};
use crate::middleware;
use crate::service::{AppState, Settings};
use crate::token::TokenManager;

mod admin_routes;
mod auth;
mod doc;
mod player_routes;
mod tasks;

pub async fn start_with_db_conn(settings: Settings, db_conn: DatabaseConnection) -> Result<()> {
    let listener = tokio::net::TcpListener::bind(SocketAddrV4::new(Ipv4Addr::UNSPECIFIED, 7000))
        .await
        .map_err(Error::Bind)?;

    tracing::info!("starting axum on port 7000");

    #[cfg(not(feature = "file-transport"))]
    let mail_transport = {
        let credentials = lettre::transport::smtp::authentication::Credentials::new(
            settings.smtp.username.clone(),
            settings.smtp.password.clone(),
        );

        lettre::AsyncSmtpTransport::<Tokio1Executor>::starttls_relay(&settings.smtp.server_url)?
            .credentials(credentials)
            .build()
    };

    #[cfg(feature = "file-transport")]
    let mail_transport = lettre::AsyncFileTransport::<Tokio1Executor>::new("./emails");

    let cache_config = RedisConfig::from_url("redis://foo:bar@127.0.0.1:6379")?;
    let cache_client = Builder::from_config(cache_config)
        .with_config(|config| {
            config.version = RespVersion::RESP3;
        })
        .set_policy(ReconnectPolicy::new_exponential(0, 100, 30_000, 2))
        .build_pool(8)?;
    cache_client.init().await?;

    let persistent_config = RedisConfig::from_url("redis://foo:bar@127.0.0.1:6379")?;
    let persistent_client = Builder::from_config(persistent_config)
        .with_config(|config| {
            config.version = RespVersion::RESP3;
        })
        .set_policy(ReconnectPolicy::new_exponential(0, 100, 30_000, 2))
        .build_pool(8)?;
    persistent_client.init().await?;

    let docker_client = DockerManager::new(
        db_conn.clone(),
        settings.challenge.container_registry.clone(),
        settings.challenge.registry_username.clone(),
        settings.challenge.registry_password.clone(),
        settings.challenge.user_flag_len,
        settings.challenge.container_timeout,
    )?;

    // let handles = tasks::run(&docker_client, &db_conn);

    tasks::load_leaderboard(&db_conn, &persistent_client).await?;

    let token_manager = TokenManager {
        redis: persistent_client.clone(),
        max_retries: settings.token.max_retries,
        expiration_duration: settings.token.token_expiry_in_secs,
    };

    axum::serve(
        listener,
        app(Arc::new(AppState {
            db_conn,
            settings: RwLock::new(settings),
            token_manager,
            cache_client,
            persistent_client,
            docker_manager: docker_client,
            mail_transport,
        })),
    )
    .with_graceful_shutdown(shutdown_signal())
    .await
    .map_err(Error::Serve)?;

    // tasks::stop(handles);

    Ok(())
}

pub async fn start(settings: Settings) -> Result<()> {
    let db_conn = Database::connect(settings.db_url()).await?;

    start_with_db_conn(settings, db_conn).await
}

pub fn app(state: Arc<AppState>) -> axum::Router {
    Router::new()
        .merge(auth::router())
        .merge(admin_routes::router())
        .merge(player_routes::router())
        .route("/stats", get(crate::handlers::stats::retrieve))
        .layer(axum::middleware::from_fn_with_state(
            state.clone(),
            middleware::ctf_timer,
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
        .with_state(state)
}

async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c().await.unwrap();
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .unwrap()
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        () = ctrl_c => {},
        () = terminate => {},
    }
}

pub fn get_schema() -> Result<String> {
    Ok(doc::Openapi::openapi().to_pretty_json()?)
}
