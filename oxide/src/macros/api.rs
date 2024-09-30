macro_rules! list {
    ($entity:ident) => {
        paste::paste! {
            #[doc = "List " $entity:lower "s"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:lower>])),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:lower>]),"s successfully"), body = [[<$entity Model>]]),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn list(state: State<Arc<AppState>>) -> ApiResult<Json<Vec<[<$entity Model>]>>> {
                Ok(Json(db::[<$entity:lower>]::list(&state.db_conn).await?))
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
                path = concat!("/",stringify!([<$entity:lower>])),
                request_body = [<$entity Details>],
                responses(
                    (status = 201, description = concat!("Created ",stringify!([<$entity:lower>])," successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid request body format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:lower>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn create(
                state: State<Arc<AppState>>,
                Json(body): Json<[<$entity Details>]>,
            ) -> ApiResult<Json<[<$entity Model>]>> {
                Ok(Json(db::[<$entity:lower>]::create(body, &state.db_conn).await?))
            }
        }
    };
}

macro_rules! delete {
    ($entity:ident) => {
        paste::paste! {
            #[doc = "Delete " $entity:lower " by id"]
            #[utoipa::path(
                delete,
                path = concat!("/",stringify!([<$entity:lower>]),"/{id}"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 204, description = concat!("Deleted ",stringify!([<$entity:lower>])," by id successfully")),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:lower>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn delete_by_id(state: State<Arc<AppState>>, Path(id): Path<Uuid>) -> ApiResult<()> {
                if db::[<$entity:lower>]::delete(
                    id,
                    &state.db_conn,
                    &mut state.redis_client.get().await.unwrap(),
                )
                .await?
                {
                    Ok(())
                } else {
                    Err(ApiError::NotFound(concat!(stringify!([<$entity:lower>])," not found").to_owned()))
                }
            }
        }
    };
}

macro_rules! retrieve {
    ($entity:ident) => {
        paste::paste!{
            #[doc = "Retrieve " $entity:lower " by id"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:lower>]),"/{id}"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:lower>])," by id successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:lower>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn retrieve_by_id(
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> ApiResult<Json<[<$entity Model>]>> {
                db::[<$entity:lower>]::retrieve(
                    id,
                    &state.db_conn,
                    &mut state.redis_client.get().await.unwrap(),
                )
                .await?
                .map_or_else(
                    || Err(ApiError::NotFound(concat!(stringify!([<$entity:lower>])," not found").to_owned())),
                    |model| Ok(Json(model)),
                )
            }
        }
    };
}

macro_rules! update {
    ($entity:ident) => {
        paste::paste! {
            #[doc = "Update " $entity:lower " by id"]
            #[utoipa::path(
                patch,
                path = concat!("/",stringify!([<$entity:lower>]),"/{id}"),
                request_body = [<$entity Details>],
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Updated ",stringify!([<$entity:lower>])," by id successfully"), body = [<$entity Model>]),
                    (status = 400, description = "Invalid parameters/request body format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:lower>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn update_by_id(
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
                Json(body): Json<[<$entity Details>]>,
            ) -> ApiResult<Json<[<$entity Model>]>> {
                Ok(Json(
                    db::[<$entity:lower>]::update(
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
            #[doc = "Retrieve " $entity:lower " " $related:lower " by id"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:lower>]),"/{id}/",stringify!([<$related:lower>])),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:lower>]),stringify!([<$related:lower>])," by id successfully"), body = [<$related Model>]),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:lower>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn [<retrieve_ $related:lower _by_id>](
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> ApiResult<Json<[<$related Model>]>> {
                db::[<$entity:lower>]::[<related_ $related:lower>](id, &state.db_conn)
                    .await?
                    .map_or_else(
                        || Err(ApiError::NotFound(concat!(stringify!([<$entity:lower>])," not found").to_owned())),
                        |(_, model)| {
                            model
                                .map(Json)
                                .ok_or_else(|| ApiError::NotFound(concat!(stringify!([<$related:lower>])," not found").to_owned()))
                        },
                    )
            }
        }
    };
}

macro_rules! single_relation {
    ($entity:ident, $related:ident) => {
        paste::paste! {
            #[doc = "List " $entity:lower " " $related:lower " by id"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:lower>]),"/{id}/",stringify!([<$related:lower>])),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:lower>]),stringify!([<$related:lower>])," by id successfully"), body = [<$related Model>]),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:lower>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn [<retrieve_ $related:lower _by_id>](
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> ApiResult<Json<[<$related Model>]>> {
                db::[<$entity:lower>]::[<related_ $related:lower>](id, &state.db_conn)
                    .await?
                    .map_or_else(
                        || Err(ApiError::NotFound(concat!(stringify!([<$entity:lower>])," not found").to_owned())),
                        |(_, model)| Ok(Json(model)),
                    )
            }

        }
    };
}

macro_rules! multiple_relation_with_model {
    ($entity:ident, $related:ident) => {
        paste::paste! {
            #[doc = "List " $entity:lower " " $related:lower " by id"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:lower>]),"/{id}/",stringify!([<$related:lower>]),"s"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:lower>]),stringify!([<$related:lower>]),"s by id successfully"), body = [[<$related Model>]]),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:lower>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn [<list_ $related:lower s_by_id>](
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> ApiResult<Json<Vec<[<$related Model>]>>> {
                let Some(model) = db::[<$entity:lower>]::retrieve(
                    id,
                    &state.db_conn,
                    &mut state.redis_client.get().await.unwrap(),
                )
                .await?
                else {
                    return Err(ApiError::NotFound(concat!(stringify!([<$entity:lower>])," not found").to_owned()));
                };

                Ok(Json(
                    db::[<$entity:lower>]::[<related_ $related:lower s>](&model, &state.db_conn).await?,
                ))
            }
        }
    };
}

macro_rules! multiple_relation {
    ($entity:ident, $related:ident) => {
        paste::paste! {
            #[doc = "List " $entity:lower " " $related:lower " by id"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:lower>]),"/{id}/",stringify!([<$related:lower>]),"s"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:lower>]),stringify!([<$related:lower>]),"s by id successfully"), body = [[<$related Model>]]),
                    (status = 400, description = "Invalid parameters format", body = ErrorModel),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 404, description = concat!("No ",stringify!([<$entity:lower>])," found with specified id"), body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn [<list_ $related:lower s_by_id>](
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> ApiResult<Json<Vec<[<$related Model>]>>> {
                db::[<$entity:lower>]::[<related_ $related:lower s>](id, &state.db_conn)
                    .await?
                    .map_or_else(
                        || Err(ApiError::NotFound(concat!(stringify!([<$entity:lower>])," not found").to_owned())),
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

pub(crate) use {
    create, crud_interface, delete, list, multiple_relation, multiple_relation_with_model,
    optional_relation, retrieve, single_relation, update,
};
