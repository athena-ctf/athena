#[macro_export]
macro_rules! list_db {
    ($entity:ident) => {
        $crate::paste! {
            pub async fn list(db: &DbConn) -> Result<Vec<[<$entity Model>]>> {
                Ok($entity::find().all(db).await?)
            }
        }
    };
}

#[macro_export]
macro_rules! retrieve_db {
    ($entity:ident) => {
        $crate::paste! {
            pub async fn retrieve(
                id: Uuid,
                db: &DbConn,
            ) -> Result<Option<[<$entity Model>]>> {
                let Some(model) = $entity::find_by_id(id).one(db).await? else {
                    return Ok(None);
                };

                Ok(Some(model))
            }
        }
    };
}

#[macro_export]
macro_rules! update_db {
    ($entity:ident) => {
        $crate::paste! {
            pub async fn update(
                id: Uuid,
                details: [<Create $entity Schema>],
                db: &DbConn,
            ) -> Result<[<$entity Model>]> {
                let mut model = details.into_active_model();
                model.id = ActiveValue::Set(id);

                let model = $entity::update(model)
                    .exec(db)
                    .await?;

                Ok(model)
            }
        }
    };
}

#[macro_export]
macro_rules! delete_db {
    ($entity:ident) => {
        $crate::paste! {
            pub async fn delete(
                id: Uuid,
                db: &DbConn,
            ) -> Result<bool> {
                let delete_result = $entity::delete_by_id(id).exec(db).await?;
                Ok(delete_result.rows_affected == 1)
            }
        }
    };
}

#[macro_export]
macro_rules! create_db {
    ($entity:ident) => {
        $crate::paste! {
            pub async fn create(details: [<Create $entity Schema>], db: &DbConn) -> Result<[<$entity Model>]> {
                let mut model = details.into_active_model();
                model.id = ActiveValue::Set(Uuid::now_v7());
                model.created_at = model.updated_at.clone();

                Ok(model.insert(db).await?)
            }
        }
    };
}

#[macro_export]
macro_rules! crud_interface_db {
    ($entity:ident) => {
        use $crate::{create_db, delete_db, list_db, retrieve_db, update_db};

        list_db!($entity);
        retrieve_db!($entity);
        update_db!($entity);
        delete_db!($entity);
        create_db!($entity);
    };
}

#[macro_export]
macro_rules! join_crud_interface_db {
    ($entity:ident, $related_from:ident, $related_to:ident) => {
        $crate::paste! {
            pub async fn list(db: &DbConn) -> Result<Vec<[<$entity Model>]>> {
                Ok($entity::find().all(db).await?)
            }

            pub async fn retrieve(
                ([<$related_from:snake _id>], [<$related_to:snake _id>]): (Uuid, Uuid),
                db: &DbConn,
            ) -> Result<Option<[<$entity Model>]>> {
                let Some(model) = $entity::find_by_id(([<$related_from:snake _id>], [<$related_to:snake _id>])).one(db).await? else {
                    return Ok(None);
                };

                Ok(Some(model))
            }

            pub async fn update(
                ([<$related_from:snake _id>], [<$related_to:snake _id>]): (Uuid, Uuid),
                details: [<Create $entity Schema>],
                db: &DbConn,
            ) -> Result<[<$entity Model>]> {
                let mut model = details.into_active_model();
                model.[<$related_from:snake _id>] = ActiveValue::Set([<$related_from:snake _id>]);
                model.[<$related_to:snake _id>] = ActiveValue::Set([<$related_to:snake _id>]);

                let model = $entity::update(model)
                    .exec(db)
                    .await?;

                Ok(model)
            }

            pub async fn delete(
                ([<$related_from:snake _id>], [<$related_to:snake _id>]): (Uuid, Uuid),
                db: &DbConn,
            ) -> Result<bool> {
                let delete_result = $entity::delete_by_id(([<$related_from:snake _id>], [<$related_to:snake _id>])).exec(db).await?;
                Ok(delete_result.rows_affected == 1)
            }

            pub async fn create(details: [<Create $entity Schema>], db: &DbConn) -> Result<[<$entity Model>]> {
                let mut model = details.into_active_model();
                model.created_at = ActiveValue::Set(Utc::now().naive_utc());
                model.updated_at = ActiveValue::Set(Utc::now().naive_utc());

                Ok(model.insert(db).await?)
            }
        }
    };
}

#[macro_export]
macro_rules! single_relation_db {
    ($base:ident, $related:ident) => {
        $crate::paste! {
            pub async fn [<related_ $related:snake>](
                id: Uuid,
                db: &DbConn,
            ) -> Result<Option<([<$base Model>], [<$related Model>])>> {
                let model = $base::find_by_id(id)
                    .find_also_related($related)
                    .one(db)
                    .await?;

                if model.is_none() {
                    Ok(None)
                } else if let Some((model, Some(related_model))) = model {
                    Ok(Some((model, related_model)))
                } else {
                    Err(Error::Db(DbErr::Custom("Invalid values".to_owned())))
                }
            }
        }
    };
}

