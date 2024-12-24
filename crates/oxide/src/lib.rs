pub mod api;

mod app_state;
mod docker;
mod errors;
mod handlers;
mod jwt;
mod leaderboard;
mod middleware;
mod permissions;
mod redis_keys;
mod schemas;
mod tasks;
mod templates;
mod token;

use std::net::{Ipv4Addr, SocketAddrV4};
use std::sync::Arc;
use std::time::Duration;

use fred::prelude::*;
use fred::types::RespVersion;
use lettre::Tokio1Executor;
use sea_orm::Database;
use tokio::signal;
use tokio::sync::RwLock;
use tokio_cron_scheduler::{Job, JobScheduler};

use crate::app_state::{AppState, Settings};
use crate::errors::{Error, Result};

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

    let redis_config = Config::from_url(&settings.redis.url())?;
    let redis_client = Builder::from_config(redis_config)
        .with_config(|config| {
            config.version = RespVersion::RESP3;
        })
        .set_policy(ReconnectPolicy::new_exponential(0, 100, 30_000, 2))
        .build_pool(8)?;
    let redis_conn = redis_client.init().await?;

    let docker_manager = Arc::new(docker::Manager::new(
        db_conn.clone(),
        settings.challenge.clone(),
        "caddy:2019".to_owned(),
        settings.ctf.domain.clone(),
    )?);

    let leaderboard_manager = Arc::new(leaderboard::Manager::new(
        redis_client.clone(),
        settings.ctf.time.end.timestamp(),
        settings
            .ctf
            .time
            .end
            .signed_duration_since(settings.ctf.time.start)
            .num_seconds(),
    ));

    let scheduler = JobScheduler::new().await?;

    scheduler.shutdown_on_ctrl_c();
    scheduler.start().await?;

    if !tasks::verify_awards(&db_conn).await? {
        tracing::error!("Add base awards before starting server.");
        return Err(Error::InvalidConfig("Awards".to_owned()));
    }

    tasks::load_leaderboard(&db_conn, &leaderboard_manager).await?;
    tasks::load_challenge_solves(&db_conn, &redis_client).await?;
    tasks::load_player_updates(&db_conn, &redis_client).await?;
    tasks::load_static_deployments(&db_conn, &docker_manager).await?;

    let manager_clone = docker_manager.clone();
    let db_clone = db_conn.clone();

    scheduler
        .add(Job::new_repeated_async(
            Duration::from_secs(300),
            move |_, _| {
                let manager_clone = manager_clone.clone();
                let db_clone = db_clone.clone();

                Box::pin(async move {
                    tasks::watch_static_deployments(&db_clone, &manager_clone)
                        .await
                        .unwrap();
                })
            },
        )?)
        .await?;

    let token_manager = Arc::new(token::Manager::new(
        redis_client.clone(),
        settings.token.max_retries,
        settings.token.token_expiry_in_secs,
    ));

    let settings = Arc::new(RwLock::new(settings));

    let manager_clone = docker_manager.clone();
    let db_clone = db_conn.clone();

    tracing::info!("starting server on port 7000");

    axum::serve(
        listener,
        api::router(Arc::new(AppState {
            db_conn,
            settings: settings.clone(),
            token_manager,
            leaderboard_manager,
            scheduler,
            redis_client: redis_client.clone(),
            docker_manager,
            mail_transport,
        })),
    )
    .with_graceful_shutdown(shutdown_signal())
    .await
    .map_err(Error::Serve)?;

    tasks::unload_deployments(&db_clone, &manager_clone).await?;

    redis_client.quit().await?;
    redis_conn.await.unwrap()?;

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
