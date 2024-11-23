use std::sync::Arc;

use axum::response::IntoResponse;
use axum::Json;
pub use config::Settings;
use fred::prelude::*;
use lettre::Tokio1Executor;
use sea_orm::DbConn;
use serde::Serialize;
use tokio::sync::RwLock;
use tokio_cron_scheduler::JobScheduler;

use crate::docker::Manager;
use crate::token::TokenManager;

pub struct AppState {
    pub db_conn: DbConn,
    pub settings: Arc<RwLock<Settings>>,

    pub cache_client: RedisPool,
    pub persistent_client: RedisPool,
    pub docker_manager: Manager,
    pub token_manager: TokenManager,
    pub scheduler: JobScheduler,

    #[cfg(feature = "file-transport")]
    pub mail_transport: lettre::AsyncFileTransport<Tokio1Executor>,

    #[cfg(not(feature = "file-transport"))]
    pub mail_transport: lettre::AsyncSmtpTransport<Tokio1Executor>,
}

pub enum CachedJson<T> {
    Cached(String),
    New(Json<T>),
}

impl<T: Serialize> IntoResponse for CachedJson<T> {
    fn into_response(self) -> axum::response::Response {
        match self {
            Self::Cached(value) => value.into_response(),
            Self::New(value) => value.into_response(),
        }
    }
}
