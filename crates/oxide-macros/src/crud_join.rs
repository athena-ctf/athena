use proc_macro::TokenStream;
use quote::{format_ident, quote, ToTokens};
use syn::parse::{Parse, ParseStream};
use syn::{parse_macro_input, Block, Ident, Token};

struct JoinCrudMacroInput {
    entity: Ident,
    related_from: Ident,
    related_to: Ident,
    on_update_hook: Option<Block>,
    on_delete_hook: Option<Block>,
}

impl Parse for JoinCrudMacroInput {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let entity = input.parse::<Ident>()?;
        input.parse::<Token![,]>()?;

        let related_from: Ident = input.parse()?;
        input.parse::<Token![,]>()?;

        let related_to: Ident = input.parse()?;

        let mut macro_input = Self {
            entity,
            related_from,
            related_to,
            on_delete_hook: None,
            on_update_hook: None,
        };

        while !input.is_empty()
            && (macro_input.on_delete_hook.is_none() || macro_input.on_update_hook.is_none())
        {
            input.parse::<Token![,]>()?;

            let hook_fn = input.parse::<Ident>()?;
            input.parse::<Token![:]>()?;

            match hook_fn.to_string().as_str() {
                "on_delete" if macro_input.on_delete_hook.is_none() => {
                    macro_input.on_delete_hook = Some(input.parse::<Block>()?);
                }
                "on_update" if macro_input.on_update_hook.is_none() => {
                    macro_input.on_update_hook = Some(input.parse::<Block>()?);
                }
                "on_delete" | "on_update" => {
                    return Err(syn::Error::new(hook_fn.span(), "This hook is already specified once. It cannot be mentioned more than once"));
                }
                _ => {
                    return Err(syn::Error::new(
                        hook_fn.span(),
                        "This only accepts 'on_update' or 'on_delete' hook",
                    ))
                }
            }
        }

        Ok(macro_input)
    }
}

fn gen_join_list_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let doc = format!("List {entity_snake}s");
    let path = format!("/admin/{entity_snake}");
    let operation_id = format!("list_{entity_snake}s");
    let description = format!("Listed {entity_snake}s successfully");

    let entity_model = format_ident!("{entity}Model");

    quote! {
        #[doc = #doc]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            responses(
                (status = 200, description = #description, body = [#entity_model]),
                (status = 401, description = "Action is permissible after login", body = JsonResponse),
                (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                (status = 500, description = "Unexpected error", body = JsonResponse)
            )
        )]
        pub async fn list(state: State<Arc<AppState>>) -> Result<Json<Vec<#entity_model>>> {
            Ok(Json(#entity::find().all(&state.db_conn).await?))
        }
    }
}

fn gen_join_create_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let doc = format!("Create {entity_snake}");
    let path = format!("/admin/{entity_snake}");
    let operation_id = format!("create_{entity_snake}");
    let description = format!("Created {entity_snake} successfully");
    let not_found = format!("No {entity_snake} found with specified id");

    let entity_model = format_ident!("{entity}Model");
    let request_body = format_ident!("Create{entity}Schema");

    quote! {
        #[doc = #doc]
        #[utoipa::path(
            post,
            path = #path,
            operation_id = #operation_id,
            request_body = #request_body,
            responses(
                (status = 201, description = #description, body = #entity_model),
                (status = 400, description = "Invalid request body format", body = JsonResponse),
                (status = 401, description = "Action is permissible after login", body = JsonResponse),
                (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                (status = 404, description = #not_found, body = JsonResponse),
                (status = 500, description = "Unexpected error", body = JsonResponse)
            )
        )]
        pub async fn create(
            state: State<Arc<AppState>>,
            Json(body): Json<#request_body>,
        ) -> Result<Json<#entity_model>> {
            let mut model = body.into_active_model();
            model.created_at = model.updated_at.clone();

            Ok(Json(model.insert(&state.db_conn).await?))
        }
    }
}

