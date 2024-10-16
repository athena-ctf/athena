use std::net::{Ipv4Addr, SocketAddrV4};
use std::sync::Arc;
use std::time::Duration;

use axum::extract::{MatchedPath, Request};
use axum::http::Method;
use axum::routing::get;
use bb8_redis::redis::{ConnectionAddr, ConnectionInfo, ProtocolVersion, RedisConnectionInfo};
use bb8_redis::RedisConnectionManager;
use router_wrapper::Router;
use sea_orm::{Database, DatabaseConnection};
use tokio::signal;
use tokio::sync::RwLock;
use tower_http::cors::{Any, CorsLayer};
use tower_http::timeout::TimeoutLayer;
use tower_http::trace::TraceLayer;
use tracing::info_span;
use utoipa::OpenApi;

use crate::errors::{Error, Result};
use crate::service::{AppState, Settings};
use crate::{docker, middleware};

mod achievement;
mod admin;
mod auth;
mod ban;
mod challenge;
mod challenge_tag;
mod doc;
mod file;
mod flag;
mod hint;
mod instance;
mod invite;
mod leaderboard;
mod notification;
mod player;
pub mod router_wrapper;
mod settings;
mod submission;
mod tag;
mod tasks;
mod team;
mod ticket;
mod unlock;

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

        lettre::SmtpTransport::starttls_relay(&settings.smtp.server_url)?
            .credentials(credentials)
            .build()
    };

    #[cfg(feature = "file-transport")]
    let mail_transport = lettre::FileTransport::new("./emails");

    let cache_manager = RedisConnectionManager::new(ConnectionInfo {
        addr: ConnectionAddr::Tcp(settings.redis.cache.host.clone(), settings.redis.cache.port),
        redis: RedisConnectionInfo {
            db: 2,
            username: Some(settings.redis.cache.username.clone()),
            password: Some(settings.redis.cache.password.clone()),
            protocol: ProtocolVersion::RESP3,
        },
    })?;
    let cache_client = bb8::Pool::builder().build(cache_manager).await?;

    let token_manager = RedisConnectionManager::new(ConnectionInfo {
        addr: ConnectionAddr::Tcp(settings.redis.token.host.clone(), settings.redis.token.port),
        redis: RedisConnectionInfo {
            db: 2,
            username: Some(settings.redis.token.username.clone()),
            password: Some(settings.redis.token.password.clone()),
            protocol: ProtocolVersion::RESP3,
        },
    })?;
    let token_client = bb8::Pool::builder().build(token_manager).await?;

    let docker_client = docker::connect()?;

    let handles = tasks::run(&docker_client, &db_conn);

    axum::serve(
        listener,
        app(Arc::new(AppState {
            db_conn,
            settings: RwLock::new(settings),

            cache_client,
            token_client,
            docker_client,
            mail_transport,
        })),
    )
    .with_graceful_shutdown(shutdown_signal())
    .await
    .map_err(Error::Serve)?;

    tasks::stop(handles);

    Ok(())
}

pub async fn start(settings: Settings) -> Result<()> {
    let db_conn = Database::connect(settings.db_url()).await?;

    start_with_db_conn(settings, db_conn).await
}

pub fn app(state: Arc<AppState>) -> axum::Router {
    let router = Router::new()
        .merge(achievement::router())
        .merge(auth::router())
        .merge(ban::router())
        .merge(challenge::router())
        .merge(challenge_tag::router())
        .merge(file::router())
        .merge(flag::router())
        .merge(hint::router())
        .merge(instance::router())
        .merge(invite::router())
        .merge(leaderboard::router())
        .merge(admin::router())
        .merge(notification::router())
        .merge(player::router())
        .merge(settings::router())
        .merge(submission::router())
        .merge(tag::router())
        .merge(team::router())
        .merge(ticket::router())
        .merge(unlock::router())
        .route("/stats", get(crate::handlers::stats::get));

    #[cfg(feature = "wrapped_router")]
    {
        let paths = router.paths;

        tracing::debug!("paths list: {:?}", paths);
    }

    #[cfg(feature = "wrapped_router")]
    let router = router.inner;

    router
        .layer(axum::middleware::from_fn_with_state(
            state.clone(),
            middleware::ctf_timer,
        ))
        .layer(axum::middleware::from_fn_with_state(
            state.clone(),
            middleware::access_control,
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
