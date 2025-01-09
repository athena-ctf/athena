use proc_macro::TokenStream;
use quote::{ToTokens, format_ident, quote};
use syn::parse::{Parse, ParseStream};
use syn::punctuated::Punctuated;
use syn::{Ident, Token, bracketed, parse_macro_input};

struct CrudMacroInput {
    entity: Ident,
    single: Vec<Ident>,
    multiple: Vec<Ident>,
    optional: Vec<Ident>,
}

impl Parse for CrudMacroInput {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let entity: Ident = input.parse()?;
        input.parse::<Token![,]>()?;

        input.parse::<Ident>()?;
        input.parse::<Token![:]>()?;
        let content;
        bracketed!(content in input);
        let single: Punctuated<Ident, Token![,]> = content.parse_terminated(Ident::parse, Token![,])?;
        input.parse::<Token![,]>()?;

        input.parse::<Ident>()?;
        input.parse::<Token![:]>()?;
        let content;
        bracketed!(content in input);
        let optional: Punctuated<Ident, Token![,]> = content.parse_terminated(Ident::parse, Token![,])?;
        input.parse::<Token![,]>()?;

        input.parse::<Ident>()?;
        input.parse::<Token![:]>()?;
        let content;
        bracketed!(content in input);
        let multiple: Punctuated<Ident, Token![,]> = content.parse_terminated(Ident::parse, Token![,])?;

        Ok(Self {
            entity,
            single: single.into_iter().collect(),
            multiple: multiple.into_iter().collect(),
            optional: optional.into_iter().collect(),
        })
    }
}

fn gen_list_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let path = format!("/admin/{entity_snake}");
    let operation_id = format!("list_{entity_snake}s");
    let permission = format!("{entity_snake}:read");

    let entity_model = format_ident!("{entity}Model");

    quote! {
        #[api_macros::rbac(#permission)]
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
            Ok(ApiResponse::json_ok(#entity::find().all(&state.db_conn).await?))
        }
    }
}

fn gen_list_ids_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let path = format!("/admin/{entity_snake}/ids");
    let operation_id = format!("list_{entity_snake}_ids");
    let permission = format!("{entity_snake}:read");

    let entity_id_schema = format_ident!("{}IdSchema", entity);

    quote! {
        #[api_macros::rbac(#permission)]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            responses(
                (status = 200, body = [#entity_id_schema]),
                (status = 401, body = JsonResponse),
                (status = 403, body = JsonResponse),
                (status = 500, body = JsonResponse)
            )
        )]
        pub async fn list_ids(state: State<Arc<AppState>>) -> Result<ApiResponse<Json<Vec<#entity_id_schema>>>> {
            Ok(ApiResponse::json_ok(
                #entity::find()
                    .into_partial_model::<#entity_id_schema>()
                    .all(&state.db_conn)
                    .await?,
            ))
        }
    }
}

fn gen_create_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let path = format!("/admin/{entity_snake}");
    let operation_id = format!("create_{entity_snake}");
    let permission = format!("{entity_snake}:create");

    let entity_model = format_ident!("{entity}Model");
    let request_body = format_ident!("Create{entity}Schema");

    quote! {
        #[api_macros::rbac(#permission)]
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
            model.id = ActiveValue::Set(Uuid::now_v7());
            model.created_at = model.updated_at.clone();

            Ok(ApiResponse::json_created(model.insert(&state.db_conn).await?))
        }
    }
}

fn gen_retrieve_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string()).to_string();

    let path = format!("/admin/{entity_snake}/{{id}}");
    let operation_id = format!("retrieve_{entity_snake}_by_id");
    let not_found = format!("No {entity_snake} found with specified id");
    let permission = format!("{entity_snake}:read");

    let entity_model = format_ident!("{entity}Model");

    quote! {
        #[api_macros::rbac(#permission)]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            params(("id" = Uuid, Path)),
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
            Path(id): Path<Uuid>,
        ) -> Result<ApiResponse<Json<#entity_model>>> {
            if let Some(model) = #entity::find_by_id(id).one(&state.db_conn).await? {
                Ok(ApiResponse::json_ok(model))
            } else {
                Err(Error::NotFound(#not_found.to_owned()))
            }
        }
    }
}

