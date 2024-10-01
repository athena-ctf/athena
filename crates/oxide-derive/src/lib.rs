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

#[proc_macro_derive(Details, attributes(oxide))]
pub fn derive_details(input: TokenStream) -> TokenStream {
    let input =
        DetailsDerive::from_derive_input(&parse_macro_input!(input as DeriveInput)).unwrap();
    let details_name = format_ident!("{}Details", input.table.name);

    let binding = input.data.take_struct().unwrap();
    let detail_fields = binding.fields.iter().filter(|f| {
        f.ident
            .as_ref()
            .is_some_and(|ident| ident != "id" && ident != "date_created")
    });

    let field_names = detail_fields.clone().map(|f| &f.ident);
    let field_names_cloned = field_names.clone();
    let field_types = detail_fields.clone().map(|f| &f.ty);

    let into_active_model = if input.table.join {
        quote! {
            fn into_active_model(self) -> ActiveModel {
                ActiveModel {
                    date_created: sea_orm::ActiveValue::Set(chrono::Utc::now().naive_utc()),
                    #(#field_names: sea_orm::ActiveValue::Set(self.#field_names),)*
                }
            }
        }
    } else {
        quote! {
            fn into_active_model(self) -> ActiveModel {
                ActiveModel {
                    id: sea_orm::ActiveValue::Set(uuid::Uuid::now_v7()),
                    date_created: sea_orm::ActiveValue::Set(chrono::Utc::now().naive_utc()),
                    #(#field_names: sea_orm::ActiveValue::Set(self.#field_names),)*
                }
            }
        }
    };

    quote! {
        #[derive(Debug, Clone, serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
        pub struct #details_name {
            #(pub #field_names_cloned: #field_types,)*
        }

        impl sea_orm::IntoActiveModel<ActiveModel> for #details_name {
            #into_active_model
        }
    }
    .into()
}
