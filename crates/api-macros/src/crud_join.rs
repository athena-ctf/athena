use proc_macro::TokenStream;
use quote::{ToTokens, format_ident, quote};
use syn::parse::{Parse, ParseStream};
use syn::{Ident, Token, parse_macro_input};

struct JoinCrudMacroInput {
    entity: Ident,
    related_from: Ident,
    related_to: Ident,
}

impl Parse for JoinCrudMacroInput {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let entity = input.parse::<Ident>()?;
        input.parse::<Token![,]>()?;

        let related_from: Ident = input.parse()?;
        input.parse::<Token![,]>()?;

        let related_to: Ident = input.parse()?;

        Ok(Self {
            entity,
            related_from,
            related_to,
        })
    }
}

fn gen_join_list_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let path = format!("/admin/{entity_snake}");
    let operation_id = format!("list_{entity_snake}s");
    let permission = format!("{entity_snake}:read");

    let entity_model = format_ident!("{entity}Model");

    quote! {
        #[api_macros::requires_permission(permission = #permission)]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            responses(
                (status = 200, body = [#entity_model]),
                (status = 401, body = JsonResponse),
                (status = 403, body = JsonResponse),
                (status = 500, body = JsonResponse)
            )
        )]
        pub async fn list(state: State<Arc<AppState>>) -> Result<ApiResponse<Json<Vec<#entity_model>>>> {
            Ok(ApiResponse::json(#entity::find().all(&state.db_conn).await?))
        }
    }
}

fn gen_join_create_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let path = format!("/admin/{entity_snake}");
    let operation_id = format!("create_{entity_snake}");
    let permission = format!("{entity_snake}:create");

    let entity_model = format_ident!("{entity}Model");
    let request_body = format_ident!("Create{entity}Schema");

    quote! {
        #[api_macros::requires_permission(permission = #permission)]
        #[utoipa::path(
            post,
            path = #path,
            operation_id = #operation_id,
            request_body = #request_body,
            responses(
                (status = 201, body = #entity_model),
                (status = 400, body = JsonResponse),
                (status = 401, body = JsonResponse),
                (status = 403, body = JsonResponse),
                (status = 500, body = JsonResponse)
            )
        )]
        pub async fn create(
            state: State<Arc<AppState>>,
            Json(body): Json<#request_body>,
        ) -> Result<ApiResponse<Json<#entity_model>>> {
            let mut model = body.into_active_model();
            model.created_at = model.updated_at.clone();

            Ok(ApiResponse::json_created(model.insert(&state.db_conn).await?))
        }
    }
}

fn gen_join_retrieve_fn(entity: &Ident, related_from: &Ident, related_to: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string()).to_string();
    let related_from_snake_id = format!("{}_id", heck::AsSnakeCase(related_from.to_string()));
    let related_to_snake_id = format!("{}_id", heck::AsSnakeCase(related_to.to_string()));

    let path = format!("/admin/{entity_snake}/{{{related_from_snake_id}}}-{{{related_to_snake_id}}}");
    let operation_id = format!("retrieve_{entity_snake}_by_id");
    let not_found = format!("No {entity_snake} found with specified id");
    let permission = format!("{entity_snake}:read");

    let entity_model = format_ident!("{entity}Model");

    quote! {
        #[api_macros::requires_permission(permission = #permission)]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            params(
                (#related_from_snake_id = Uuid, Path),
                (#related_to_snake_id = Uuid, Path),
            ),
            responses(
                (status = 200, body = #entity_model),
                (status = 400, body = JsonResponse),
                (status = 401, body = JsonResponse),
                (status = 403, body = JsonResponse),
                (status = 404, body = JsonResponse),
                (status = 500, body = JsonResponse)
            )
        )]
        pub async fn retrieve_by_id(
            state: State<Arc<AppState>>,
            Path(id): Path<(Uuid, Uuid)>,
        ) -> Result<ApiResponse<Json<#entity_model>>> {
            if let Some(model) = #entity::find_by_id(id).one(&state.db_conn).await? {
                Ok(ApiResponse::json(model))
            } else {
                Err(Error::NotFound(#not_found.to_owned()))
            }
        }
    }
}

