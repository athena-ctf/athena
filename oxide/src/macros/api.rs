macro_rules! list {
    ($entity:ident) => {
        paste::paste! {
            #[doc = "List " $entity:snake "s"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:snake>])),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:snake>]),"s successfully"), body = [[<$entity Model>]]),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn list(state: State<Arc<AppState>>) -> ApiResult<Json<Vec<[<$entity Model>]>>> {
                Ok(Json(db::[<$entity:snake>]::list(&state.db_conn).await?))
            }
        }
    };
}

macro_rules! create {
    ($entity:ident) => {
        paste::paste! {
            #[doc = "Create " $entity]
            #[utoipa::path(
                post,
                path = concat!("/",stringify!([<$entity:snake>])),
                request_body = [<$entity Details>],
                responses(
                    (status = 201, description = concat!("Created ",stringify!([<$entity:snake>])," successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid request body format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn create(
                state: State<Arc<AppState>>,
                Json(body): Json<[<$entity Details>]>,
            ) -> ApiResult<Json<[<$entity Model>]>> {
                Ok(Json(db::[<$entity:snake>]::create(body, &state.db_conn).await?))
            }
        }
    };
}

macro_rules! delete {
    ($entity:ident) => {
        paste::paste! {
            #[doc = "Delete " $entity:snake " by id"]
            #[utoipa::path(
                delete,
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 204, description = concat!("Deleted ",stringify!([<$entity:snake>])," by id successfully")),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn delete_by_id(state: State<Arc<AppState>>, Path(id): Path<Uuid>) -> ApiResult<()> {
                if db::[<$entity:snake>]::delete(
                    id,
                    &state.db_conn,
                    &mut state.redis_client.get().await.unwrap(),
                )
                .await?
                {
                    Ok(())
                } else {
                    Err(ApiError::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned()))
                }
            }
        }
    };
}

macro_rules! retrieve {
    ($entity:ident) => {
        paste::paste!{
            #[doc = "Retrieve " $entity:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:snake>])," by id successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn retrieve_by_id(
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> ApiResult<Json<[<$entity Model>]>> {
                db::[<$entity:snake>]::retrieve(
                    id,
                    &state.db_conn,
                    &mut state.redis_client.get().await.unwrap(),
                )
                .await?
                .map_or_else(
                    || Err(ApiError::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned())),
                    |model| Ok(Json(model)),
                )
            }
        }
    };
}

macro_rules! update {
    ($entity:ident) => {
        paste::paste! {
            #[doc = "Update " $entity:snake " by id"]
            #[utoipa::path(
                patch,
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}"),
                request_body = [<$entity Details>],
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Updated ",stringify!([<$entity:snake>])," by id successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid parameters/request body format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn update_by_id(
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
                Json(body): Json<[<$entity Details>]>,
            ) -> ApiResult<Json<[<$entity Model>]>> {
                Ok(Json(
                    db::[<$entity:snake>]::update(
                        id,
                        body,
                        &state.db_conn,
                        &mut state.redis_client.get().await.unwrap(),
                    )
                    .await?,
                ))
            }
        }
    };
}

macro_rules! optional_relation {
    ($entity:ident, $related:ident) => {
        paste::paste!{
            #[doc = "Retrieve " $entity:snake " " $related:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}/",stringify!([<$related:snake>])),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:snake>]),stringify!([<$related:snake>])," by id successfully"), body = [<$related Model>]),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn [<retrieve_ $related:snake _by_id>](
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> ApiResult<Json<[<$related Model>]>> {
                db::[<$entity:snake>]::[<related_ $related:snake>](id, &state.db_conn)
                    .await?
                    .map_or_else(
                        || Err(ApiError::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned())),
                        |(_, model)| {
                            model
                                .map(Json)
                                .ok_or_else(|| ApiError::NotFound(concat!(stringify!([<$related:snake>])," not found").to_owned()))
                        },
                    )
            }
        }
    };
}

macro_rules! single_relation {
    ($entity:ident, $related:ident) => {
        paste::paste! {
            #[doc = "List " $entity:snake " " $related:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}/",stringify!([<$related:snake>])),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:snake>]),stringify!([<$related:snake>])," by id successfully"), body = [<$related Model>]),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn [<retrieve_ $related:snake _by_id>](
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> ApiResult<Json<[<$related Model>]>> {
                db::[<$entity:snake>]::[<related_ $related:snake>](id, &state.db_conn)
                    .await?
                    .map_or_else(
                        || Err(ApiError::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned())),
                        |(_, model)| Ok(Json(model)),
                    )
            }

        }
    };
}

macro_rules! multiple_relation_with_model {
    ($entity:ident, $related:ident) => {
        paste::paste! {
            #[doc = "List " $entity:snake " " $related:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}/",stringify!([<$related:snake>]),"s"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:snake>]),stringify!([<$related:snake>]),"s by id successfully"), body = [[<$related Model>]]),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn [<list_ $related:snake s_by_id>](
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> ApiResult<Json<Vec<[<$related Model>]>>> {
                let Some(model) = db::[<$entity:snake>]::retrieve(
                    id,
                    &state.db_conn,
                    &mut state.redis_client.get().await.unwrap(),
                )
                .await?
                else {
                    return Err(ApiError::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned()));
                };

                Ok(Json(
                    db::[<$entity:snake>]::[<related_ $related:snake s>](&model, &state.db_conn).await?,
                ))
            }
        }
    };
}

