use crate::schemas::{
    CreateInstanceSchema, Deployment, DeploymentModel, Instance, InstanceModel, JsonResponse,
};

oxide_macros::crud!(Instance, single: [Deployment], optional: [], multiple: [], id_descriptor: container_name);

#[utoipa::path(
    put,
    path = "/player/instance/restart/{id}",
    params(
        ("id" = Uuid, Path, description = "Id of instance"),
    ),
    responses(
        (status = 200, description = "Restarted instance by id successfully", body = JsonResponse),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No hint found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Restart instance by id
pub async fn restart(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> Result<Json<JsonResponse>> {
    let Some(instance_model) = Instance::find_by_id(id).one(&state.db_conn).await? else {
        return Err(Error::NotFound("Instance not found".to_owned()));
    };

    state
        .docker_manager
        .restart_container(&instance_model.container_id)
        .await?;

    Ok(Json(JsonResponse {
        message: "Successfully restarted container".to_owned(),
    }))
}
