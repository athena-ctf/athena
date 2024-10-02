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
                client: &mut PooledConnection<'_, RedisConnectionManager>,
            ) -> Result<Option<[<$entity Model>]>> {
                let value: CachedValue<[<$entity Model>]> = client
                    .get(format!("{}:{id}", stringify!([<$entity:snake>])))
                    .await?;

                if let CachedValue::Hit(value) = value {
                    Ok(Some(value))
                } else {
                    let Some(model) = $entity::find_by_id(id).one(db).await? else {
                        return Ok(None);
                    };

                    client
                        .set::<_, _, ()>(
                            format!("{}:{id}", stringify!([<$entity:snake>])),
                            &serde_json::to_vec(&model)?,
                        )
                        .await?;

                    Ok(Some(model))
                }
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
                details: [<$entity Details>],
                db: &DbConn,
                client: &mut PooledConnection<'_, RedisConnectionManager>,
            ) -> Result<[<$entity Model>]> {
                let mut model = details.into_active_model();
                model.id = ActiveValue::Set(id);

                let model = $entity::update(model)
                    .exec(db)
                    .await?;

                client
                    .del::<_, ()>(format!("{}:{id}", stringify!([<$entity:snake>])))
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
                client: &mut PooledConnection<'_, RedisConnectionManager>,
            ) -> Result<bool> {
                let delete_result = $entity::delete_by_id(id).exec(db).await?;

                client
                    .del::<_, ()>(format!("{}:{id}", stringify!([<$entity:snake>])))
                    .await?;
                Ok(delete_result.rows_affected == 1)
            }
        }
    };
}

