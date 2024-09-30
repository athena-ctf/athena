macro_rules! list {
    ($entity:ident) => {
        paste::paste! {
            list!([<$entity:lower>], [<$entity>], [<$entity Model>], [<$entity Details>]);
        }
    };

    ($table_name:ident, $entity:ident, $model:ident, $details:ident) => {
        pub async fn list(db: &DbConn) -> Result<Vec<$model>> {
            Ok($entity::find().all(db).await?)
        }
    };
}

macro_rules! retrieve {
    ($entity:ident) => {
        paste::paste! {
            retrieve!([<$entity:lower>], [<$entity>], [<$entity Model>], [<$entity Details>]);
        }
    };

    ($table_name:ident, $entity:ident, $model:ident, $details:ident) => {
        pub async fn retrieve(
            id: Uuid,
            db: &DbConn,
            client: &mut PooledConnection<'_, RedisConnectionManager>,
        ) -> Result<Option<$model>> {
            let value: CachedValue<$model> = client
                .get(format!("{}:{id}", stringify!($table_name)))
                .await?;

            if let CachedValue::Hit(value) = value {
                Ok(Some(value))
            } else {
                let Some(model) = $entity::find_by_id(id).one(db).await? else {
                    return Ok(None);
                };

                client
                    .set::<_, _, ()>(
                        format!("{}:{id}", stringify!($table_name)),
                        &serde_json::to_vec(&model)?,
                    )
                    .await?;

                Ok(Some(model))
            }
        }
    };
}

macro_rules! update {
    ($entity:ident) => {
        paste::paste! {
            update!([<$entity:lower>], [<$entity>], [<$entity Model>], [<$entity Details>]);
        }
    };

    ($table_name:ident, $entity:ident, $model:ident, $details:ident) => {
        pub async fn update(
            id: Uuid,
            details: $details,
            db: &DbConn,
            client: &mut PooledConnection<'_, RedisConnectionManager>,
        ) -> Result<$model> {
            let model = details.into_active_model();

            let model = $entity::update(model)
                .filter(entity::$table_name::Column::Id.eq(id))
                .exec(db)
                .await?;

            client
                .del::<_, ()>(format!("{}:{id}", stringify!($table_name)))
                .await?;

            Ok(model)
        }
    };
}

macro_rules! delete {
    ($entity:ident) => {
        paste::paste! {
            delete!([<$entity:lower>], [<$entity>], [<$entity Model>], [<$entity Details>]);
        }
    };

    ($table_name:ident, $entity:ident, $model:ident, $details:ident) => {
        pub async fn delete(
            id: Uuid,
            db: &DbConn,
            client: &mut PooledConnection<'_, RedisConnectionManager>,
        ) -> Result<bool> {
            let delete_result = $entity::delete_by_id(id).exec(db).await?;

            client
                .del::<_, ()>(format!("{}:{id}", stringify!($table_name)))
                .await?;
            Ok(delete_result.rows_affected == 1)
        }
    };
}

macro_rules! create {
    ($entity:ident) => {
        paste::paste! {
            create!([<$entity:lower>], [<$entity>], [<$entity Model>], [<$entity Details>]);
        }
    };

    ($table_name:ident, $entity:ident, $model:ident, $details:ident) => {
        pub async fn create(details: $details, db: &DbConn) -> Result<$model> {
            let mut model = details.into_active_model();
            model.id = ActiveValue::Set(Uuid::now_v7());
            model.date_created = ActiveValue::Set(Utc::now().naive_utc());

            Ok(model.insert(db).await?)
        }
    };
}

macro_rules! crud_interface {
    ($entity:ident) => {
        use $crate::macros::db::{create, delete, list, retrieve, update};

        list!($entity);
        retrieve!($entity);
        update!($entity);
        delete!($entity);
        create!($entity);
    };
}

// TODO: create macros for binding table crud interface
macro_rules! bind_crud_interface {
    ($entity:ident) => {};
}

macro_rules! single_relation {
    ($base:ident, $related:ident) => {
        paste::paste! {
            pub async fn [<related_ $related:lower>](
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
                    Err(AthenaError::Db(DbErr::Custom("Invalid values".to_owned())))
                }
            }
        }
    };
}

macro_rules! optional_relation {
    ($base:ident, $related:ident) => {
        paste::paste! {
            pub async fn [<related_ $related:lower>](
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

macro_rules! multiple_relation {
    ($base:ident, $related:ident) => {
        paste::paste! {
            pub async fn [<related_ $related:lower s>](
                model: &[<$base Model>],
                db: &DbConn,
            ) -> Result<Vec<[<$related Model>]>> {
                Ok(model.find_related($related).all(db).await?)
            }
        }
    };
}

macro_rules! multiple_relation_with_id {
    ($base:ident, $related:ident) => {
        paste::paste! {
            pub async fn [<related_ $related:lower s>](
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

pub(crate) use {
    create, crud_interface, delete, list, multiple_relation, multiple_relation_with_id,
    optional_relation, retrieve, single_relation, update,
};
