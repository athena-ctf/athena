use std::ops::Bound;
use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Multipart, Path, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::routing::{get, head, post};
use axum::{Json, Router};
use axum_extra::TypedHeader;
use axum_extra::headers::{ContentRange, HeaderMapExt, Range};
use object_store::ObjectStore;
use object_store::path::Path as FilePath;
use sea_orm::{ActiveModelTrait, EntityTrait, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{File, FileModel, FileSchema, JsonResponse, StoredFile};
use crate::{ApiResponse, AppState};

#[api_macros::requires_permission(permission = "fileserver:upload")]
#[utoipa::path(
    post,
    path = "/admin/fileserver",
    operation_id = "fileserver_upload",
    request_body(
        content_type = "multipart/form-data",
        content = inline(FileSchema)
    ),
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn upload(state: State<Arc<AppState>>, mut multipart: Multipart) -> Result<ApiResponse<Json<JsonResponse>>> {
    while let Some(field) = multipart.next_field().await.unwrap() {
        if field.name().unwrap() == "file" {
            let file_name = field.file_name().unwrap();
            let file_model = FileModel::new(file_name)
                .into_active_model()
                .insert(&state.db_conn)
                .await?;

            state
                .fileserver_manager
                .upload(file_model.id, field.bytes().await?)
                .await?;

            return Ok(ApiResponse::json_ok(JsonResponse {
                message: "Successfully uploaded file".to_owned(),
            }));
        }
    }

    Err(Error::BadRequest("Invalid form data".to_owned()))
}

#[api_macros::requires_permission(permission = "fileserver:download")]
#[utoipa::path(
    get,
    path = "/admin/fileserver/{id}/download",
    operation_id = "fileserver_download",
    params(
        ("id" = Uuid, Path),
    ),
    responses(
        (status = 200, body = inline(FileSchema), content_type = "application/octet-stream"),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
async fn download(
    State(state): State<Arc<AppState>>,
    range_header: Option<TypedHeader<Range>>,
    Path(id): Path<Uuid>,
) -> Result<ApiResponse<Response>> {
    let object_path = FilePath::from(id.simple().to_string());
    let meta = state.fileserver_manager.meta(id).await?;
    let total_size = meta.size as u64;

    if let Some(TypedHeader(range)) = range_header {
        if let Some(range) = range.satisfiable_ranges(total_size).next() {
            let (start, end) = match range {
                (Bound::Included(start), Bound::Included(end)) => (start, std::cmp::min(end, total_size - 1)),
                (Bound::Included(start), Bound::Unbounded) => (start, total_size - 1),
                (Bound::Unbounded, Bound::Unbounded) => (0, total_size - 1),
                _ => unreachable!(),
            };

            if start >= total_size {
                return Err(Error::RangeNotSatisfiable);
            }

            let range = std::ops::Range {
                start: start as usize,
                end: 1 + end as usize,
            };

            let body = state.fileserver_manager.local.get_range(&object_path, range).await?;
            let content_range = ContentRange::bytes(start..=end, total_size).unwrap();

            let mut response = Response::builder().body(Body::from(body)).unwrap().into_response();
            response.headers_mut().typed_insert(content_range);

            Ok(ApiResponse(StatusCode::PARTIAL_CONTENT, response))
        } else {
            Err(Error::BadRequest("Invalid file range".to_owned()))
        }
    } else {
        let body = state.fileserver_manager.local.get(&object_path).await?;

        Ok(ApiResponse::ok(
            Response::builder().body(Body::from(body.bytes().await?)).unwrap(),
        ))
    }
}

#[api_macros::requires_permission(permission = "fileserver:delete")]
#[utoipa::path(
    delete,
    path = "/admin/fileserver/{id}",
    operation_id = "fileserver_delete",
    params(
        ("id" = Uuid, Path),
    ),
    responses(
        (status = 204),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn delete(state: State<Arc<AppState>>, Path(id): Path<Uuid>) -> Result<ApiResponse<()>> {
    state.fileserver_manager.delete(id).await?;
    File::delete_by_id(id).exec(&state.db_conn).await?;

    Ok(ApiResponse::no_content())
}

#[api_macros::requires_permission(permission = "fileserver:read")]
#[utoipa::path(
    get,
    path = "/admin/fileserver",
    operation_id = "fileserver_list",
    responses(
        (status = 200, body = [StoredFile]),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn list(state: State<Arc<AppState>>) -> Result<ApiResponse<Json<Vec<StoredFile>>>> {
    let models = File::find().all(&state.db_conn).await?;
    let mut files = Vec::with_capacity(models.len());

    for model in models {
        let meta = state.fileserver_manager.meta(model.id).await?;
        files.push(StoredFile {
            model,
            last_modified: meta.last_modified,
            location: meta.location.to_string(),
            size: meta.size,
        });
    }

    Ok(ApiResponse::json_ok(files))
}

#[api_macros::requires_permission(permission = "fileserver:sync")]
#[utoipa::path(
    post,
    path = "/admin/fileserver/sync",
    operation_id = "fileserver_sync",
    responses(
        (status = 200, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn sync(state: State<Arc<AppState>>) -> Result<ApiResponse<Json<JsonResponse>>> {
    state.fileserver_manager.sync().await?;

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully synced files".to_owned(),
    }))
}

#[api_macros::requires_permission(permission = "fileserver:read")]
#[utoipa::path(
    get,
    path = "/admin/fileserver/{id}",
    operation_id = "fileserver_meta",
    params(
        ("id" = Uuid, Path),
    ),
    responses(
        (status = 200, body = StoredFile),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn meta(state: State<Arc<AppState>>, Path(id): Path<Uuid>) -> Result<ApiResponse<Json<StoredFile>>> {
    let Some(model) = File::find_by_id(id).one(&state.db_conn).await? else {
        return Err(Error::NotFound("File not found".to_owned()));
    };
    let meta = state.fileserver_manager.meta(id).await?;

    Ok(ApiResponse::json_ok(StoredFile {
        model,
        last_modified: meta.last_modified,
        location: meta.location.to_string(),
        size: meta.size,
    }))
}

pub fn router() -> Router<Arc<AppState>> {
    Router::new().nest(
        "/fileserver",
        Router::new()
            .route("", get(list).post(upload))
            .route("/:id", head(meta).delete(delete))
            .route("/sync", post(sync))
            .route("/:id/dowwnload", get(download)),
    )
}
