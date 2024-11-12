use proc_macro::TokenStream;
use quote::{format_ident, quote, ToTokens};
use syn::parse::{Parse, ParseStream};
use syn::punctuated::Punctuated;
use syn::{bracketed, parse_macro_input, Ident, Token};

struct JoinCrudMacroInput {
    entity: Ident,
    related_from: Ident,
    related_to: Ident,
}

impl Parse for JoinCrudMacroInput {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let entity: Ident = input.parse()?;
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
    let entity_snake = heck::AsSnakeCase(entity.to_string());
    let related_from_snake_id = format!("{}_id", heck::AsSnakeCase(related_from.to_string()));
    let related_to_snake_id = format!("{}_id", heck::AsSnakeCase(related_to.to_string()));

    let doc = format!("Retrieve {entity_snake} by id");
    let path =
        format!("/admin/{entity_snake}/{{{related_from_snake_id}}}-{{{related_to_snake_id}}}");
    let operation_id = format!("retrieve_{entity_snake}_by_id");
    let description = format!("Retrieved {entity_snake} by id successfully");
    let not_found = format!("No {entity_snake} found with specified id");
    let redis_key = format!("{entity_snake}:{{}}:{{}}");

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
            let cached = state.cache_client.get::<Option<String>, _>(format!(#redis_key, id.0.simple(), id.1.simple())).await?;

            if let Some(value) = cached {
                Ok(CachedJson::Cached(value))
            } else {
                if let Some(model) = #entity::find_by_id(id).one(&state.db_conn).await? {
                    state.cache_client.set::<(), _, _>(format!(#redis_key, id.0.simple(), id.1.simple()), serde_json::to_string(&model)?, None, None, false).await?;
                    Ok(CachedJson::New(Json(model)))
                } else {
                    Err(Error::NotFound(#not_found.to_owned()))
                }
            }
        }
    }
}

fn gen_join_update_fn(entity: &Ident, related_from: &Ident, related_to: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());
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
    let redis_key = format!("{entity_snake}:{{}}:{{}}");

    let entity_model = format_ident!("{entity}Model");
    let request_body = format_ident!("Create{entity}Schema");

    quote! {
        #[doc = #doc]
        #[utoipa::path(
            patch,
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
            let mut model = body.into_active_model();
            model.#related_from_snake = ActiveValue::Set(id.0);
            model.#related_to_snake = ActiveValue::Set(id.1);

            let model = model.update(&state.db_conn).await?;

            state.cache_client.del::<(), _>(format!(#redis_key, id.0.simple(), id.1.simple())).await?;
            Ok(Json(model))
        }
    }
}

fn gen_join_delete_fn(entity: &Ident, related_from: &Ident, related_to: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());
    let related_from_snake_id = format!("{}_id", heck::AsSnakeCase(related_from.to_string()));
    let related_to_snake_id = format!("{}_id", heck::AsSnakeCase(related_to.to_string()));

    let doc = format!("Delete {entity_snake} by id");
    let path =
        format!("/admin/{entity_snake}/{{{related_from_snake_id}}}-{{{related_to_snake_id}}}");
    let operation_id = format!("delete_{entity_snake}_by_id");
    let description = format!("Deleted {entity_snake} by id successfully");
    let not_found = format!("No {entity_snake} found with specified id");
    let redis_key = format!("{entity_snake}:{{}}.{{}}");

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
            let delete_result = #entity::delete_by_id(id).exec(&state.db_conn).await?;
            if delete_result.rows_affected == 1 {
                state.cache_client.del::<(), _>(format!(#redis_key, id.0.simple(), id.1.simple())).await?;
                Ok(())
            } else {
                Err(Error::NotFound(#not_found.to_owned()))
            }
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

    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let route_base = format!("/{entity_snake}");
    let route_id = format!("/{entity_snake}/:id-:id");
    let route_relations = format!("/{entity_snake}/:id-:id/relations");

    quote! {
        #list_fn

        #create_fn

        #retrieve_fn

        #update_fn

        #delete_fn

        #relations_fn

        pub fn router() -> Router<Arc<AppState>> {
            Router::new()
                .route(#route_base, get(list).post(create))
                .route(
                    #route_id,
                    get(retrieve_by_id)
                        .patch(update_by_id)
                        .delete(delete_by_id),
                )
                .route(#route_relations, get(retrieve_relations_by_id))
        }
    }
    .into()
}

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

        input.parse::<syn::Ident>()?;
        input.parse::<Token![:]>()?;
        let content;
        bracketed!(content in input);
        let single: Punctuated<Ident, Token![,]> =
            content.parse_terminated(Ident::parse, Token![,])?;
        input.parse::<Token![,]>()?;

        input.parse::<syn::Ident>()?;
        input.parse::<Token![:]>()?;
        let content;
        bracketed!(content in input);
        let optional: Punctuated<Ident, Token![,]> =
            content.parse_terminated(Ident::parse, Token![,])?;
        input.parse::<Token![,]>()?;

        input.parse::<syn::Ident>()?;
        input.parse::<Token![:]>()?;
        let content;
        bracketed!(content in input);
        let multiple: Punctuated<Ident, Token![,]> =
            content.parse_terminated(Ident::parse, Token![,])?;

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

fn gen_create_fn(entity: &Ident) -> impl ToTokens {
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
            model.id = ActiveValue::Set(Uuid::now_v7());
            model.created_at = model.updated_at.clone();

            Ok(Json(model.insert(&state.db_conn).await?))
        }
    }
}

fn gen_retrieve_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let doc = format!("Retrieve {entity_snake} by id");
    let path = format!("/admin/{entity_snake}/{{id}}");
    let operation_id = format!("retrieve_{entity_snake}_by_id");
    let description = format!("Retrieved {entity_snake} by id successfully");
    let not_found = format!("No {entity_snake} found with specified id");
    let redis_key = format!("{entity_snake}:{{}}");

    let entity_model = format_ident!("{entity}Model");

    quote! {
        #[doc = #doc]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            params(("id" = Uuid, Path, description = "Id of entity")),
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
            Path(id): Path<Uuid>,
        ) -> Result<CachedJson<#entity_model>> {
            let cached = state.cache_client.get::<Option<String>, _>(format!(#redis_key, id.simple())).await?;

            if let Some(value) = cached {
                Ok(CachedJson::Cached(value))
            } else {
                if let Some(model) = #entity::find_by_id(id).one(&state.db_conn).await? {
                    state.cache_client.set::<(), _, _>(format!(#redis_key, id.simple()), serde_json::to_string(&model)?, None, None, false).await?;
                    Ok(CachedJson::New(Json(model)))
                } else {
                    Err(Error::NotFound(#not_found.to_owned()))
                }
            }
        }
    }
}

fn gen_update_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let doc = format!("Update {entity_snake} by id");
    let path = format!("/admin/{entity_snake}/{{id}}");
    let operation_id = format!("update_{entity_snake}_by_id");
    let description = format!("Updated {entity_snake} by id successfully");
    let not_found = format!("No {entity_snake} found with specified id");
    let redis_key = format!("{entity_snake}:{{}}");

    let entity_model = format_ident!("{entity}Model");
    let request_body = format_ident!("Create{entity}Schema");

    quote! {
        #[doc = #doc]
        #[utoipa::path(
            patch,
            path = #path,
            operation_id = #operation_id,
            request_body = #request_body,
            params(("id" = Uuid, Path, description = "Id of entity")),
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
            Path(id): Path<Uuid>,
            Json(body): Json<#request_body>,
        ) -> Result<Json<#entity_model>> {
            let mut model = body.into_active_model();
            model.id = ActiveValue::Set(id);

            let model = model.update(&state.db_conn).await?;

            state.cache_client.del::<(), _>(format!(#redis_key, id.simple())).await?;
            Ok(Json(model))
        }
    }
}

fn gen_delete_fn(entity: &Ident) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let doc = format!("Delete {entity_snake} by id");
    let path = format!("/admin/{entity_snake}/{{id}}");
    let operation_id = format!("delete_{entity_snake}_by_id");
    let description = format!("Deleted {entity_snake} by id successfully");
    let not_found = format!("No {entity_snake} found with specified id");
    let redis_key = format!("{entity_snake}:{{}}");

    quote! {
        #[doc = #doc]
        #[utoipa::path(
            delete,
            path = #path,
            operation_id = #operation_id,
            params(("id" = Uuid, Path, description = "Id of entity")),
            responses(
                (status = 204, description = #description),
                (status = 400, description = "Invalid parameters format", body = JsonResponse),
                (status = 401, description = "Action is permissible after login", body = JsonResponse),
                (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
                (status = 404, description = #not_found, body = JsonResponse),
                (status = 500, description = "Unexpected error", body = JsonResponse)
            )
        )]
        pub async fn delete_by_id(state: State<Arc<AppState>>, Path(id): Path<Uuid>) -> Result<()> {
            let delete_result = #entity::delete_by_id(id).exec(&state.db_conn).await?;
            if delete_result.rows_affected == 1 {
                state.cache_client.del::<(), _>(format!(#redis_key, id.simple())).await?;
                Ok(())
            } else {
                Err(Error::NotFound(#not_found.to_owned()))
            }
        }
    }
}

fn gen_relations_fn(
    entity: &Ident,
    single: Vec<Ident>,
    multiple: Vec<Ident>,
    optional: Vec<Ident>,
) -> impl ToTokens {
    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let doc = format!("Retrieve {entity_snake} relations by id");
    let path = format!("/admin/{entity_snake}/{{id}}/relations");
    let operation_id = format!("retrieve_{entity_snake}_relations_by_id");
    let description = format!("Retrieved {entity_snake} relations by id successfully");
    let not_found = format!("No {entity_snake} found with specified id");

    let entity_relations = format_ident!("{entity}Relations");

    let single_fields = single.iter().map(|ident| {
        let ident_snake = format_ident!("{}", heck::AsSnakeCase(ident.to_string()).to_string());
        let ident_model = format_ident!("{}Model", ident);

        quote! {
            pub #ident_snake: #ident_model,
        }
    });

    let optional_fields = optional.iter().map(|ident| {
        let ident_snake = format_ident!("{}", heck::AsSnakeCase(ident.to_string()).to_string());
        let ident_model = format_ident!("{}Model", ident);

        quote! {
            pub #ident_snake: Option<#ident_model>,
        }
    });

    let multiple_fields = multiple.iter().map(|ident| {
        let ident_snake = format_ident!("{}s", heck::AsSnakeCase(ident.to_string()).to_string());
        let ident_model = format_ident!("{}Model", ident);

        quote! {
            pub #ident_snake: Vec<#ident_model>,
        }
    });

    let single_relations = single.iter().map(|ident| {
        let ident_snake = format_ident!("{}", heck::AsSnakeCase(ident.to_string()).to_string());

        quote! {
            #ident_snake: model.find_related(#ident).one(&state.db_conn).await?.unwrap(),
        }
    });

    let optional_relations = optional.iter().map(|ident| {
        let ident_snake = format_ident!("{}", heck::AsSnakeCase(ident.to_string()).to_string());

        quote! {
            #ident_snake: model.find_related(#ident).one(&state.db_conn).await?,
        }
    });

    let multiple_relations = multiple.iter().map(|ident| {
        let ident_snake = format_ident!("{}s", heck::AsSnakeCase(ident.to_string()).to_string());

        quote! {
            #ident_snake: model.find_related(#ident).all(&state.db_conn).await?,
        }
    });

    quote! {
        #[derive(Clone, Debug, serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
        pub struct #entity_relations {
            #(#single_fields)*
            #(#optional_fields)*
            #(#multiple_fields)*
        }

        #[doc = #doc]
        #[utoipa::path(
            get,
            path = #path,
            operation_id = #operation_id,
            params(
                ("id" = Uuid, Path, description = "Id of entity"),
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
            Path(id): Path<Uuid>,
        ) -> Result<Json<#entity_relations>> {
            let Some(model) = #entity::find_by_id(id).one(&state.db_conn).await? else {
                return Err(Error::NotFound(#not_found.to_owned()))
            };

            Ok(Json(#entity_relations {
                #(#single_relations)*
                #(#optional_relations)*
                #(#multiple_relations)*
            }))
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
    let create_fn = gen_create_fn(&entity);
    let retrieve_fn = gen_retrieve_fn(&entity);
    let update_fn = gen_update_fn(&entity);
    let delete_fn = gen_delete_fn(&entity);
    let relations_fn = gen_relations_fn(&entity, single, multiple, optional);

    let entity_snake = heck::AsSnakeCase(entity.to_string());

    let route_base = format!("/{entity_snake}");
    let route_id = format!("/{entity_snake}/:id");
    let route_relations = format!("/{entity_snake}/:id/relations");

    quote! {
        #list_fn

        #create_fn

        #retrieve_fn

        #update_fn

        #delete_fn

        #relations_fn

        pub fn router() -> Router<Arc<AppState>> {
            Router::new()
                .route(#route_base, get(list).post(create))
                .route(
                    #route_id,
                    get(retrieve_by_id)
                        .patch(update_by_id)
                        .delete(delete_by_id),
                )
                .route(#route_relations, get(retrieve_relations_by_id))
        }
    }
    .into()
}
