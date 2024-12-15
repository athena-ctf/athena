use darling::ast::NestedMeta;
use darling::{Error, FromMeta};
use proc_macro::TokenStream;
use quote::{format_ident, quote};
use syn::{ItemStruct, parse_macro_input};

trait Unzip5 {
    type Output;

    fn unzip5(self) -> Self::Output;
}

impl<A, B, C, D, E> Unzip5 for Option<(A, B, C, D, E)> {
    type Output = (Option<A>, Option<B>, Option<C>, Option<D>, Option<E>);

    fn unzip5(self) -> Self::Output {
        if let Some((a, b, c, d, e)) = self {
            (Some(a), Some(b), Some(c), Some(d), Some(e))
        } else {
            (None, None, None, None, None)
        }
    }
}

#[derive(Debug, FromMeta)]
struct MacroArgs {
    #[darling(default)]
    id_descriptor: Option<String>,
}

#[derive(Debug, FromMeta)]
struct SeaOrmArgs {
    table_name: String,
}

pub fn gen_schemas_impl(args: TokenStream, input: TokenStream) -> TokenStream {
    let input = parse_macro_input!(input as ItemStruct);
    let attr_args = match NestedMeta::parse_meta_list(args.into()) {
        Ok(v) => v,
        Err(e) => {
            return TokenStream::from(Error::from(e).write_errors());
        }
    };

    let args = match MacroArgs::from_list(&attr_args) {
        Ok(v) => v,
        Err(e) => {
            return TokenStream::from(e.write_errors());
        }
    };

    let table_args = SeaOrmArgs::from_meta(
        &input
            .attrs
            .iter()
            .find(|attr| attr.path().is_ident("sea_orm"))
            .unwrap()
            .meta,
    )
    .unwrap();

    let details_name = format_ident!(
        "Create{}Schema",
        heck::AsUpperCamelCase(&table_args.table_name).to_string()
    );

    let join = !input
        .fields
        .iter()
        .any(|f| f.ident.as_ref().is_some_and(|ident| ident == "id"));

    let has_password = input
        .fields
        .iter()
        .any(|f| f.ident.as_ref().is_some_and(|ident| ident == "password"));

    let detail_fields = input.fields.iter().filter(|f| {
        f.ident.as_ref().is_some_and(|ident| {
            ident != "id" && ident != "created_at" && ident != "updated_at" && ident != "password"
        })
    });

    let field_names = &detail_fields.clone().map(|f| &f.ident).collect::<Vec<_>>();
    let field_types = &detail_fields.clone().map(|f| &f.ty).collect::<Vec<_>>();

    let (id_field_active_model, id_field_impl_new) = (!join)
        .then_some((
            quote! {
                id: sea_orm::ActiveValue::NotSet,
            },
            quote! {
                id: Uuid::now_v7(),
            },
        ))
        .unzip();

    let (struct_field, active_model_field, fn_struct_field, model_gen_fn, model_gen_method) =
        has_password
            .then_some((
                quote! { password: String, },
                quote! { password: sea_orm::ActiveValue::Set(password) },
                quote! { password },
                quote! {
                    use argon2::password_hash::SaltString;
                    use argon2::password_hash::rand_core::OsRng;
                    use argon2::{Argon2, PasswordHash, PasswordHasher};

                    let salt = SaltString::generate(&mut OsRng);
                    let password = Argon2::default()
                        .hash_password(password.as_bytes(), &salt).unwrap()
                        .to_string();
                },
                quote! {
                    use argon2::password_hash::SaltString;
                    use argon2::password_hash::rand_core::OsRng;
                    use argon2::{Argon2, PasswordHash, PasswordHasher};

                    let salt = SaltString::generate(&mut OsRng);
                    let password = Argon2::default()
                        .hash_password(self.password.as_bytes(), &salt).unwrap()
                        .to_string();
                },
            ))
            .unzip5();

    let into_active_model = quote! {
        fn into_active_model(self) -> ActiveModel {
            #model_gen_method

            ActiveModel {
                #id_field_active_model
                created_at: sea_orm::ActiveValue::NotSet,
                updated_at: sea_orm::ActiveValue::Set(chrono::Utc::now().fixed_offset()),
                #(#field_names: sea_orm::ActiveValue::Set(self.#field_names),)*
                #active_model_field
            }
        }
    };

    let impl_new = quote! {
        impl Model {
            pub fn new(#(#field_names: impl Into<#field_types>,)* #struct_field) -> Self {
                let now = chrono::Utc::now().fixed_offset();
                #model_gen_fn

                Self {
                    #id_field_impl_new
                    created_at: now,
                    updated_at: now,
                    #(#field_names: #field_names.into(),)*
                    #fn_struct_field
                }
            }
        }
    };

    let update_schema = join.then(|| {
        let update_schema_name = format_ident!(
            "Update{}Schema",
            heck::AsUpperCamelCase(&table_args.table_name).to_string()
        );

        let update_fields = detail_fields
            .clone()
            .filter_map(|f| {
                f.ident
                    .as_ref()
                    .and_then(|ident| (!ident.to_string().ends_with("_id")).then_some(ident))
            })
            .collect::<Vec<_>>();
        let update_types = detail_fields.clone().filter_map(|f| {
            f.ident
                .as_ref()
                .and_then(|ident| (!ident.to_string().ends_with("_id")).then_some(&f.ty))
        });

        let id_fields = detail_fields.clone().filter_map(|f| {
            f.ident
                .as_ref()
                .and_then(|ident| ident.to_string().ends_with("_id").then_some(ident))
        });

        quote! {
            #[derive(Debug, Clone, serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
            pub struct #update_schema_name {
                #(pub #update_fields: #update_types,)*
                #struct_field
            }

            impl sea_orm::IntoActiveModel<ActiveModel> for #update_schema_name {
                fn into_active_model(self) -> ActiveModel {
                    #model_gen_method

                    ActiveModel {
                        #(#id_fields: sea_orm::ActiveValue::NotSet,)*
                        created_at: sea_orm::ActiveValue::NotSet,
                        updated_at: sea_orm::ActiveValue::Set(chrono::Utc::now().fixed_offset()),
                        #(#update_fields: sea_orm::ActiveValue::Set(self.#update_fields),)*
                        #active_model_field
                    }
                }
            }
        }
    });

    let struct_ident = format_ident!(
        "{}IdSchema",
        heck::AsUpperCamelCase(&table_args.table_name).to_string()
    );
    let model_ident = format_ident!(
        "{}Model",
        heck::AsUpperCamelCase(&table_args.table_name).to_string()
    );

    let id_schema_struct = if join {
        let id_fields = input.fields.iter().filter_map(|f| {
            f.ident
                .as_ref()
                .and_then(|ident| ident.to_string().ends_with("_id").then_some(ident))
        });
        quote! {
            #[derive(
                Debug,
                Clone,
                serde::Serialize,
                serde::Deserialize,
                sea_orm::FromQueryResult,
                utoipa::ToSchema,
                sea_orm::DerivePartialModel,
            )]
            #[sea_orm(entity = "Entity")]
            pub struct #struct_ident {
                #(pub #id_fields: Uuid,)*
            }
        }
    } else {
        let descriptor_field = args.id_descriptor.map(|desc| {
            let ident = format_ident!("{desc}");

            quote! { pub #ident: String, }
        });

        quote! {
            #[derive(
                Debug,
                Clone,
                serde::Serialize,
                serde::Deserialize,
                sea_orm::FromQueryResult,
                utoipa::ToSchema,
                sea_orm::DerivePartialModel,
            )]
            #[sea_orm(entity = "Entity")]
            pub struct #struct_ident {
                pub id: Uuid,
                #descriptor_field
            }
        }
    };

    quote! {
        #[derive(utoipa::ToSchema)]
        #[schema(as = #model_ident)]
        #input

        #[derive(Debug, Clone, serde::Serialize, serde::Deserialize, utoipa::ToSchema, sea_orm::FromQueryResult, sea_orm::DerivePartialModel)]
        #[sea_orm(entity = "Entity")]
        pub struct #details_name {
            #(pub #field_names: #field_types,)*
            #struct_field
        }

        impl sea_orm::IntoActiveModel<ActiveModel> for #details_name {
            #into_active_model
        }

        #id_schema_struct

        #update_schema

        #impl_new
    }
    .into()
}
