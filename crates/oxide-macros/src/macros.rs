#[macro_export]
macro_rules! join_table_api {
    ($entity:ident, $related_from:ident, $related_from_id:literal, $related_to:ident, $related_to_id:literal) => {
        $crate::paste! {
            #[doc = "List " $entity:snake "s"]
            #[utoipa::path(
                get,
                path = concat!("/admin/",stringify!([<$entity:snake>])),
                operation_id = concat!("list_",stringify!([<$entity:snake>]),"s"),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:snake>]),"s successfully"), body = [[<$entity Model>]]),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn list(state: State<Arc<AppState>>) -> Result<Json<Vec<[<$entity Model>]>>> {
                Ok(Json($entity::find().all(&state.db_conn).await?))
            }

            #[doc = "Create " $entity]
            #[utoipa::path(
                post,
                path = concat!("/admin/",stringify!([<$entity:snake>])),
                operation_id = concat!("create_",stringify!([<$entity:snake>])),
                request_body = [<Create $entity Schema>],
                responses(
                    (status = 201, description = concat!("Created ",stringify!([<$entity:snake>])," successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid request body format", body = JsonResponse),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn create(
                state: State<Arc<AppState>>,
                Json(body): Json<[<Create $entity Schema>]>,
            ) -> Result<Json<[<$entity Model>]>> {
                let mut model = body.into_active_model();
                model.created_at = ActiveValue::Set(Utc::now().naive_utc());
                model.updated_at = ActiveValue::Set(Utc::now().naive_utc());

                Ok(Json(model.insert(&state.db_conn).await?))
            }

            #[doc = "Delete " $entity:snake " by id"]
            #[utoipa::path(
                delete,
                path = concat!("/admin/",stringify!([<$entity:snake>]),"/{",$related_from_id,"}-{",$related_to_id,"}"),
                operation_id = concat!("delete_",stringify!([<$entity:snake>]),"_by_id"),
                params(
                    ($related_from_id = Uuid, Path, description = "Id of entity"),
                    ($related_to_id = Uuid, Path, description = "Id of entity"),
                ),
                responses(
                    (status = 204, description = concat!("Deleted ",stringify!([<$entity:snake>])," by id successfully")),
                    (status = 400, description = "Invalid parameters format", body = JsonResponse),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn delete_by_id(state: State<Arc<AppState>>, Path(id): Path<(Uuid, Uuid)>) -> Result<()> {
                let delete_result = $entity::delete_by_id(id).exec(&state.db_conn).await?;
                if delete_result.rows_affected == 1 {
                    state.cache_client.del::<(), _>(format!("{}:{}:{}", stringify!([<$entity:snake>]), id.0.simple(), id.1.simple())).await?;
                    Ok(())
                } else {
                    Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned()))
                }
            }

            #[doc = "Retrieve " $entity:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/admin/",stringify!([<$entity:snake>]),"/{",$related_from_id,"}-{",$related_to_id,"}"),
                operation_id = concat!("retrieve_",stringify!([<$entity:snake>]),"_by_id"),
                params(
                    ($related_from_id = Uuid, Path, description = "Id of entity"),
                    ($related_to_id = Uuid, Path, description = "Id of entity"),
                ),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:snake>])," by id successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid parameters format", body = JsonResponse),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn retrieve_by_id(
                state: State<Arc<AppState>>,
                Path(id): Path<(Uuid, Uuid)>,
            ) -> Result<CachedJson<[<$entity Model>]>> {
                let value = state.cache_client.get::<Option<String>, _>(format!("{}:{}:{}", stringify!([<$entity:snake>]), id.0.simple(), id.1.simple())).await?;
                if let Some(cached) = value {
                    Ok(CachedJson::Cached(cached))
                } else {
                    if let Some(model) = $entity::find_by_id(id).one(&state.db_conn).await? {
                        state.cache_client.set::<(), _, _>(format!("{}:{}:{}", stringify!([<$entity:snake>]), id.0.simple(), id.1.simple()), serde_json::to_string(&model)?, None, None, false).await?;
                        Ok(CachedJson::New(Json(model)))
                    } else {
                        Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned()))
                    }
                }
            }

            #[doc = "Update " $entity:snake " by id"]
            #[utoipa::path(
                patch,
                path = concat!("/admin/",stringify!([<$entity:snake>]),"/{",$related_from_id,"}-{",$related_to_id,"}"),
                operation_id = concat!("update_",stringify!([<$entity:snake>]),"_by_id"),
                params(
                    ($related_from_id = Uuid, Path, description = "Id of entity"),
                    ($related_to_id = Uuid, Path, description = "Id of entity"),
                ),
                request_body = [<Create $entity Schema>],
                responses(
                    (status = 200, description = concat!("Updated ",stringify!([<$entity:snake>])," by id successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid parameters/request body format", body = JsonResponse),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn update_by_id(
                state: State<Arc<AppState>>,
                Path(id): Path<(Uuid, Uuid)>,
                Json(body): Json<[<Create $entity Schema>]>,
            ) -> Result<Json<[<$entity Model>]>> {
                let mut model = body.into_active_model();
                model.[<$related_from:snake _id>] = ActiveValue::Set(id.0);
                model.[<$related_to:snake _id>] = ActiveValue::Set(id.1);

                let model = $entity::update(model)
                    .exec(&state.db_conn)
                    .await?;

                state.cache_client.del::<(), _>(format!("{}:{}:{}", stringify!([<$entity:snake>]), id.0.simple(), id.1.simple())).await?;
                Ok(Json(model))
            }

            #[derive(Clone, Debug, serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
            pub struct [<$entity Relations>] {
                pub [<$related_from:snake>]: [<$related_from Model>],
                pub [<$related_to:snake>]: [<$related_to Model>],
            }

            #[doc = "Retrieve " $entity:snake " relations by id"]
            #[utoipa::path(
                get,
                path = concat!("/admin/",stringify!([<$entity:snake>]),"/{",$related_from_id,"}-{",$related_to_id,"}/relations"),
                operation_id = concat!("retrieve_",stringify!([<$entity:snake>]),"_relations_by_id"),
                params(
                    ($related_from_id = Uuid, Path, description = "Id of entity"),
                    ($related_to_id = Uuid, Path, description = "Id of entity"),
                ),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:snake>])," relations by id successfully"), body = [<$entity Relations>]),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn retrieve_relations_by_id(
                state: State<Arc<AppState>>,
                Path(id): Path<(Uuid, Uuid)>,
            ) -> Result<Json<[<$entity Relations>]>> {
                let Some(model) = $entity::find_by_id(id).one(&state.db_conn).await? else {
                    return Err(Error::NotFound(format!("{} not found", stringify!($entity))))
                };

                Ok(Json([<$entity Relations>] {
                    [<$related_from:snake>]: model.find_related($related_from).one(&state.db_conn).await?.unwrap(),
                    [<$related_to:snake>]: model.find_related($related_to).one(&state.db_conn).await?.unwrap(),
                }))
            }

            pub fn router() -> Router<Arc<AppState>> {
                Router::new()
                    .route(concat!("/", stringify!([<$entity:snake>])), get(list).post(create))
                    .route(
                        concat!("/", stringify!([<$entity:snake>]), "/:id-:id"),
                        get(retrieve_by_id)
                            .patch(update_by_id)
                            .delete(delete_by_id),
                    )
                    .route(concat!("/", stringify!([<$entity:snake>]), "/:id-:id/relations"), get(retrieve_relations_by_id))
            }
        }
    };
}

