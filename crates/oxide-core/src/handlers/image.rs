use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum_typed_multipart::TypedMultipart;
use bollard::auth::DockerCredentials;

use crate::docker::{self, IMAGE_PUSH_STATE};
use crate::errors::{Error, Result};
use crate::schemas::{ContainerImage, CreateImageSchema, JsonResponse};
use crate::service::AppState;

#[utoipa::path(
    get,
    path = "/image",
    responses(
        (status = 200, description = "Listed images successfully", body = [ContainerImage]),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// List images
pub async fn list() -> Result<Json<Vec<ContainerImage>>> {
    let images = IMAGE_PUSH_STATE.read().await;

    Ok(Json(
        images
            .iter()
            .map(|(k, v)| ContainerImage {
                name: k.clone(),
                status: *v,
            })
            .collect(),
    ))
}

#[utoipa::path(
    post,
    path = "/image",
    request_body(content_type = "multipart/form-data", content = CreateImageSchema),
    responses(
        (status = 201, description = "Created image successfully", body = ()),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Create image
pub async fn create(
    state: State<Arc<AppState>>,
    body: TypedMultipart<CreateImageSchema>,
) -> Result<Json<JsonResponse>> {
    let docker = &state.settings.read().await.docker;

    docker::upload_image(
        body.file.contents.clone(),
        body.container_name.clone(),
        body.challenge_title.clone(),
        DockerCredentials {
            username: Some(docker.registry_username.clone()),
            password: Some(docker.registry_password.clone()),
            ..Default::default()
        },
        docker.registry_url.clone(),
        state.docker_client.clone(),
    );

    Ok(Json(JsonResponse {
        message: "successfully built and pushed image".to_owned(),
    }))
}

#[utoipa::path(
    get,
    path = "/image/{name}",
    params(("name" = String, Path, description = "Name of image")),
    responses(
        (status = 200, description = "Retrieved image by name successfully", body = ContainerImage),
        (status = 400, description = "Invalid parameters format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No image found with specified name", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Retrieve image by name
pub async fn retrieve(Path(name): Path<String>) -> Result<Json<ContainerImage>> {
    let images = IMAGE_PUSH_STATE.read().await;

    images.get(&name).map_or_else(
        || Err(Error::NotFound("Image not found".to_owned())),
        |&status| Ok(Json(ContainerImage { name, status })),
    )
}