#[macro_export]
macro_rules! optional_relation_db {
    ($base:ident, $related:ident) => {
        $crate::paste! {
            pub async fn [<related_ $related:snake>](
                id: Uuid,
                db: &DbConn,
            ) -> Result<Option<([<$base Model>], Option<[<$related Model>]>)>> {
                Ok($base::find_by_id(id)
                    .find_also_related($related)
                    .one(db)
                    .await?)
            }
        }
    };
}

#[macro_export]
macro_rules! multiple_relation_with_model_db {
    ($base:ident, $related:ident) => {
        $crate::paste! {
            pub async fn [<related_ $related:snake s>](
                model: &[<$base Model>],
                db: &DbConn,
            ) -> Result<Vec<[<$related Model>]>> {
                Ok(model.find_related($related).all(db).await?)
            }
        }
    };
}

#[macro_export]
macro_rules! multiple_relation_db {
    ($base:ident, $related:ident) => {
        $crate::paste! {
            pub async fn [<related_ $related:snake s>](
                id: Uuid,
                db: &DbConn,
            ) -> Result<Option<Vec<[<$related Model>]>>> {
                if let Some(model) = $base::find_by_id(id).one(db).await? {
                    Ok(Some(model.find_related($related).all(db).await?))
                } else {
                    Ok(None)
                }
            }
        }
    };
}

#[macro_export]
macro_rules! list_api {
    ($entity:ident) => {
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
                Ok(Json(db::[<$entity:snake>]::list(&state.db_conn).await?))
            }
        }
    };
}

#[macro_export]
macro_rules! create_api {
    ($entity:ident) => {
        $crate::paste! {
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
                Ok(Json(db::[<$entity:snake>]::create(body, &state.db_conn).await?))
            }
        }
    };
}

#[macro_export]
macro_rules! delete_api {
    ($entity:ident) => {
        $crate::paste! {
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
                if db::[<$entity:snake>]::delete(
                    id,
                    &state.db_conn,
                )
                .await?
                {
                    state.cache_pool.del::<(), _>(format!("{}:{}", stringify!([<$entity:snake>]), id)).await?;
                    Ok(())
                } else {
                    Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned()))
                }
            }
        }
    };
}

#[macro_export]
macro_rules! retrieve_api {
    ($entity:ident) => {
        $crate::paste!{
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
                let cached = state.cache_pool.get::<Option<String>, _>(format!("{}:{}", stringify!([<$entity:snake>]), id)).await?;

                if let Some(value) = cached {
                    Ok(CachedJson::Cached(value))
                } else {
                    if let Some(model) = db::[<$entity:snake>]::retrieve(id, &state.db_conn).await? {
                        state.cache_pool.set::<(), _, _>(format!("{}:{}", stringify!([<$entity:snake>]), id), serde_json::to_string(&model)?, None, None, false).await?;
                        Ok(CachedJson::New(Json(model)))
                    } else {
                        Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned()))
                    }
                }
            }
        }
    };
}

#[macro_export]
macro_rules! update_api {
    ($entity:ident) => {
        $crate::paste! {
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
                let model = db::[<$entity:snake>]::update(id, body, &state.db_conn).await?;
                state.cache_pool.del::<(), _>(format!("{}:{}", stringify!([<$entity:snake>]), id)).await?;
                Ok(Json(model))
            }
        }
    };
}

#[macro_export]
macro_rules! optional_relation_api {
    ($entity:ident, $related:ident) => {
        $crate::paste!{
            #[doc = "Retrieve " $entity:snake " " $related:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/admin/",stringify!([<$entity:snake>]),"/{id}/",stringify!([<$related:snake>])),
                operation_id = concat!("retrieve_",stringify!([<$entity:snake>]),"_",stringify!([<$related:snake>]),"_by_id"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:snake>]),stringify!([<$related:snake>])," by id successfully"), body = [<$related Model>]),
                    (status = 400, description = "Invalid parameters format", body = JsonResponse),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn [<retrieve_ $related:snake _by_id>](
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> Result<Json<[<$related Model>]>> {
                db::[<$entity:snake>]::[<related_ $related:snake>](id, &state.db_conn)
                    .await?
                    .map_or_else(
                        || Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned())),
                        |(_, model)| {
                            model
                                .map(Json)
                                .ok_or_else(|| Error::NotFound(concat!(stringify!([<$related:snake>])," not found").to_owned()))
                        },
                    )
            }
        }
    };
}