fn gen_join_update_fn(entity: &Ident, related_from: &Ident, related_to: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string()).to_string();
    let related_from_snake_id = format!("{}_id", heck::AsSnakeCase(related_from.to_string()));
    let related_to_snake_id = format!("{}_id", heck::AsSnakeCase(related_to.to_string()));

    let related_from_snake = format_ident!("{related_from_snake_id}");
    let related_to_snake = format_ident!("{related_to_snake_id}");

    let path = format!("/admin/{entity_snake}/{{{related_from_snake_id}}}-{{{related_to_snake_id}}}");
    let operation_id = format!("update_{entity_snake}_by_id");
    let permission = format!("{entity_snake}:update");

    let entity_model = format_ident!("{entity}Model");
    let request_body = format_ident!("Update{entity}Schema");

    quote! {
        #[api_macros::requires_permission(permission = #permission)]
        #[utoipa::path(
            put,
            path = #path,
            operation_id = #operation_id,
            request_body = #request_body,
            params(
                (#related_from_snake_id = Uuid, Path),
                (#related_to_snake_id = Uuid, Path),
            ),
            responses(
                (status = 200, body = #entity_model),
                (status = 400, body = JsonResponse),
                (status = 401, body = JsonResponse),
                (status = 403, body = JsonResponse),
                (status = 500, body = JsonResponse)
            )
        )]
        pub async fn update_by_id(
            state: State<Arc<AppState>>,
            Path(id): Path<(Uuid, Uuid)>,
            Json(body): Json<#request_body>,
        ) -> Result<ApiResponse<Json<#entity_model>>> {
            let mut active_model = body.into_active_model();

            active_model.#related_from_snake = ActiveValue::Set(id.0);
            active_model.#related_to_snake = ActiveValue::Set(id.1);

            let model = active_model.update(&state.db_conn).await?;

            Ok(ApiResponse::json(model))
        }
    }
}

fn gen_join_delete_fn(entity: &Ident, related_from: &Ident, related_to: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string()).to_string();
    let related_from_snake_id = format!("{}_id", heck::AsSnakeCase(related_from.to_string()));
    let related_to_snake_id = format!("{}_id", heck::AsSnakeCase(related_to.to_string()));

    let path = format!("/admin/{entity_snake}/{{{related_from_snake_id}}}-{{{related_to_snake_id}}}");
    let operation_id = format!("delete_{entity_snake}_by_id");
    let permission = format!("{entity_snake}:delete");

    quote! {
        #[api_macros::requires_permission(permission = #permission)]
        #[utoipa::path(
            delete,
            path = #path,
            operation_id = #operation_id,
            params(
                (#related_from_snake_id = Uuid, Path),
                (#related_to_snake_id = Uuid, Path),
            ),
            responses(
                (status = 204),
                (status = 400, body = JsonResponse),
                (status = 401, body = JsonResponse),
                (status = 403, body = JsonResponse),
                (status = 500, body = JsonResponse)
            )
        )]
        pub async fn delete_by_id(state: State<Arc<AppState>>, Path(id): Path<(Uuid, Uuid)>) -> Result<ApiResponse<()>> {
            #entity::delete_by_id(id).exec(&state.db_conn).await?;

            Ok(ApiResponse::no_content())
        }
    }
}

fn gen_join_relations_fn(entity: &Ident, related_from: &Ident, related_to: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());
    let related_from_snake = format_ident!("{}", heck::AsSnakeCase(related_from.to_string()).to_string());
    let related_to_snake = format_ident!("{}", heck::AsSnakeCase(related_to.to_string()).to_string());

    let related_from_snake_id = format!("{}_id", heck::AsSnakeCase(related_from.to_string()));
    let related_to_snake_id = format!("{}_id", heck::AsSnakeCase(related_to.to_string()));

    let path = format!("/admin/{entity_snake}/{{{related_from_snake_id}}}-{{{related_to_snake_id}}}/relations");
    let operation_id = format!("retrieve_{entity_snake}_relations_by_id");
    let not_found = format!("No {entity_snake} found with specified id");
    let permission = format!("{entity_snake}:read");

    let entity_relations = format_ident!("{entity}Relations");
    let related_from_model = format_ident!("{related_from}IdSchema");
    let related_to_model = format_ident!("{related_to}IdSchema");

    quote! {
        #[derive(Clone, Debug, serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
        pub struct #entity_relations {
            pub #related_from_snake: #related_from_model,
            pub #related_to_snake: #related_to_model
        }

        #[api_macros::requires_permission(permission = #permission)]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            params(
                (#related_from_snake_id = Uuid, Path),
                (#related_to_snake_id = Uuid, Path),
            ),
            responses(
                (status = 200, body = #entity_relations),
                (status = 400, body = JsonResponse),
                (status = 401, body = JsonResponse),
                (status = 403, body = JsonResponse),
                (status = 404, body = JsonResponse),
                (status = 500, body = JsonResponse)
            )
        )]
        pub async fn retrieve_relations_by_id(
            state: State<Arc<AppState>>,
            Path(id): Path<(Uuid, Uuid)>,
        ) -> Result<ApiResponse<Json<#entity_relations>>> {
            let Some(model) = #entity::find_by_id(id).one(&state.db_conn).await? else {
                return Err(Error::NotFound(#not_found.to_owned()))
            };

            Ok(ApiResponse::json(#entity_relations {
                #related_from_snake: #related_from::find_by_id(id.0).into_partial_model::<#related_from_model>().one(&state.db_conn).await?.unwrap(),
                #related_to_snake: #related_to::find_by_id(id.1).into_partial_model::<#related_to_model>().one(&state.db_conn).await?.unwrap(),
            }))
        }
    }
}

