use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::Json;
use axum_extra::extract::CookieJar;
use thiserror::Error as ThisError;

use crate::schemas::JsonResponse;

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
    Redis(#[from] fred::error::Error),

    #[cfg(not(feature = "file-transport"))]
    #[error("Could not send mail: {0}")]
    MailSmtp(#[from] lettre::transport::smtp::Error),

    #[cfg(feature = "file-transport")]
    #[error("Could not store mail: {0}")]
    MailFile(#[from] lettre::transport::file::Error),

    #[error("Could not send request: {0:?}")]
    Http(#[from] reqwest::Error),

    #[error("Export error: {0:?}")]
    Sqlx(#[from] sea_orm::sqlx::Error),

    #[error("Temp file error: {0:?}")]
    Temp(#[from] std::io::Error),

    #[error("Multipart error: {0:?}")]
    Multipart(#[from] axum::extract::multipart::MultipartError),

    #[error("Scheduler error: {0}")]
    Scheduler(#[from] tokio_cron_scheduler::JobSchedulerError),

    #[error("Bad Request: {0}")]
    BadRequest(String),

    #[error("Not Found: {0}")]
    NotFound(String),

    #[error("Unauthorized: {1}")]
    Unauthorized(Option<CookieJar>, String),

    #[error("Forbidden: {0}")]
    Forbidden(String),
}

pub type Result<T, E = Error> = std::result::Result<T, E>;

impl IntoResponse for Error {
    fn into_response(self) -> axum::response::Response {
        tracing::error!("{:?}", self);

        match self {
            Self::BadRequest(message) => {
                (StatusCode::BAD_REQUEST, Json(JsonResponse { message })).into_response()
            }

            Self::NotFound(message) => {
                (StatusCode::NOT_FOUND, Json(JsonResponse { message })).into_response()
            }

            Self::Unauthorized(jar, message) => {
                if let Some(jar) = jar {
                    (
                        StatusCode::UNAUTHORIZED,
                        jar,
                        Json(JsonResponse { message }),
                    )
                        .into_response()
                } else {
                    (StatusCode::UNAUTHORIZED, Json(JsonResponse { message })).into_response()
                }
            }

            Self::Forbidden(message) => {
                (StatusCode::FORBIDDEN, Json(JsonResponse { message })).into_response()
            }

            _ => (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(JsonResponse {
                    message: self.to_string(),
                }),
            )
                .into_response(),
        }
    }
}