#[macro_export]
macro_rules! single_relation_api {
    ($entity:ident, $related:ident) => {
        $crate::paste! {
            #[doc = "List " $entity:snake " " $related:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/admin/",stringify!([<$entity:snake>]),"/{id}/",stringify!([<$related:snake>])),
                operation_id = concat!("retrieve_",stringify!([<$entity:snake>]),"_",stringify!([<$related:snake>]),"_by_id"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Retrieved ",stringify!([<$entity:snake>]),stringify!([<$related:snake>])," by id successfully"), body = [<$related Model>]),
                    (status = 400, description = "Invalid parameters format", body = JsonResponse),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn [<retrieve_ $related:snake _by_id>](
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> Result<Json<[<$related Model>]>> {
                db::[<$entity:snake>]::[<related_ $related:snake>](id, &state.db_conn)
                    .await?
                    .map_or_else(
                        || Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned())),
                        |(_, model)| Ok(Json(model)),
                    )
            }

        }
    };
}

#[macro_export]
macro_rules! multiple_relation_with_model_api {
    ($entity:ident, $related:ident) => {
        $crate::paste! {
            #[doc = "List " $entity:snake " " $related:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/admin/",stringify!([<$entity:snake>]),"/{id}/",stringify!([<$related:snake>]),"s"),
                operation_id = concat!("list_",stringify!([<$entity:snake>]),"_",stringify!([<$related:snake>]),"s_by_id"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:snake>]),stringify!([<$related:snake>]),"s by id successfully"), body = [[<$related Model>]]),
                    (status = 400, description = "Invalid parameters format", body = JsonResponse),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn [<list_ $related:snake s_by_id>](
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> Result<Json<Vec<[<$related Model>]>>> {
                let Some(model) = db::[<$entity:snake>]::retrieve(
                    id,
                    &state.db_conn,
                )
                .await?
                else {
                    return Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned()));
                };

                Ok(Json(
                    db::[<$entity:snake>]::[<related_ $related:snake s>](&model, &state.db_conn).await?,
                ))
            }
        }
    };
}

#[macro_export]
macro_rules! multiple_relation_api {
    ($entity:ident, $related:ident) => {
        $crate::paste! {
            #[doc = "List " $entity:snake " " $related:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/admin/",stringify!([<$entity:snake>]),"/{id}/",stringify!([<$related:snake>]),"s"),
                operation_id = concat!("list_",stringify!([<$entity:snake>]),"_",stringify!([<$related:snake>]),"s_by_id"),
                params(("id" = Uuid, Path, description = "Id of entity")),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:snake>]),stringify!([<$related:snake>]),"s by id successfully"), body = [[<$related Model>]]),
                    (status = 400, description = "Invalid parameters format", body = JsonResponse),
                    (status = 401, description = "Action is permissible after login", body = JsonResponse),
                    (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                    (status = 404, description = concat!("No ",stringify!([<$entity:snake>])," found with specified id"), body = JsonResponse),
                    (status = 500, description = "Unexpected error", body = JsonResponse)
                )
            )]
            pub async fn [<list_ $related:snake s_by_id>](
                state: State<Arc<AppState>>,
                Path(id): Path<Uuid>,
            ) -> Result<Json<Vec<[<$related Model>]>>> {
                db::[<$entity:snake>]::[<related_ $related:snake s>](id, &state.db_conn)
                    .await?
                    .map_or_else(
                        || Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned())),
                        |models| Ok(Json(models)),
                    )
            }
        }
    };
}

#[macro_export]
macro_rules! crud_interface_api {
    ($entity:ident) => {
        use $crate::{create_api, delete_api, list_api, retrieve_api, update_api};

        list_api!($entity);
        create_api!($entity);
        retrieve_api!($entity);
        update_api!($entity);
        delete_api!($entity);
    };
}

#[macro_export]
macro_rules! join_crud_interface_api {
    ($entity:ident, $related_from_id:literal, $related_to_id:literal) => {
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
                Ok(Json(db::[<$entity:snake>]::list(&state.db_conn).await?))
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
                Ok(Json(db::[<$entity:snake>]::create(body, &state.db_conn).await?))
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
                if db::[<$entity:snake>]::delete(
                    id,
                    &state.db_conn,
                )
                .await?
                {
                    state.cache_pool.del::<(), _>(format!("{}:{}:{}", stringify!([<$entity:snake>]), id.0, id.1)).await?;
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
                let value = state.cache_pool.get::<Option<String>, _>(format!("{}:{}:{}", stringify!([<$entity:snake>]), id.0, id.1)).await?;
                if let Some(cached) = value {
                    Ok(CachedJson::Cached(cached))
                } else {
                    if let Some(model) = db::[<$entity:snake>]::retrieve(id, &state.db_conn).await? {
                        state.cache_pool.set::<(), _, _>(format!("{}:{}:{}", stringify!([<$entity:snake>]), id.0, id.1), serde_json::to_string(&model)?, None, None, false).await?;
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
                let model = db::[<$entity:snake>]::update(id, body, &state.db_conn).await?;
                state.cache_pool.del::<(), _>(format!("{}:{}:{}", stringify!([<$entity:snake>]), id.0, id.1)).await?;
                Ok(Json(model))
            }
        }
    };
}
