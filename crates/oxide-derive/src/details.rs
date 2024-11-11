use darling::{ast, util, FromDeriveInput, FromField, FromMeta};
use proc_macro::TokenStream;
use quote::{format_ident, quote};
use syn::{parse_macro_input, DeriveInput, Ident, Type};

#[derive(Debug, FromField)]
struct TableField {
    ident: Option<Ident>,
    ty: Type,
}

#[derive(Default, FromMeta)]
#[darling(default)]
struct Table {
    join: bool,
    impl_new: bool,
    name: String,
}

#[derive(FromDeriveInput)]
#[darling(
    attributes(oxide),
    forward_attrs(allow, doc, cfg),
    supports(struct_named)
)]
struct DetailsDerive {
    data: ast::Data<util::Ignored, TableField>,
    table: Table,
}

pub fn derive_details_impl(input: TokenStream) -> TokenStream {
    let input =
        DetailsDerive::from_derive_input(&parse_macro_input!(input as DeriveInput)).unwrap();
    let details_name = format_ident!("Create{}Schema", input.table.name);

    let binding = input.data.take_struct().unwrap();
    let detail_fields = binding.fields.iter().filter(|f| {
        f.ident
            .as_ref()
            .is_some_and(|ident| ident != "id" && ident != "created_at" && ident != "updated_at")
    });

    let field_names = &detail_fields.clone().map(|f| &f.ident).collect::<Vec<_>>();
    let field_types = &detail_fields.clone().map(|f| &f.ty).collect::<Vec<_>>();

    let into_active_model = if input.table.join {
        quote! {
            fn into_active_model(self) -> ActiveModel {
                ActiveModel {
                    created_at: sea_orm::ActiveValue::NotSet,
                    updated_at: sea_orm::ActiveValue::Set(chrono::Utc::now().naive_utc()),
                    #(#field_names: sea_orm::ActiveValue::Set(self.#field_names),)*
                }
            }
        }
    } else {
        quote! {
            fn into_active_model(self) -> ActiveModel {
                ActiveModel {
                    id: sea_orm::ActiveValue::NotSet,
                    created_at: sea_orm::ActiveValue::NotSet,
                    updated_at: sea_orm::ActiveValue::Set(chrono::Utc::now().naive_utc()),
                    #(#field_names: sea_orm::ActiveValue::Set(self.#field_names),)*
                }
            }
        }
    };

    let impl_new = input.table.impl_new.then(|| {
        if input.table.join {
            quote! {
                impl Model {
                    pub fn new(#(#field_names: impl Into<#field_types>,)*) -> Self {
                        let now = chrono::Utc::now().naive_utc();

                        Self {
                            created_at: now,
                            updated_at: now,
                            #(#field_names: #field_names.into(),)*
                        }
                    }
                }
            }
        } else {
            quote! {
                impl Model {
                    pub fn new(#(#field_names: impl Into<#field_types>,)*) -> Self {
                        let now = chrono::Utc::now().naive_utc();

                        Self {
                            id: uuid::Uuid::now_v7(),
                            created_at: now,
                            updated_at: now,
                            #(#field_names: #field_names.into(),)*
                        }
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
        }

        impl sea_orm::IntoActiveModel<ActiveModel> for #details_name {
            #into_active_model
        }

        #impl_new
    }
    .into()
}
