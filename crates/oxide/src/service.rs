use std::sync::Arc;

pub use config::Settings;
use fred::prelude::*;
use lettre::Tokio1Executor;
use sea_orm::DbConn;
use tokio::sync::RwLock;
use tokio_cron_scheduler::JobScheduler;

use crate::{docker, leaderboard, token};

pub struct AppState {
    pub db_conn: DbConn,
    pub settings: Arc<RwLock<Settings>>,

    pub redis_client: Pool,
    pub docker_manager: Arc<docker::Manager>,
    pub token_manager: Arc<token::Manager>,
    pub leaderboard_manager: Arc<leaderboard::Manager>,
    pub scheduler: JobScheduler,

    #[cfg(feature = "file-transport")]
    pub mail_transport: lettre::AsyncFileTransport<Tokio1Executor>,

    #[cfg(not(feature = "file-transport"))]
    pub mail_transport: lettre::AsyncSmtpTransport<Tokio1Executor>,
}