fn gen_join_retrieve_fn(entity: &Ident, related_from: &Ident, related_to: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string()).to_string();
    let related_from_snake_id = format!("{}_id", heck::AsSnakeCase(related_from.to_string()));
    let related_to_snake_id = format!("{}_id", heck::AsSnakeCase(related_to.to_string()));

    let doc = format!("Retrieve {entity_snake} by id");
    let path =
        format!("/admin/{entity_snake}/{{{related_from_snake_id}}}-{{{related_to_snake_id}}}");
    let operation_id = format!("retrieve_{entity_snake}_by_id");
    let description = format!("Retrieved {entity_snake} by id successfully");
    let not_found = format!("No {entity_snake} found with specified id");

    let entity_model = format_ident!("{entity}Model");

    quote! {
        #[doc = #doc]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            params(
                (#related_from_snake_id = Uuid, Path, description = "Id of entity"),
                (#related_to_snake_id = Uuid, Path, description = "Id of entity"),
            ),
            responses(
                (status = 200, description = #description, body = #entity_model),
                (status = 400, description = "Invalid parameters format", body = JsonResponse),
                (status = 401, description = "Action is permissible after login", body = JsonResponse),
                (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                (status = 404, description = #not_found, body = JsonResponse),
                (status = 500, description = "Unexpected error", body = JsonResponse)
            )
        )]
        pub async fn retrieve_by_id(
            state: State<Arc<AppState>>,
            Path(id): Path<(Uuid, Uuid)>,
        ) -> Result<CachedJson<#entity_model>> {
            let cached = state.cache_client.get::<Option<String>, _>(join_cache_key(#entity_snake, id)).await?;

            if let Some(value) = cached {
                Ok(CachedJson::Cached(value))
            } else {
                if let Some(model) = #entity::find_by_id(id).one(&state.db_conn).await? {
                    state.cache_client.set::<(), _, _>(join_cache_key(#entity_snake, id), serde_json::to_string(&model)?, Some(Expiration::EX(900)), None, false).await?;
                    Ok(CachedJson::New(Json(model)))
                } else {
                    Err(Error::NotFound(#not_found.to_owned()))
                }
            }
        }
    }
}

fn gen_join_update_fn(
    entity: &Ident,
    related_from: &Ident,
    related_to: &Ident,
    on_update_hook: Option<Block>,
) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string()).to_string();
    let related_from_snake_id = format!("{}_id", heck::AsSnakeCase(related_from.to_string()));
    let related_to_snake_id = format!("{}_id", heck::AsSnakeCase(related_to.to_string()));

    let related_from_snake = format_ident!("{related_from_snake_id}");
    let related_to_snake = format_ident!("{related_to_snake_id}");

    let doc = format!("Update {entity_snake} by id");
    let path =
        format!("/admin/{entity_snake}/{{{related_from_snake_id}}}-{{{related_to_snake_id}}}");
    let operation_id = format!("update_{entity_snake}_by_id");
    let description = format!("Updated {entity_snake} by id successfully");
    let not_found = format!("No {entity_snake} found with specified id");

    let entity_model = format_ident!("{entity}Model");
    let request_body = format_ident!("Create{entity}Schema");

    let hook = on_update_hook.map_or_else(
        || {
            quote! {
                let mut active_model = body.into_active_model();
                active_model.#related_from_snake = ActiveValue::Set(id.0);
                active_model.#related_to_snake = ActiveValue::Set(id.1);
                let model = active_model.update(&state.db_conn).await?;
                state.cache_client.del::<(), _>(join_cache_key(#entity_snake, id)).await?;
            }
        },
        |hook| {
            let stmts = hook.stmts;
            quote! {
                let Some(old_model) = #entity::find_by_id(id).one(&state.db_conn).await? else {
                    return Err(Error::NotFound(#not_found.to_owned()))
                };

                let mut active_model = body.into_active_model();
                active_model.#related_from_snake = ActiveValue::Set(id.0);
                active_model.#related_to_snake = ActiveValue::Set(id.1);
                let model = active_model.update(&state.db_conn).await?;

                state.cache_client.del::<(), _>(join_cache_key(#entity_snake, id)).await?;

                #(#stmts)*
            }
        },
    );

    quote! {
        #[doc = #doc]
        #[utoipa::path(
            put,
            path = #path,
            operation_id = #operation_id,
            request_body = #request_body,
            params(
                (#related_from_snake_id = Uuid, Path, description = "Id of entity"),
                (#related_to_snake_id = Uuid, Path, description = "Id of entity"),
            ),
            responses(
                (status = 200, description = #description, body = #entity_model),
                (status = 400, description = "Invalid parameters/request body format", body = JsonResponse),
                (status = 401, description = "Action is permissible after login", body = JsonResponse),
                (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                (status = 404, description = #not_found, body = JsonResponse),
                (status = 500, description = "Unexpected error", body = JsonResponse)
            )
        )]
        pub async fn update_by_id(
            state: State<Arc<AppState>>,
            Path(id): Path<(Uuid, Uuid)>,
            Json(body): Json<#request_body>,
        ) -> Result<Json<#entity_model>> {
            #hook

            Ok(Json(model))
        }
    }
}

fn gen_join_delete_fn(
    entity: &Ident,
    related_from: &Ident,
    related_to: &Ident,
    on_delete_hook: Option<Block>,
) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string()).to_string();
    let related_from_snake_id = format!("{}_id", heck::AsSnakeCase(related_from.to_string()));
    let related_to_snake_id = format!("{}_id", heck::AsSnakeCase(related_to.to_string()));

    let doc = format!("Delete {entity_snake} by id");
    let path =
        format!("/admin/{entity_snake}/{{{related_from_snake_id}}}-{{{related_to_snake_id}}}");
    let operation_id = format!("delete_{entity_snake}_by_id");
    let description = format!("Deleted {entity_snake} by id successfully");
    let not_found = format!("No {entity_snake} found with specified id");

    let hook = on_delete_hook.map(|hook| {
        let stmts = hook.stmts;
        quote! { #(#stmts)* }
    });

    quote! {
        #[doc = #doc]
        #[utoipa::path(
            delete,
            path = #path,
            operation_id = #operation_id,
            params(
                (#related_from_snake_id = Uuid, Path, description = "Id of entity"),
                (#related_to_snake_id = Uuid, Path, description = "Id of entity"),
            ),
            responses(
                (status = 204, description = #description),
                (status = 400, description = "Invalid parameters format", body = JsonResponse),
                (status = 401, description = "Action is permissible after login", body = JsonResponse),
                (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                (status = 404, description = #not_found, body = JsonResponse),
                (status = 500, description = "Unexpected error", body = JsonResponse)
            )
        )]
        pub async fn delete_by_id(state: State<Arc<AppState>>, Path(id): Path<(Uuid, Uuid)>) -> Result<()> {
            let Some(model) = #entity::find_by_id(id).one(&state.db_conn).await? else {
                return Err(Error::NotFound(#not_found.to_owned()));
            };

            #hook

            #entity::delete_by_id(id).exec(&state.db_conn).await?;
            state.cache_client.del::<(), _>(join_cache_key(#entity_snake, id)).await?;

            Ok(())
        }
    }
}

fn gen_join_relations_fn(
    entity: &Ident,
    related_from: &Ident,
    related_to: &Ident,
) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());
    let related_from_snake = format_ident!(
        "{}",
        heck::AsSnakeCase(related_from.to_string()).to_string()
    );
    let related_to_snake =
        format_ident!("{}", heck::AsSnakeCase(related_to.to_string()).to_string());

    let related_from_snake_id = format!("{}_id", heck::AsSnakeCase(related_from.to_string()));
    let related_to_snake_id = format!("{}_id", heck::AsSnakeCase(related_to.to_string()));

    let doc = format!("Retrieve {entity_snake} relations by id");
    let path = format!(
        "/admin/{entity_snake}/{{{related_from_snake_id}}}-{{{related_to_snake_id}}}/relations"
    );
    let operation_id = format!("retrieve_{entity_snake}_relations_by_id");
    let description = format!("Retrieved {entity_snake} relations by id successfully");
    let not_found = format!("No {entity_snake} found with specified id");

    let entity_relations = format_ident!("{entity}Relations");
    let related_from_model = format_ident!("{related_from}Model");
    let related_to_model = format_ident!("{related_to}Model");

    quote! {
        #[derive(Clone, Debug, serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
        pub struct #entity_relations {
            pub #related_from_snake: #related_from_model,
            pub #related_to_snake: #related_to_model
        }

        #[doc = #doc]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            params(
                (#related_from_snake_id = Uuid, Path, description = "Id of entity"),
                (#related_to_snake_id = Uuid, Path, description = "Id of entity"),
            ),
            responses(
                (status = 200, description = #description, body = #entity_relations),
                (status = 401, description = "Action is permissible after login", body = JsonResponse),
                (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                (status = 404, description = #not_found, body = JsonResponse),
                (status = 500, description = "Unexpected error", body = JsonResponse)
            )
        )]
        pub async fn retrieve_relations_by_id(
            state: State<Arc<AppState>>,
            Path(id): Path<(Uuid, Uuid)>,
        ) -> Result<Json<#entity_relations>> {
            let Some(model) = #entity::find_by_id(id).one(&state.db_conn).await? else {
                return Err(Error::NotFound(#not_found.to_owned()))
            };

            Ok(Json(#entity_relations {
                #related_from_snake: #related_from::find_by_id(id.0).one(&state.db_conn).await?.unwrap(),
                #related_to_snake: #related_to::find_by_id(id.1).one(&state.db_conn).await?.unwrap(),
            }))
        }
    }
}

fn gen_join_import_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let doc = format!("Import {entity_snake}s");
    let path = format!("/admin/{entity_snake}/import");
    let operation_id = format!("import_{entity_snake}s");
    let description = format!("Imported {entity_snake}s successfully");
    let query = format!("COPY {entity_snake} FROM '{{}}' WITH (FORMAT CSV, HEADER);");

    quote! {
        #[doc = #doc]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            request_body(
                content = inline(ImportFile),
                content_type = "multipart/form-data",
            ),
            responses(
                (status = 200, description = #description, body = JsonResponse),
                (status = 401, description = "Action is permissible after login", body = JsonResponse),
                (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                (status = 500, description = "Unexpected error", body = JsonResponse)
            )
        )]
        pub async fn import(state: State<Arc<AppState>>, mut multipart: Multipart) -> Result<Json<JsonResponse>> {
            while let Some(field) = multipart.next_field().await.unwrap() {
                if field.name().unwrap() == "csv_file" {
                    let mut temp_file = NamedTempFile::new()?;
                    let file_path = temp_file.path().to_str().unwrap().to_owned();

                    std::io::copy(&mut field.bytes().await?.reader(), &mut temp_file).map_err(|err| Error::Fs { source: err, path: file_path.to_owned() })?;

                    let query = format!(#query, file_path);

                    sqlx::query(&query)
                        .execute(state.db_conn.get_postgres_connection_pool())
                        .await?;
                }
            }

            Ok(Json(JsonResponse { message: "successfully imported".to_owned() }))
        }
    }
}

fn gen_join_export_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let doc = format!("Export {entity_snake}s");
    let path = format!("/admin/{entity_snake}/export");
    let operation_id = format!("export_{entity_snake}s");
    let description = format!("Exported {entity_snake}s successfully");
    let query = format!("COPY {entity_snake} TO '{{}}' WITH (FORMAT CSV, HEADER);");
    let filename = format!("{entity_snake}.csv");

    quote! {
        #[doc = #doc]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            responses(
                (status = 200, description = #description, body = JsonResponse),
                (status = 401, description = "Action is permissible after login", body = JsonResponse),
                (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                (status = 500, description = "Unexpected error", body = JsonResponse)
            )
        )]
        async fn export(state: State<Arc<AppState>>) -> Result<Attachment<Body>> {
            let temp_file = NamedTempFile::new()?;
            let file_path = temp_file.path().to_str().unwrap().to_owned();

            let query = format!(#query, file_path);

            sqlx::query(&query)
                .execute(state.db_conn.get_postgres_connection_pool())
                .await?;

            let csv_stream = CsvStream::new(temp_file).await.map_err(|err| Error::Fs {
                source: err,
                path: file_path,
            })?;

            Ok(Attachment::new(Body::from_stream(csv_stream)).content_type("text/csv").filename(#filename.to_owned()))
        }
    }
}

pub fn crud_join_impl(input: TokenStream) -> TokenStream {
    let JoinCrudMacroInput {
        entity,
        related_from,
        related_to,
        on_delete_hook,
        on_update_hook,
    } = parse_macro_input!(input as JoinCrudMacroInput);

    let list_fn = gen_join_list_fn(&entity);
    let create_fn = gen_join_create_fn(&entity);
    let retrieve_fn = gen_join_retrieve_fn(&entity, &related_from, &related_to);
    let update_fn = gen_join_update_fn(&entity, &related_from, &related_to, on_update_hook);
    let delete_fn = gen_join_delete_fn(&entity, &related_from, &related_to, on_delete_hook);
    let relations_fn = gen_join_relations_fn(&entity, &related_from, &related_to);
    let import_fn = gen_join_import_fn(&entity);
    let export_fn = gen_join_export_fn(&entity);

    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let route_base = format!("/{entity_snake}");
    let route_id = format!("{route_base}/:id-:id");
    let route_relations = format!("{route_base}/:id-:id/relations");
    let route_import = format!("{route_base}/import");
    let route_export = format!("{route_base}/export");

    quote! {
        use std::io;
        use std::sync::Arc;

        use axum::body::Body;
        use axum::extract::{Json, Multipart, Path, State};
        use axum::response::IntoResponse;
        use axum::routing::{get, post};
        use axum::Router;
        use axum_extra::response::Attachment;
        use bytes::Buf;
        use fred::prelude::*;
        use futures::TryStreamExt;
        use sea_orm::prelude::*;
        use sea_orm::{sqlx, ActiveValue, IntoActiveModel};
        use tempfile::NamedTempFile;
        use tokio::io::BufWriter;
        use tokio_util::io::StreamReader;
        use uuid::Uuid;

        use super::CsvStream;
        use crate::errors::{Error, Result};
        use crate::redis_keys::join_cache_key;
        use crate::schemas::{ImportFile};
        use crate::service::{AppState, CachedJson};

        #list_fn

        #create_fn

        #retrieve_fn

        #update_fn

        #delete_fn

        #relations_fn

        #import_fn

        #export_fn

        pub fn router() -> Router<Arc<AppState>> {
            Router::new()
                .route(#route_base, get(list).post(create))
                .route(
                    #route_id,
                    get(retrieve_by_id)
                        .put(update_by_id)
                        .delete(delete_by_id),
                )
                .route(#route_relations, get(retrieve_relations_by_id))
                .route(#route_import, post(import))
                .route(#route_export, get(export))
        }
    }
    .into()
}
