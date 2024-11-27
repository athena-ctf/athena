use darling::{ast, util, FromDeriveInput, FromField};
use proc_macro::TokenStream;
use quote::{format_ident, quote};
use syn::{parse_macro_input, DeriveInput, Ident, Type};

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
        heck::AsUpperCamelCase(input.table_name).to_string()
    );

    let binding = input.data.take_struct().unwrap();
    let join = !binding
        .fields
        .iter()
        .any(|f| f.ident.as_ref().is_some_and(|ident| ident == "id"));

    let detail_fields = binding.fields.iter().filter(|f| {
        f.ident.as_ref().is_some_and(|ident| {
            (if join {
                !ident.to_string().ends_with("_id")
            } else {
                ident != "id"
            }) && ident != "created_at"
                && ident != "updated_at"
        })
    });

    let join_id_fields = &binding
        .fields
        .iter()
        .filter_map(|f| {
            f.ident
                .as_ref()
                .and_then(|ident| (join && ident.to_string().ends_with("_id")).then_some(ident))
        })
        .collect::<Vec<_>>();

    let field_names = &detail_fields.clone().map(|f| &f.ident).collect::<Vec<_>>();
    let field_types = &detail_fields.clone().map(|f| &f.ty).collect::<Vec<_>>();

    let (id_field_active_model, id_field_impl_new) = if join {
        (
            quote! {
                #(#join_id_fields: sea_orm::ActiveValue::NotSet,)*
            },
            quote! {
                #(#join_id_fields: #join_id_fields.into(),)*
            },
        )
    } else {
        (
            quote! {
                id: sea_orm::ActiveValue::NotSet,
            },
            quote! {
                id: Uuid::now_v7(),
            },
        )
    };

    let into_active_model = quote! {
        fn into_active_model(self) -> ActiveModel {
            ActiveModel {
                #id_field_active_model
                created_at: sea_orm::ActiveValue::NotSet,
                updated_at: sea_orm::ActiveValue::Set(chrono::Utc::now().fixed_offset()),
                #(#field_names: sea_orm::ActiveValue::Set(self.#field_names),)*
            }
        }
    };

    let impl_new = quote! {
        impl Model {
            pub fn new(#(#join_id_fields: impl Into<Uuid>,)* #(#field_names: impl Into<#field_types>,)*) -> Self {
                let now = chrono::Utc::now().fixed_offset();

                Self {
                    #id_field_impl_new
                    created_at: now,
                    updated_at: now,
                    #(#field_names: #field_names.into(),)*
                }
            }
        }
    };

    quote! {
        #[derive(Debug, Clone, serde::Serialize, serde::Deserialize, utoipa::ToSchema, sea_orm::FromQueryResult, sea_orm::DerivePartialModel)]
        #[sea_orm(entity = "Entity")]
        pub struct #details_name {
            #(pub #field_names: #field_types,)*
        }

        impl sea_orm::IntoActiveModel<ActiveModel> for #details_name {
            #into_active_model
        }

        #impl_new
    }
    .into()
}
