use std::ffi::OsString;
use std::path::PathBuf;
use std::sync::Arc;

use async_compression::tokio::write::{BrotliEncoder, GzipEncoder, ZstdEncoder};
use aws_sdk_s3::primitives::ByteStream;
use aws_sdk_s3::types::ChecksumAlgorithm;
use axum::body::Body;
use axum::extract::{Json, Path, State};
use axum::http::header;
use axum::response::IntoResponse;
use axum_typed_multipart::TypedMultipart;
use base64::engine::general_purpose::STANDARD;
use base64::Engine;
use oxide_macros::{crud_interface_api, single_relation_api};
use ring::digest::{digest, SHA1_FOR_LEGACY_USE_ONLY};
use tokio::io::{AsyncWrite, AsyncWriteExt};
use tokio_util::io::ReaderStream;
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{BackendEnum, ChallengeModel, FileDetails, FileModel, UploadedFile};
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
    let file_name = form_data.file.metadata.file_name.as_ref().unwrap();
    let settings = state.settings.read().await;

    let (sha1_hash, backend) = if let Some(aws_s3) = &settings.file_storage.aws_s3 {
        let resp = state
            .s3_client
            .as_ref()
            .unwrap()
            .put_object()
            .bucket(&aws_s3.bucket_name)
            .key(file_name)
            .checksum_algorithm(ChecksumAlgorithm::Sha1)
            .body(ByteStream::from(form_data.file.contents.clone()))
            .send()
            .await
            .map_err(|err| Error::BadRequest(err.to_string()))?;

        (resp.checksum_sha1().unwrap().to_owned(), BackendEnum::AwsS3)
    } else if let Some(static_file) = &settings.file_storage.static_server {
        let contents = form_data.file.contents.to_vec();

        tokio::fs::write(PathBuf::from(&static_file.path).join(file_name), &contents)
            .await
            .map_err(|source| Error::Fs {
                source,
                path: static_file.path.clone(),
            })?;

        if let Some(compress) = static_file.compress {
            match compress {
                CompressionKind::Gzip => {
                    let mut file = tokio::fs::File::create(append_ext(
                        "gz",
                        PathBuf::from(&static_file.path).join(file_name),
                    ))
                    .await
                    .unwrap();

                    compress_gzip(&contents, &mut file).await;
                }

                CompressionKind::Zstd => {
                    let mut file = tokio::fs::File::create(append_ext(
                        "zst",
                        PathBuf::from(&static_file.path).join(file_name),
                    ))
                    .await
                    .unwrap();

                    compress_zstd(&contents, &mut file).await;
                }

                CompressionKind::Br => {
                    let mut file = tokio::fs::File::create(append_ext(
                        "br",
                        PathBuf::from(&static_file.path).join(file_name),
                    ))
                    .await
                    .unwrap();

                    compress_brotli(&contents, &mut file).await;
                }
            }
        }

        (
            STANDARD.encode(digest(&SHA1_FOR_LEGACY_USE_ONLY, &contents)),
            BackendEnum::StaticServer,
        )
    } else {
        return Err(Error::BadRequest(
            Error::InvalidConfig("file storage".to_owned()).to_string(),
        ));
    };

    let file_model = db::file::create(
        FileDetails {
            challenge_id: form_data.challenge_id,
            backend,
            name: form_data
                .file
                .metadata
                .file_name
                .as_ref()
                .unwrap()
                .to_owned(),
            mime: mime_guess::from_path(file_name)
                .first()
                .unwrap()
                .to_string(),
            sha1_hash,
        },
        &state.db_conn,
    )
    .await?;

    Ok(Json(file_model))
}

/// Download a file by id
pub async fn download_by_id(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> Result<axum::response::Response> {
    let Some(file_model) = db::file::retrieve(
        id,
        &state.db_conn,
        &mut state.cache_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(Error::NotFound("File does not exist".to_owned()));
    };

    let body = if file_model.backend == BackendEnum::AwsS3 {
        let resp = state
            .s3_client
            .as_ref()
            .unwrap()
            .get_object()
            .bucket(
                &state
                    .settings
                    .read()
                    .await
                    .file_storage
                    .aws_s3
                    .as_ref()
                    .unwrap()
                    .bucket_name,
            )
            .key(&file_model.name)
            .send()
            .await
            .map_err(|err| Error::BadRequest(err.to_string()))?;

        Body::from_stream(ReaderStream::new(resp.body.into_async_read()))
    } else {
        let file_path = PathBuf::from(
            &state
                .settings
                .read()
                .await
                .file_storage
                .static_server
                .as_ref()
                .unwrap()
                .path,
        )
        .join(&file_model.name);

        Body::from_stream(ReaderStream::new(
            tokio::fs::File::open(&file_path)
                .await
                .map_err(|err| Error::Fs {
                    source: err,
                    path: file_path.display().to_string(),
                })?,
        ))
    };

    let headers = [
        (header::CONTENT_TYPE, file_model.mime),
        (
            header::CONTENT_DISPOSITION,
            format!("attachment; filename=\"{}\"", file_model.name),
        ),
    ];

    Ok((headers, body).into_response())
}
