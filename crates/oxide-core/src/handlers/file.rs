use std::ffi::OsString;
use std::path::PathBuf;
use std::sync::Arc;

use async_compression::tokio::write::{BrotliEncoder, GzipEncoder, ZstdEncoder};
use axum::extract::{Json, Path, State};
use axum_typed_multipart::TypedMultipart;
use oxide_macros::{crud_interface_api, single_relation_api};
use ring::digest::{digest, SHA256};
use tokio::io::{AsyncWrite, AsyncWriteExt};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{ChallengeModel, FileDetails, FileModel, UploadedFile};
use crate::service::AppState;
use crate::settings::CompressionKind;

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

#[utoipa::path(
    post,
    path = "/file/upload",
    request_body(content_type = "multipart/form-data", content = UploadedFile),
    responses(
        (status = 200, description = "Uploaded file successfully", body = FileModel),
        (status = 400, description = "Invalid file upload", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Upload files
pub async fn upload(
    state: State<Arc<AppState>>,
    form_data: TypedMultipart<UploadedFile>,
) -> Result<Json<FileModel>> {
    let file_name = faster_hex::hex_string(
        digest(
            &SHA256,
            form_data
                .file
                .metadata
                .file_name
                .as_ref()
                .unwrap()
                .as_bytes(),
        )
        .as_ref(),
    );
    let file_storage = state.settings.read().await.file_storage.clone();
    let domain = state.settings.read().await.ctf.domain.clone();

    let contents = form_data.file.contents.to_vec();

    tokio::fs::write(
        PathBuf::from(&file_storage.path).join(&file_name),
        &contents,
    )
    .await
    .map_err(|source| Error::Fs {
        source,
        path: file_storage.path.clone(),
    })?;

    if let Some(compress) = file_storage.compress {
        match compress {
            CompressionKind::Gzip => {
                let mut file = tokio::fs::File::create(append_ext(
                    "gz",
                    PathBuf::from(&file_storage.path).join(&file_name),
                ))
                .await
                .unwrap();

                compress_gzip(&contents, &mut file).await;
            }

            CompressionKind::Zstd => {
                let mut file = tokio::fs::File::create(append_ext(
                    "zst",
                    PathBuf::from(&file_storage.path).join(&file_name),
                ))
                .await
                .unwrap();

                compress_zstd(&contents, &mut file).await;
            }

            CompressionKind::Br => {
                let mut file = tokio::fs::File::create(append_ext(
                    "br",
                    PathBuf::from(&file_storage.path).join(&file_name),
                ))
                .await
                .unwrap();

                compress_brotli(&contents, &mut file).await;
            }
        }
    }

    let url = format!("static.{domain}/{file_name}");

    let file_model = db::file::create(
        FileDetails {
            challenge_id: form_data.challenge_id,
            name: file_name,
            url,
        },
        &state.db_conn,
    )
    .await?;

    Ok(Json(file_model))
}
