use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::Json;
use thiserror::Error as ThisError;

use crate::schemas::ErrorModel;

#[derive(Debug, ThisError)]
pub enum Error {
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

    #[error("Docker error: {0}")]
    Docker(#[from] bollard::errors::Error),

    #[error("Redis client did not reply as intended: {0}")]
    Redis(#[from] bb8_redis::redis::RedisError),

    #[error("Could not send mail: {0}")]
    Smtp(#[from] lettre::transport::smtp::Error),

    #[error("Bad Request: {0}")]
    BadRequest(String),

    #[error("Not Found: {0}")]
    NotFound(String),
}

pub type Result<T, E = Error> = std::result::Result<T, E>;

impl IntoResponse for Error {
    fn into_response(self) -> axum::response::Response {
        tracing::error!("{:?}", self);

        match self {
            Self::BadRequest(message) => {
                { (StatusCode::BAD_REQUEST, Json(ErrorModel { message })).into_response() }
                    .into_response()
            }

            Self::NotFound(message) => {
                (StatusCode::NOT_FOUND, Json(ErrorModel { message })).into_response()
            }

            _ => (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorModel {
                    message: self.to_string(),
                }),
            )
                .into_response(),
        }
    }
}
