use std::ops::Bound;

use axum::response::Response;
use axum_extra::TypedHeader;
use axum_extra::headers::{ContentRange, HeaderMapExt, Range};
use object_store::ObjectStore;
use object_store::path::Path as FilePath;

api_macros::crud!(File, single: [Challenge], optional: [], multiple: []);

#[utoipa::path(
    get,
    path = "/player/file/{id}/download",
    operation_id = "file_download",
    params(
        ("id" = Uuid, Path),
    ),
    responses(
        (status = 200, body = inline(FileSchema), content_type = "application/octet-stream"),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn download(
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
