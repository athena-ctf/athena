pub mod api;

mod docker;
mod errors;
mod handlers;
mod jwt;
mod middleware;
mod permissions;
mod redis_keys;
mod schemas;
mod service;
mod tasks;
mod templates;
mod token;

use std::net::{Ipv4Addr, SocketAddrV4};
use std::sync::Arc;

use fred::prelude::*;
use fred::types::RespVersion;
use lettre::Tokio1Executor;
use sea_orm::Database;
use tokio::signal;
use tokio::sync::RwLock;
use tokio_cron_scheduler::JobScheduler;

use crate::docker::Manager;
use crate::errors::{Error, Result};
use crate::service::{AppState, Settings};
use crate::token::TokenManager;

pub mod utils {
    pub fn gen_random(size: usize) -> String {
        std::iter::repeat_with(fastrand::alphanumeric)
            .take(size)
            .collect()
    }
}

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

    let scheduler = JobScheduler::new().await?;

    scheduler.start().await?;

    if !tasks::verify_awards(&db_conn).await? {
        tracing::error!("Add base awards before starting server.");
        return Err(Error::InvalidConfig("Awards".to_owned()));
    }

    tasks::load_leaderboard(&db_conn, &persistent_client).await?;
    tasks::load_challenge_solves(&db_conn, &persistent_client).await?;
    tasks::load_player_updates(&db_conn, &persistent_client).await?;

    let token_manager = TokenManager {
        redis_pool: persistent_client.clone(),
        max_retries: settings.token.max_retries,
        expiration_duration: settings.token.token_expiry_in_secs,
    };

    let settings = Arc::new(RwLock::new(settings));

    axum::serve(
        listener,
        api::router(Arc::new(AppState {
            db_conn,
            settings: settings.clone(),
            token_manager,
            scheduler,
            cache_client: cache_client.clone(),
            persistent_client: persistent_client.clone(),
            docker_manager: docker_client,
            mail_transport,
        })),
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
