use std::net::{Ipv4Addr, SocketAddrV4};
use std::sync::Arc;
use std::time::Duration;

use axum::extract::{MatchedPath, Request};
use axum::http::Method;
use axum::routing::get;
use axum::Router;
use base64ct::{Base64, Encoding};
use fred::prelude::*;
use fred::types::RespVersion;
use lettre::Tokio1Executor;
use sea_orm::{Database, TransactionTrait};
use tokio::signal;
use tokio::sync::RwLock;
use tower_http::cors::{Any, CorsLayer};
use tower_http::timeout::TimeoutLayer;
use tower_http::trace::TraceLayer;
use tower_sessions::cookie::Key;
use tower_sessions::{Expiry, SessionManagerLayer};
use tower_sessions_redis_store::RedisStore;
use tracing::info_span;
use utoipa::OpenApi;

use crate::docker::Manager;
use crate::errors::{Error, Result};
use crate::middleware;
use crate::service::{AppState, Settings};
use crate::token::TokenManager;

mod admin_routes;
mod auth;
mod doc;
mod player_routes;
mod tasks;

pub async fn start(settings: Settings) -> Result<()> {
    let db_conn = Database::connect(settings.database.url()).await?;

    let listener = tokio::net::TcpListener::bind(SocketAddrV4::new(Ipv4Addr::UNSPECIFIED, 7000))
        .await
        .map_err(Error::Bind)?;

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

    let cache_config = RedisConfig::from_url(&settings.redis.cache.url())?;
    let cache_client = Builder::from_config(cache_config)
        .with_config(|config| {
            config.version = RespVersion::RESP3;
        })
        .set_policy(ReconnectPolicy::new_exponential(0, 100, 30_000, 2))
        .build_pool(8)?;
    let cache_conn = cache_client.init().await?;

    let persistent_config = RedisConfig::from_url(&settings.redis.persistent.url())?;
    let persistent_client = Builder::from_config(persistent_config)
        .with_config(|config| {
            config.version = RespVersion::RESP3;
        })
        .set_policy(ReconnectPolicy::new_exponential(0, 100, 30_000, 2))
        .build_pool(8)?;
    let persistent_conn = persistent_client.init().await?;

    let docker_client = Manager::new(
        db_conn.clone(),
        settings.challenge.clone(),
        "caddy:2019".to_owned(),
        settings.ctf.domain.clone(),
    )?;

    if !tasks::verify_awards(&db_conn).await? {
        tracing::error!("Add base awards before starting server.");
        return Err(Error::InvalidConfig("Awards".to_owned()));
    }

    let txn = db_conn.begin().await?;
    tasks::load_leaderboard(&txn, &persistent_client).await?;
    tasks::load_challenge_solves(&txn, &persistent_client).await?;
    txn.commit().await?;

    let token_manager = TokenManager {
        redis: persistent_client.clone(),
        max_retries: settings.token.max_retries,
        expiration_duration: settings.token.token_expiry_in_secs,
    };

    let settings = Arc::new(RwLock::new(settings));

    axum::serve(
        listener,
        app(Arc::new(AppState {
            db_conn,
            settings: settings.clone(),
            token_manager,
            cache_client: cache_client.clone(),
            persistent_client: persistent_client.clone(),
            docker_manager: docker_client,
            mail_transport,
        }))
        .await,
    )
    .with_graceful_shutdown(shutdown_signal())
    .await
    .map_err(Error::Serve)?;

    tracing::info!("starting server on port 7000");

    cache_client.quit().await?;
    cache_conn.await.unwrap()?;

    persistent_client.quit().await?;
    persistent_conn.await.unwrap()?;

    let location = settings.read().await.location.clone().unwrap();

    std::fs::write(&location, serde_json::to_vec(&*settings.read().await)?).map_err(|err| {
        Error::Fs {
            source: err,
            path: location,
        }
    })?;

    Ok(())
}

async fn app(state: Arc<AppState>) -> axum::Router {
    let session_settings = state.settings.read().await.session.clone();

    let session_store = RedisStore::new(state.persistent_client.clone());
    let session_layer = SessionManagerLayer::new(session_store)
        .with_expiry(Expiry::OnInactivity(
            Duration::from_secs(session_settings.expiry_duration)
                .try_into()
                .unwrap(),
        ))
        .with_signed(Key::from(
            &Base64::decode_vec(&session_settings.key).unwrap(),
        ))
        .with_name(session_settings.cookie_name);

    Router::new()
        .merge(auth::router())
        .merge(admin_routes::router())
        .merge(player_routes::router())
        .route("/stats", get(crate::handlers::stats::retrieve))
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
        .layer(session_layer)
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