fn gen_update_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string()).to_string();

    let path = format!("/admin/{entity_snake}/{{id}}");
    let operation_id = format!("update_{entity_snake}_by_id");
    let permission = format!("{entity_snake}:update");

    let entity_model = format_ident!("{entity}Model");
    let request_body = format_ident!("Create{entity}Schema");

    quote! {
        #[api_macros::rbac(#permission)]
        #[utoipa::path(
            put,
            path = #path,
            operation_id = #operation_id,
            request_body = #request_body,
            params(("id" = Uuid, Path)),
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
            Path(id): Path<Uuid>,
            Json(body): Json<#request_body>,
        ) -> Result<ApiResponse<Json<#entity_model>>> {
            let mut active_model = body.into_active_model();
            active_model.id = ActiveValue::Set(id);
            let model = active_model.update(&state.db_conn).await?;

            Ok(ApiResponse::json_ok(model))
        }
    }
}

fn gen_delete_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string()).to_string();

    let path = format!("/admin/{entity_snake}/{{id}}");
    let operation_id = format!("delete_{entity_snake}_by_id");
    let permission = format!("{entity_snake}:delete");

    quote! {
        #[api_macros::rbac(#permission)]
        #[utoipa::path(
            delete,
            path = #path,
            operation_id = #operation_id,
            params(("id" = Uuid, Path)),
            responses(
                (status = 204),
                (status = 400, body = JsonResponse),
                (status = 401, body = JsonResponse),
                (status = 403, body = JsonResponse),
                (status = 500, body = JsonResponse)
            )
        )]
        pub async fn delete_by_id(state: State<Arc<AppState>>, Path(id): Path<Uuid>) -> Result<ApiResponse<()>> {
            #entity::delete_by_id(id).exec(&state.db_conn).await?;

            Ok(ApiResponse::no_content())
        }
    }
}

fn gen_relations_fn(entity: &Ident, single: &[Ident], multiple: &[Ident], optional: &[Ident]) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let path = format!("/admin/{entity_snake}/{{id}}/relations");
    let operation_id = format!("retrieve_{entity_snake}_relations_by_id");
    let not_found = format!("No {entity_snake} found with specified id");

    let entity_relations = format_ident!("{entity}Relations");

    let single_fields = single.iter().map(|ident| {
        let ident_snake = format_ident!("{}", heck::AsSnakeCase(ident.to_string()).to_string());
        let ident_model = format_ident!("{}IdSchema", ident);

        quote! {
            pub #ident_snake: #ident_model,
        }
    });

    let optional_fields = optional.iter().map(|ident| {
        let ident_snake = format_ident!("{}", heck::AsSnakeCase(ident.to_string()).to_string());
        let ident_model = format_ident!("{}IdSchema", ident);

        quote! {
            pub #ident_snake: Option<#ident_model>,
        }
    });

    let multiple_fields = multiple.iter().map(|ident| {
        let ident_snake = format_ident!("{}s", heck::AsSnakeCase(ident.to_string()).to_string());
        let ident_model = format_ident!("{}IdSchema", ident);

        quote! {
            pub #ident_snake: Vec<#ident_model>,
        }
    });

    let single_relations = single.iter().map(|ident| {
        let ident_snake = format_ident!("{}", heck::AsSnakeCase(ident.to_string()).to_string());
        let ident_model = format_ident!("{}IdSchema", ident);

        quote! {
            #ident_snake: model.find_related(#ident).into_partial_model::<#ident_model>().one(&state.db_conn).await?.unwrap(),
        }
    });

    let optional_relations = optional.iter().map(|ident| {
        let ident_snake = format_ident!("{}", heck::AsSnakeCase(ident.to_string()).to_string());
        let ident_model = format_ident!("{}IdSchema", ident);

        quote! {
            #ident_snake: model.find_related(#ident).into_partial_model::<#ident_model>().one(&state.db_conn).await?,
        }
    });

    let multiple_relations = multiple.iter().map(|ident| {
        let ident_snake = format_ident!("{}s", heck::AsSnakeCase(ident.to_string()).to_string());
        let ident_model = format_ident!("{}IdSchema", ident);

        quote! {
            #ident_snake: model.find_related(#ident).into_partial_model::<#ident_model>().all(&state.db_conn).await?,
        }
    });

    let permission = format!("{entity_snake}:read");

    quote! {
        #[derive(Clone, Debug, serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
        pub struct #entity_relations {
            #(#single_fields)*
            #(#optional_fields)*
            #(#multiple_fields)*
        }

        #[api_macros::rbac(#permission)]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            params(
                ("id" = Uuid, Path),
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
            Path(id): Path<Uuid>,
        ) -> Result<ApiResponse<Json<#entity_relations>>> {
            let Some(model) = #entity::find_by_id(id).one(&state.db_conn).await? else {
                return Err(Error::NotFound(#not_found.to_owned()))
            };

            Ok(ApiResponse::json_ok(#entity_relations {
                #(#single_relations)*
                #(#optional_relations)*
                #(#multiple_relations)*
            }))
        }
    }
}