#[macro_export]
macro_rules! create_db {
    ($entity:ident) => {
        $crate::paste! {
            pub async fn create(details: [<$entity Details>], db: &DbConn) -> Result<[<$entity Model>]> {
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
macro_rules! bind_crud_interface_db {
    ($entity:ident, $related_from:ident, $related_to:ident) => {
        $crate::paste! {
            pub async fn list(db: &DbConn) -> Result<Vec<[<$entity Model>]>> {
                Ok($entity::find().all(db).await?)
            }

            pub async fn retrieve(
                ([<$related_from:snake _id>], [<$related_to:snake _id>]): (Uuid, Uuid),
                db: &DbConn,
                client: &mut PooledConnection<'_, RedisConnectionManager>,
            ) -> Result<Option<[<$entity Model>]>> {
                let value: CachedValue<[<$entity Model>]> = client
                    .get(format!("{}:{}:{}", stringify!([<$entity:snake>]), [<$related_from:snake _id>], [<$related_to:snake _id>]))
                    .await?;

                if let CachedValue::Hit(value) = value {
                    Ok(Some(value))
                } else {
                    let Some(model) = $entity::find_by_id(([<$related_from:snake _id>], [<$related_to:snake _id>])).one(db).await? else {
                        return Ok(None);
                    };

                    client
                        .set::<_, _, ()>(
                            format!("{}:{}:{}", stringify!([<$entity:snake>]), [<$related_from:snake _id>], [<$related_to:snake _id>]),
                            &serde_json::to_vec(&model)?,
                        )
                        .await?;

                    Ok(Some(model))
                }
            }

            pub async fn update(
                ([<$related_from:snake _id>], [<$related_to:snake _id>]): (Uuid, Uuid),
                details: [<$entity Details>],
                db: &DbConn,
                client: &mut PooledConnection<'_, RedisConnectionManager>,
            ) -> Result<[<$entity Model>]> {
                let mut model = details.into_active_model();
                model.[<$related_from:snake _id>] = ActiveValue::Set([<$related_from:snake _id>]);
                model.[<$related_to:snake _id>] = ActiveValue::Set([<$related_to:snake _id>]);

                let model = $entity::update(model)
                    .exec(db)
                    .await?;

                client
                    .del::<_, ()>(format!("{}:{}:{}", stringify!([<$entity:snake>]), [<$related_from:snake _id>], [<$related_to:snake _id>]))
                    .await?;

                Ok(model)
            }

            pub async fn delete(
                ([<$related_from:snake _id>], [<$related_to:snake _id>]): (Uuid, Uuid),
                db: &DbConn,
                client: &mut PooledConnection<'_, RedisConnectionManager>,
            ) -> Result<bool> {
                let delete_result = $entity::delete_by_id(([<$related_from:snake _id>], [<$related_to:snake _id>])).exec(db).await?;

                client
                    .del::<_, ()>(format!("{}:{}:{}", stringify!([<$entity:snake>]), [<$related_from:snake _id>], [<$related_to:snake _id>]))
                    .await?;
                Ok(delete_result.rows_affected == 1)
            }

            pub async fn create(details: [<$entity Details>], db: &DbConn) -> Result<[<$entity Model>]> {
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
                path = concat!("/",stringify!([<$entity:snake>])),
                operation_id = concat!("list_",stringify!([<$entity:snake>]),"s"),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:snake>]),"s successfully"), body = [[<$entity Model>]]),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
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
                path = concat!("/",stringify!([<$entity:snake>])),
                operation_id = concat!("create_",stringify!([<$entity:snake>])),
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
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}"),
                operation_id = concat!("delete_",stringify!([<$entity:snake>]),"_by_id"),
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
            pub async fn delete_by_id(state: State<Arc<AppState>>, Path(id): Path<Uuid>) -> Result<()> {
                if db::[<$entity:snake>]::delete(
                    id,
                    &state.db_conn,
                    &mut state.cache_client.get().await.unwrap(),
                )
                .await?
                {
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
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}"),
                operation_id = concat!("retrieve_",stringify!([<$entity:snake>]),"_by_id"),
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
            ) -> Result<Json<[<$entity Model>]>> {
                db::[<$entity:snake>]::retrieve(
                    id,
                    &state.db_conn,
                    &mut state.cache_client.get().await.unwrap(),
                )
                .await?
                .map_or_else(
                    || Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned())),
                    |model| Ok(Json(model)),
                )
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
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}"),
                operation_id = concat!("update_",stringify!([<$entity:snake>]),"_by_id"),
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
            ) -> Result<Json<[<$entity Model>]>> {
                Ok(Json(
                    db::[<$entity:snake>]::update(
                        id,
                        body,
                        &state.db_conn,
                        &mut state.cache_client.get().await.unwrap(),
                    )
                    .await?,
                ))
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
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}/",stringify!([<$related:snake>])),
                operation_id = concat!("retrieve_",stringify!([<$entity:snake>]),"_",stringify!([<$related:snake>]),"_by_id"),
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
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}/",stringify!([<$related:snake>])),
                operation_id = concat!("retrieve_",stringify!([<$entity:snake>]),"_",stringify!([<$related:snake>]),"_by_id"),
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
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}/",stringify!([<$related:snake>]),"s"),
                operation_id = concat!("list_",stringify!([<$entity:snake>]),"_",stringify!([<$related:snake>]),"s_by_id"),
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
            ) -> Result<Json<Vec<[<$related Model>]>>> {
                let Some(model) = db::[<$entity:snake>]::retrieve(
                    id,
                    &state.db_conn,
                    &mut state.cache_client.get().await.unwrap(),
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
                path = concat!("/",stringify!([<$entity:snake>]),"/{id}/",stringify!([<$related:snake>]),"s"),
                operation_id = concat!("list_",stringify!([<$entity:snake>]),"_",stringify!([<$related:snake>]),"s_by_id"),
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
macro_rules! bind_crud_interface_api {
    ($entity:ident, $related_from_id:literal, $related_to_id:literal) => {
        $crate::paste! {
            #[doc = "List " $entity:snake "s"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:snake>])),
                operation_id = concat!("list_",stringify!([<$entity:snake>]),"s"),
                responses(
                    (status = 200, description = concat!("Listed ",stringify!([<$entity:snake>]),"s successfully"), body = [[<$entity Model>]]),
                    (status = 401, description = "Action is permissible after login", body = ErrorModel),
                    (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
                    (status = 500, description = "Unexpected error", body = ErrorModel)
                )
            )]
            pub async fn list(state: State<Arc<AppState>>) -> Result<Json<Vec<[<$entity Model>]>>> {
                Ok(Json(db::[<$entity:snake>]::list(&state.db_conn).await?))
            }

            #[doc = "Create " $entity]
            #[utoipa::path(
                post,
                path = concat!("/",stringify!([<$entity:snake>])),
                operation_id = concat!("create_",stringify!([<$entity:snake>])),
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
            ) -> Result<Json<[<$entity Model>]>> {
                Ok(Json(db::[<$entity:snake>]::create(body, &state.db_conn).await?))
            }

            #[doc = "Delete " $entity:snake " by id"]
            #[utoipa::path(
                delete,
                path = concat!("/",stringify!([<$entity:snake>]),"/{",$related_from_id,"}-{",$related_to_id,"}"),
                operation_id = concat!("delete_",stringify!([<$entity:snake>]),"_by_id"),
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
            pub async fn delete_by_id(state: State<Arc<AppState>>, Path(id): Path<(Uuid, Uuid)>) -> Result<()> {
                if db::[<$entity:snake>]::delete(
                    id,
                    &state.db_conn,
                    &mut state.cache_client.get().await.unwrap(),
                )
                .await?
                {
                    Ok(())
                } else {
                    Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned()))
                }
            }

            #[doc = "Retrieve " $entity:snake " by id"]
            #[utoipa::path(
                get,
                path = concat!("/",stringify!([<$entity:snake>]),"/{",$related_from_id,"}-{",$related_to_id,"}"),
                operation_id = concat!("retrieve_",stringify!([<$entity:snake>]),"_by_id"),
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
            ) -> Result<Json<[<$entity Model>]>> {
                db::[<$entity:snake>]::retrieve(
                    id,
                    &state.db_conn,
                    &mut state.cache_client.get().await.unwrap(),
                )
                .await?
                .map_or_else(
                    || Err(Error::NotFound(concat!(stringify!([<$entity:snake>])," not found").to_owned())),
                    |model| Ok(Json(model)),
                )
            }

            #[doc = "Update " $entity:snake " by id"]
            #[utoipa::path(
                patch,
                path = concat!("/",stringify!([<$entity:snake>]),"/{",$related_from_id,"}-{",$related_to_id,"}"),
                operation_id = concat!("update_",stringify!([<$entity:snake>]),"_by_id"),
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
            ) -> Result<Json<[<$entity Model>]>> {
                Ok(Json(
                    db::[<$entity:snake>]::update(
                        id,
                        body,
                        &state.db_conn,
                        &mut state.cache_client.get().await.unwrap(),
                    )
                    .await?,
                ))
            }
        }
    };
}