fn gen_join_import_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let path = format!("/admin/{entity_snake}/import");
    let operation_id = format!("import_{entity_snake}s");
    let query = format!("COPY {entity_snake} FROM '{{}}' WITH (FORMAT CSV, HEADER);");
    let permission = format!("{entity_snake}:create");

    quote! {
        #[api_macros::requires_permission(permission = #permission)]
        #[utoipa::path(
            post,
            path = #path,
            operation_id = #operation_id,
            request_body(
                content = inline(FileSchema),
                content_type = "multipart/form-data",
            ),
            responses(
                (status = 200, body = JsonResponse),
                (status = 401, body = JsonResponse),
                (status = 403, body = JsonResponse),
                (status = 500, body = JsonResponse)
            )
        )]
        pub async fn import(state: State<Arc<AppState>>, mut multipart: Multipart) -> Result<ApiResponse<Json<JsonResponse>>> {
            while let Some(field) = multipart.next_field().await.unwrap() {
                if field.name().unwrap() == "file" {
                    let mut temp_file = NamedTempFile::new()?;
                    let file_path = temp_file.path().to_str().unwrap().to_owned();

                    std::io::copy(&mut field.bytes().await?.reader(), &mut temp_file).map_err(|err| Error::Fs { source: err, path: file_path.to_owned() })?;

                    let query = format!(#query, file_path);

                    sqlx::query(&query)
                        .execute(state.db_conn.get_postgres_connection_pool())
                        .await?;
                }
            }

            Ok(ApiResponse::json(JsonResponse { message: "successfully imported".to_owned() }))
        }
    }
}

fn gen_join_export_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string()).to_string();

    let path = format!("/admin/{entity_snake}/export");
    let operation_id = format!("export_{entity_snake}s");
    let permission = format!("{entity_snake}:read");

    quote! {
        #[api_macros::requires_permission(permission = #permission)]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            params(("format" = ExportFormat, Query)),
            responses(
                (status = 200, body = inline(FileSchema), content_type = "application/octet-stream"),
                (status = 401, body = JsonResponse),
                (status = 403, body = JsonResponse),
                (status = 500, body = JsonResponse)
            )
        )]
        async fn export(state: State<Arc<AppState>>, Query(query): Query<ExportQuery>) -> Result<ApiResponse<impl IntoResponse>> {
            let temp_file = NamedTempFile::new()?;
            let file_path = temp_file.path().display().to_string();

            sqlx::query(&query.sql_query(#entity_snake, &file_path))
                .execute(state.db_conn.get_postgres_connection_pool())
                .await?;

            let csv_stream = CsvStream::new(temp_file).await.map_err(|err| Error::Fs {
                source: err,
                path: file_path,
            })?;

            Ok(ApiResponse(StatusCode::OK, (
                [(header::CONTENT_TYPE, "application/octet-stream")],
                Body::from_stream(csv_stream)
            )))
        }
    }
}

pub fn crud_join_impl(input: TokenStream) -> TokenStream {
    let JoinCrudMacroInput {
        entity,
        related_from,
        related_to,
    } = parse_macro_input!(input as JoinCrudMacroInput);

    let list_fn = gen_join_list_fn(&entity);
    let create_fn = gen_join_create_fn(&entity);
    let retrieve_fn = gen_join_retrieve_fn(&entity, &related_from, &related_to);
    let update_fn = gen_join_update_fn(&entity, &related_from, &related_to);
    let delete_fn = gen_join_delete_fn(&entity, &related_from, &related_to);
    let relations_fn = gen_join_relations_fn(&entity, &related_from, &related_to);
    let import_fn = gen_join_import_fn(&entity);
    let export_fn = gen_join_export_fn(&entity);

    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let route_base = format!("/{entity_snake}");
    let route_id = format!("{route_base}/:id-:id");
    let route_relations = format!("{route_base}/:id-:id/relations");
    let route_import = format!("{route_base}/import");
    let route_export = format!("{route_base}/export");

    let mut imports = vec![
        entity.clone(),
        format_ident!("{entity}Model"),
        format_ident!("Create{entity}Schema"),
        format_ident!("Update{entity}Schema"),
        format_ident!("{entity}IdSchema"),
    ];
    imports.extend(vec![format_ident!("{related_from}IdSchema"), related_from.clone()]);
    imports.extend(vec![format_ident!("{related_to}IdSchema"), related_to.clone()]);

    quote! {
        use std::io;
        use std::sync::Arc;

        use axum::body::Body;
        use axum::extract::{Json, Multipart, Path, Query, State};
        use axum::http::{header, StatusCode};
        use axum::response::IntoResponse;
        use axum::routing::{get, post};
        use axum::Router;
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
        use crate::schemas::{FileSchema, ExportQuery, ExportFormat, JsonResponse, #(#imports,)*};
        use crate::{AppState, ApiResponse};

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
