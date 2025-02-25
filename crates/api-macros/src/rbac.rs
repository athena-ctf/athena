use proc_macro::TokenStream;
use quote::{format_ident, quote};
use syn::parse::Parse;
use syn::punctuated::Punctuated;
use syn::{ExprPath, ItemFn, LitStr, Token, parse_macro_input};

pub fn rbac_impl(attrs: TokenStream, input: TokenStream) -> TokenStream {
    let operation = parse_macro_input!(input as ItemFn);
    let permission = parse_macro_input!(attrs as LitStr);

    let ident = format_ident!("__rbac_{}", operation.sig.ident);

    quote! {
        #operation

        pub fn #ident() -> String {
            #permission.to_owned()
        }
    }
    .into()
}

struct UrlMappingsMacroInput {
    paths: Vec<ExprPath>,
}

impl Parse for UrlMappingsMacroInput {
    fn parse(input: syn::parse::ParseStream) -> syn::Result<Self> {
        let paths: Punctuated<ExprPath, Token![,]> = input.parse_terminated(ExprPath::parse, Token![,])?;

        Ok(Self {
            paths: paths.into_iter().collect(),
        })
    }
}

pub fn url_mappings_impl(input: TokenStream) -> TokenStream {
    let urls = parse_macro_input!(input as UrlMappingsMacroInput);
    let paths = urls
        .paths
        .into_iter()
        .map(|expr| {
            let segments = expr
                .path
                .segments
                .into_iter()
                .map(|segment| segment.ident.to_string())
                .collect::<Vec<_>>();

            let mut openapi_path = segments.clone();
            if let Some(last) = openapi_path.last_mut() {
                let old = last.clone();

                *last = format!("__path_{old}")
            }
            let openapi_path = syn::parse_str::<ExprPath>(&openapi_path.join("::")).unwrap();

            let mut perm_path = segments.clone();
            if let Some(last) = perm_path.last_mut() {
                let old = last.clone();

                *last = format!("__rbac_{old}")
            }
            let perm_path = syn::parse_str::<ExprPath>(&perm_path.join("::")).unwrap();

            quote! {
                ((to_method(<#openapi_path as utoipa::Path>::methods()[0].clone()), <#openapi_path as utoipa::Path>::path()), #perm_path()),
            }
        })
        .collect::<Vec<_>>();

    quote! {
        HashMap::from([
            #(#paths)*
        ])
    }
    .into()
}
