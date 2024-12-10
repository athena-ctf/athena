use darling::{FromDeriveInput, FromField, ast, util};
use proc_macro::TokenStream;
use quote::{format_ident, quote};
use syn::{DeriveInput, Ident, Type, parse_macro_input};

trait Unzip5<A, B, C, D, E> {
    fn unzip5(self) -> (Option<A>, Option<B>, Option<C>, Option<D>, Option<E>);
}

impl<A, B, C, D, E> Unzip5<A, B, C, D, E> for Option<(A, B, C, D, E)> {
    fn unzip5(self) -> (Option<A>, Option<B>, Option<C>, Option<D>, Option<E>) {
        if let Some((a, b, c, d, e)) = self {
            (Some(a), Some(b), Some(c), Some(d), Some(e))
        } else {
            (None, None, None, None, None)
        }
    }
}

#[derive(Debug, FromField)]
struct TableField {
    ident: Option<Ident>,
    ty: Type,
}

#[derive(FromDeriveInput)]
#[darling(
    attributes(sea_orm),
    forward_attrs(allow, doc, cfg),
    supports(struct_named)
)]
struct DetailsDerive {
    data: ast::Data<util::Ignored, TableField>,
    table_name: String,
}

pub fn derive_details_impl(input: TokenStream) -> TokenStream {
    let input =
        DetailsDerive::from_derive_input(&parse_macro_input!(input as DeriveInput)).unwrap();
    let details_name = format_ident!(
        "Create{}Schema",
        heck::AsUpperCamelCase(&input.table_name).to_string()
    );

    let binding = input.data.take_struct().unwrap();
    let join = !binding
        .fields
        .iter()
        .any(|f| f.ident.as_ref().is_some_and(|ident| ident == "id"));

    let has_password = binding
        .fields
        .iter()
        .any(|f| f.ident.as_ref().is_some_and(|ident| ident == "password"));

    let detail_fields = binding.fields.iter().filter(|f| {
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
            heck::AsUpperCamelCase(input.table_name).to_string()
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

    quote! {
        #[derive(Debug, Clone, serde::Serialize, serde::Deserialize, utoipa::ToSchema, sea_orm::FromQueryResult, sea_orm::DerivePartialModel)]
        #[sea_orm(entity = "Entity")]
        pub struct #details_name {
            #(pub #field_names: #field_types,)*
            #struct_field
        }

        impl sea_orm::IntoActiveModel<ActiveModel> for #details_name {
            #into_active_model
        }

        #update_schema

        #impl_new
    }
    .into()
}
