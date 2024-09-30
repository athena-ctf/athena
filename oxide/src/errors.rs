use thiserror::Error;

#[derive(Debug, Error)]
pub enum AthenaError {
    #[error("Could not bind to TCP listener: {0:?}")]
    Bind(#[source] std::io::Error),

    #[error("Could not serve axum server: {0:?}")]
    Serve(#[source] std::io::Error),

    #[error("Error occurred on file '{path}': {source:?}")]
    Fs {
        source: std::io::Error,
        path: String,
    },

    #[error("JSON serialization/deserialization error: {0:?}")]
    Json(#[from] serde_json::Error),

    #[error("Could not load config: {0:#?}")]
    Config(#[from] config::ConfigError),

    #[error("Error while doing db operations: {0:?}")]
    Db(#[from] sea_orm::DbErr),

    #[error("Error occurred while user verification")]
    Hash(#[from] argon2::password_hash::Error),

    #[error("Error while handling JWT token: {0}")]
    Jwt(#[from] jsonwebtoken::errors::Error),

    #[error("Athena was not configured to handle {0}")]
    InvalidConfig(String),

    #[error("Invalid regex: {0:?}")]
    InvalidRegex(#[from] regex::Error),

    #[error("{0}")]
    Generic(String),

    #[error("Docker error: {0}")]
    Docker(#[from] bollard::errors::Error),

    #[error("Redis client did not reply as intended: {0}")]
    Redis(#[from] bb8_redis::redis::RedisError),

    #[error("")]
    Smtp(#[from] lettre::transport::smtp::Error),
}

pub type Result<T, E = AthenaError> = std::result::Result<T, E>;
