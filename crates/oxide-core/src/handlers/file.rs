use std::ffi::OsString;
use std::path::PathBuf;
use std::sync::Arc;

use async_compression::tokio::write::{BrotliEncoder, GzipEncoder, ZstdEncoder};
use axum::extract::{Json, Path, State};
use oxide_macros::{crud_interface_api, single_relation_api};
use tokio::io::{AsyncWrite, AsyncWriteExt};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{ChallengeModel, FileDetails, FileModel};
use crate::service::AppState;

pub async fn compress_gzip<W: AsyncWrite + Unpin + Send>(data: &[u8], writer: W) {
    let mut encoder = GzipEncoder::new(writer);
    encoder.write_all(data).await.unwrap();
}

pub async fn compress_zstd<W: AsyncWrite + Unpin + Send>(data: &[u8], writer: W) {
    let mut encoder = ZstdEncoder::new(writer);
    encoder.write_all(data).await.unwrap();
}

pub async fn compress_brotli<W: AsyncWrite + Unpin + Send>(data: &[u8], writer: W) {
    let mut encoder = BrotliEncoder::new(writer);
    encoder.write_all(data).await.unwrap();
}

pub fn append_ext(ext: &str, path: PathBuf) -> PathBuf {
    let mut os_string: OsString = path.into();
    os_string.push(".");
    os_string.push(ext);
    os_string.into()
}

crud_interface_api!(File);
single_relation_api!(File, Challenge);
