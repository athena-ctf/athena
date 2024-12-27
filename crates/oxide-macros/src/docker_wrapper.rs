use darling::ast::NestedMeta;
use darling::{Error, FromMeta};
use proc_macro::TokenStream;
use quote::quote;
use syn::{Data, DeriveInput, Path, Type, parse_macro_input};

#[derive(Debug, FromMeta)]
struct MacroArgs {
    path: String,
}

fn get_field_conversion(field_type: &Type) -> impl quote::ToTokens {
    match field_type {
        Type::Path(type_path) if !type_path.path.segments.is_empty() => {
            let first_segment = &type_path.path.segments[0];
            match first_segment.ident.to_string().as_str() {
                "Option" => {
                    if let syn::PathArguments::AngleBracketed(args) = &first_segment.arguments {
                        if args.args.len() == 1 {
                            if let Some(syn::GenericArgument::Type(inner_type)) = args.args.first()
                            {
                                let inner_conversion = get_field_conversion(inner_type);
                                return quote! { .map(|v| v #inner_conversion) };
                            }
                        }
                    }
                    quote! { .map(Into::into) }
                }
                "Vec" => {
                    if let syn::PathArguments::AngleBracketed(args) = &first_segment.arguments {
                        if args.args.len() == 1 {
                            if let Some(syn::GenericArgument::Type(inner_type)) = args.args.first()
                            {
                                let inner_conversion = get_field_conversion(inner_type);
                                return quote! { .into_iter().map(|v| v #inner_conversion).collect() };
                            }
                        }
                    }
                    quote! { .into_iter().map(Into::into).collect() }
                }
                "HashMap" => {
                    if let syn::PathArguments::AngleBracketed(args) = &first_segment.arguments {
                        if args.args.len() == 2 {
                            if let Some(syn::GenericArgument::Type(inner_type)) = args.args.get(1) {
                                let inner_conversion = get_field_conversion(inner_type);
                                return quote! { .into_iter().map(|(k, v)| (k, v #inner_conversion)).collect() };
                            }
                        }
                    }
                    quote! { .into_iter().map(|(k, v)| (k, v.into())).collect() }
                }
                _ => quote! { .into() },
            }
        }
        _ => quote! { .into() },
    }
}

pub fn docker_wrapper_impl(attrs: TokenStream, input: TokenStream) -> TokenStream {
    let input = &parse_macro_input!(input as DeriveInput);
    let attr_args = match NestedMeta::parse_meta_list(attrs.into()) {
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

    let source_path = syn::parse_str::<Path>(&args.path).unwrap();

    match &input.data {
        Data::Struct(data) => {
            let ident = &input.ident;
            let fields = &data
                .fields
                .iter()
                .map(|f| {
                    let field = &f.ident;
                    let conversion = get_field_conversion(&f.ty);
                    quote! {
                        #field: value.#field #conversion,
                    }
                })
                .collect::<Vec<_>>();

            let impls = vec![
                quote! {
                    impl From<#source_path> for #ident {
                        fn from(value: #source_path) -> Self {
                            Self {
                                #(#fields)*
                            }
                        }
                    }
                },
                quote! {
                    impl From<#ident> for #source_path {
                        fn from(value: #ident) -> Self {
                            Self {
                                #(#fields)*
                            }
                        }
                    }
                },
            ];

            quote! {
                #[derive(serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
                #input

                #(#impls)*
            }
        }

        Data::Enum(data) => {
            let ident = &input.ident;
            let variants = &data.variants.iter().map(|f| &f.ident).collect::<Vec<_>>();
            let impls = vec![
                quote! {
                    impl From<#source_path> for #ident {
                        fn from(value: #source_path) -> Self {
                            match value {
                                #(#source_path::#variants => Self::#variants,)*
                            }
                        }
                    }
                },
                quote! {
                    impl From<#ident> for #source_path {
                        fn from(value: #ident) -> Self {
                            match value {
                                #(#ident::#variants => Self::#variants,)*
                            }
                        }
                    }
                },
            ];

            quote! {
                #[allow(non_camel_case_types)]
                #[derive(serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
                #input

                #(#impls)*
            }
        }

        Data::Union(_) => panic!("Invalid input type"),
    }
    .into()
}