macro_rules! multiple_relation {
    ($entity:ident, $related:ident) => {
        paste::paste! {
            #[doc = "List " $entity:snake " " $related:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}/",stringify!([<$related:snake>]),"s"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:snake>]),stringify!([<$related:snake>]),"s by id successfully"), body = [[<$related Model>]]),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn [<list_ $related:snake s_by_id>](
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> ApiResult<Json<Vec<[<$related Model>]>>> {
                db::[<$entity:snake>]::[<related_ $related:snake s>](id, &state.db_conn)
                    .await?
                    .map_or_else(
                        || Err(ApiError::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned())),
                        |models| Ok(Json(models)),
                    )
            }
        }
    };
}

macro_rules! crud_interface {
    ($entity:ident) => {
        use $crate::macros::api::{create, delete, list, retrieve, update};

        list!($entity);
        create!($entity);
        retrieve!($entity);
        update!($entity);
        delete!($entity);
    };
}

macro_rules! bind_crud_interface {
    ($entity:ident, $related_from_id:literal, $related_to_id:literal) => {
        paste::paste! {
            #[doc = "List " $entity:snake "s"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:snake>])),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:snake>]),"s successfully"), body = [[<$entity Model>]]),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn list(state: State<Arc<AppState>>) -> ApiResult<Json<Vec<[<$entity Model>]>>> {
                Ok(Json(db::[<$entity:snake>]::list(&state.db_conn).await?))
            }

            #[doc = "Create " $entity]
            #[utoipa::path(
                post,
                path = concat!("/",stringify!([<$entity:snake>])),
                request_body = [<$entity Details>],
                responses(
                    (status = 201, description = concat!("Created ",stringify!([<$entity:snake>])," successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid request body format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn create(
                state: State<Arc<AppState>>,
                Json(body): Json<[<$entity Details>]>,
            ) -> ApiResult<Json<[<$entity Model>]>> {
                Ok(Json(db::[<$entity:snake>]::create(body, &state.db_conn).await?))
            }

            #[doc = "Delete " $entity:snake " by id"]
            #[utoipa::path(
                delete,
                path = concat!("/",stringify!([<$entity:snake>]),"/{",$related_from_id,"}-{",$related_to_id,"}"),
                params(
                    ($related_from_id = Uuid, Path, description = "Id of entity"),
                    ($related_to_id = Uuid, Path, description = "Id of entity"),
                ),
                responses(
                    (status = 204, description = concat!("Deleted ",stringify!([<$entity:snake>])," by id successfully")),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn delete_by_id(state: State<Arc<AppState>>, Path(id): Path<(Uuid, Uuid)>) -> ApiResult<()> {
                if db::[<$entity:snake>]::delete(
                    id,
                    &state.db_conn,
                    &mut state.redis_client.get().await.unwrap(),
                )
                .await?
                {
                    Ok(())
                } else {
                    Err(ApiError::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned()))
                }
            }

            #[doc = "Retrieve " $entity:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:snake>]),"/{",$related_from_id,"}-{",$related_to_id,"}"),
                params(
                    ($related_from_id = Uuid, Path, description = "Id of entity"),
                    ($related_to_id = Uuid, Path, description = "Id of entity"),
                ),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:snake>])," by id successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn retrieve_by_id(
                state: State<Arc<AppState>>,
                Path(id): Path<(Uuid, Uuid)>,
            ) -> ApiResult<Json<[<$entity Model>]>> {
                db::[<$entity:snake>]::retrieve(
                    id,
                    &state.db_conn,
                    &mut state.redis_client.get().await.unwrap(),
                )
                .await?
                .map_or_else(
                    || Err(ApiError::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned())),
                    |model| Ok(Json(model)),
                )
            }

            #[doc = "Update " $entity:snake " by id"]
            #[utoipa::path(
                patch,
                path = concat!("/",stringify!([<$entity:snake>]),"/{",$related_from_id,"}-{",$related_to_id,"}"),
                params(
                    ($related_from_id = Uuid, Path, description = "Id of entity"),
                    ($related_to_id = Uuid, Path, description = "Id of entity"),
                ),
                request_body = [<$entity Details>],
                responses(
                    (status = 200, description = concat!("Updated ",stringify!([<$entity:snake>])," by id successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid parameters/request body format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn update_by_id(
                state: State<Arc<AppState>>,
                Path(id): Path<(Uuid, Uuid)>,
                Json(body): Json<[<$entity Details>]>,
            ) -> ApiResult<Json<[<$entity Model>]>> {
                Ok(Json(
                    db::[<$entity:snake>]::update(
                        id,
                        body,
                        &state.db_conn,
                        &mut state.redis_client.get().await.unwrap(),
                    )
                    .await?,
                ))
            }
        }
    };
}

pub(crate) use {
    bind_crud_interface, create, crud_interface, delete, list, multiple_relation,
    multiple_relation_with_model, optional_relation, retrieve, single_relation, update,
};