#[macro_export]
macro_rules! table_api {
    ($entity:ident, single: [$($single:ident),*], optional: [$($optional:ident),*], multiple: [$($multiple:ident),*]) => {
        $crate::paste! {
            #[doc = "List " $entity:snake "s"]
            #[utoipa::path(
                get,
                path = concat!("/admin/",stringify!([<$entity:snake>])),
                operation_id = concat!("list_",stringify!([<$entity:snake>]),"s"),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:snake>]),"s successfully"), body = [[<$entity Model>]]),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn list(state: State<Arc<AppState>>) -> Result<Json<Vec<[<$entity Model>]>>> {
                Ok(Json($entity::find().all(&state.db_conn).await?))
            }

            #[doc = "Create " $entity:snake]
            #[utoipa::path(
                post,
                path = concat!("/admin/",stringify!([<$entity:snake>])),
                operation_id = concat!("create_",stringify!([<$entity:snake>])),
                request_body = [<Create $entity Schema>],
                responses(
                    (status = 201, description = concat!("Created ",stringify!([<$entity:snake>])," successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid request body format", body = JsonResponse),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn create(
                state: State<Arc<AppState>>,
                Json(body): Json<[<Create $entity Schema>]>,
            ) -> Result<Json<[<$entity Model>]>> {
                let mut model = body.into_active_model();
                model.id = ActiveValue::Set(Uuid::now_v7());
                model.created_at = model.updated_at.clone();

                Ok(Json(model.insert(&state.db_conn).await?))
            }

            #[doc = "Retrieve " $entity:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/admin/",stringify!([<$entity:snake>]),"/{id}"),
                operation_id = concat!("retrieve_",stringify!([<$entity:snake>]),"_by_id"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:snake>])," by id successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid parameters format", body = JsonResponse),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn retrieve_by_id(
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> Result<CachedJson<[<$entity Model>]>> {
                let cached = state.cache_client.get::<Option<String>, _>(format!("{}:{}", stringify!([<$entity:snake>]), id.simple())).await?;

                if let Some(value) = cached {
                    Ok(CachedJson::Cached(value))
                } else {
                    if let Some(model) = $entity::find_by_id(id).one(&state.db_conn).await? {
                        state.cache_client.set::<(), _, _>(format!("{}:{}", stringify!([<$entity:snake>]), id.simple()), serde_json::to_string(&model)?, None, None, false).await?;
                        Ok(CachedJson::New(Json(model)))
                    } else {
                        Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned()))
                    }
                }
            }

            #[doc = "Update " $entity:snake " by id"]
            #[utoipa::path(
                patch,
                path = concat!("/admin/",stringify!([<$entity:snake>]),"/{id}"),
                operation_id = concat!("update_",stringify!([<$entity:snake>]),"_by_id"),
                request_body = [<Create $entity Schema>],
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Updated ",stringify!([<$entity:snake>])," by id successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid parameters/request body format", body = JsonResponse),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn update_by_id(
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
                Json(body): Json<[<Create $entity Schema>]>,
            ) -> Result<Json<[<$entity Model>]>> {
                let mut model = body.into_active_model();
                model.id = ActiveValue::Set(id);

                let model = model.update(&state.db_conn).await?;

                state.cache_client.del::<(), _>(format!("{}:{}", stringify!([<$entity:snake>]), id.simple())).await?;
                Ok(Json(model))
            }

            #[doc = "Delete " $entity:snake " by id"]
            #[utoipa::path(
                delete,
                path = concat!("/admin/",stringify!([<$entity:snake>]),"/{id}"),
                operation_id = concat!("delete_",stringify!([<$entity:snake>]),"_by_id"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 204, description = concat!("Deleted ",stringify!([<$entity:snake>])," by id successfully")),
                    (status = 400, description = "Invalid parameters format", body = JsonResponse),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn delete_by_id(state: State<Arc<AppState>>, Path(id): Path<Uuid>) -> Result<()> {
                let delete_result = $entity::delete_by_id(id).exec(&state.db_conn).await?;
                if delete_result.rows_affected == 1 {
                    state.cache_client.del::<(), _>(format!("{}:{}", stringify!([<$entity:snake>]), id.simple())).await?;
                    Ok(())
                } else {
                    Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned()))
                }
            }

            #[derive(Clone, Debug, serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
            pub struct [<$entity Relations>] {
                $(pub [<$single:snake>]: [<$single Model>],)*
                $(pub [<$optional:snake>]: Option<[<$optional Model>]>,)*
                $(pub [<$multiple:snake s>]: Vec<[<$multiple Model>]>,)*
            }

            #[doc = "Retrieve " $entity:snake " relations by id"]
            #[utoipa::path(
                get,
                path = concat!("/admin/",stringify!([<$entity:snake>]),"/{id}/relations"),
                operation_id = concat!("retrieve_",stringify!([<$entity:snake>]),"_relations_by_id"),
                params(
                    ("id" = Uuid, Path, description = "Id of entity"),
                ),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:snake>])," relations by id successfully"), body = [<$entity Relations>]),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn retrieve_relations_by_id(
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> Result<Json<[<$entity Relations>]>> {
                let Some(model) = $entity::find_by_id(id).one(&state.db_conn).await? else {
                    return Err(Error::NotFound(format!("{} not found", stringify!($entity))))
                };

                Ok(Json([<$entity Relations>] {
                    $([<$single:snake>]: model.find_related($single).one(&state.db_conn).await?.unwrap(),)*
                    $([<$optional:snake>]: model.find_related($optional).one(&state.db_conn).await?,)*
                    $([<$multiple:snake s>]: model.find_related($multiple).all(&state.db_conn).await?,)*
                }))
            }

            pub fn router() -> Router<Arc<AppState>> {
                Router::new()
                    .route(concat!("/", stringify!([<$entity:snake>])), get(list).post(create))
                    .route(
                        concat!("/", stringify!([<$entity:snake>]), "/:id"),
                        get(retrieve_by_id)
                            .patch(update_by_id)
                            .delete(delete_by_id),
                    )
                    .route(concat!("/", stringify!([<$entity:snake>]), "/:id/relations"), get(retrieve_relations_by_id))
            }
        }
    };
}