fn gen_import_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let path = format!("/admin/{entity_snake}/import");
    let operation_id = format!("import_{entity_snake}s");
    let query = format!("COPY {entity_snake} FROM '{{}}' WITH (FORMAT CSV, HEADER);");
    let permission = format!("{entity_snake}:create");

    quote! {
        #[api_macros::rbac(#permission)]
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

                    std::io::copy(&mut field.bytes().await?.reader(), &mut temp_file)?;

                    let query = format!(#query, file_path);

                    sqlx::query(&query)
                        .execute(state.db_conn.get_postgres_connection_pool())
                        .await?;

                    break;
                }
            }

            Ok(ApiResponse::json_ok(JsonResponse { message: "successfully imported".to_owned() }))
        }
    }
}

fn gen_export_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string()).to_string();

    let path = format!("/admin/{entity_snake}/export");
    let operation_id = format!("export_{entity_snake}s");
    let permission = format!("{entity_snake}:read");

    quote! {
        #[api_macros::rbac(#permission)]
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

pub fn crud_impl(input: TokenStream) -> TokenStream {
    let CrudMacroInput {
        entity,
        single,
        multiple,
        optional,
    } = parse_macro_input!(input as CrudMacroInput);

    let list_fn = gen_list_fn(&entity);
    let list_ids_fn = gen_list_ids_fn(&entity);
    let create_fn = gen_create_fn(&entity);
    let retrieve_fn = gen_retrieve_fn(&entity);
    let update_fn = gen_update_fn(&entity);
    let delete_fn = gen_delete_fn(&entity);
    let relations_fn = gen_relations_fn(&entity, &single, &multiple, &optional);
    let import_fn = gen_import_fn(&entity);
    let export_fn = gen_export_fn(&entity);

    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let route_base = format!("/{entity_snake}");
    let route_id = format!("{route_base}/{{id}}");
    let route_relations = format!("{route_base}/{{id}}/relations");
    let route_import = format!("{route_base}/import");
    let route_export = format!("{route_base}/export");

    let mut imports = vec![
        entity.clone(),
        format_ident!("{entity}Model"),
        format_ident!("Create{entity}Schema"),
        format_ident!("{entity}IdSchema"),
    ];
    imports.extend(
        single
            .iter()
            .flat_map(|single| vec![format_ident!("{single}IdSchema"), single.clone()]),
    );
    imports.extend(
        optional
            .iter()
            .flat_map(|optional| vec![format_ident!("{optional}IdSchema"), optional.clone()]),
    );
    imports.extend(
        multiple
            .iter()
            .flat_map(|multiple| vec![format_ident!("{multiple}IdSchema"), multiple.clone()]),
    );

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

        #list_ids_fn

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
