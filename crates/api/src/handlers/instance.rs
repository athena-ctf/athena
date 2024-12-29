api_macros::crud!(Instance, single: [Deployment], optional: [], multiple: []);

#[utoipa::path(
    put,
    path = "/player/instance/restart/{id}",
    params(
        ("id" = Uuid, Path),
    ),
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn restart(state: State<Arc<AppState>>, Path(id): Path<Uuid>) -> Result<ApiResponse<Json<JsonResponse>>> {
    let Some(instance_model) = Instance::find_by_id(id).one(&state.db_conn).await? else {
        return Err(Error::NotFound("Instance not found".to_owned()));
    };

    state
        .docker_manager
        .restart_container(&instance_model.container_id)
        .await?;

    Ok(ApiResponse::json(JsonResponse {
        message: "Successfully restarted container".to_owned(),
    }))
}
