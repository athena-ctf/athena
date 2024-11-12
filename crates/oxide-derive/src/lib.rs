use proc_macro::TokenStream;

mod crud;
mod details;
mod json_path;

#[proc_macro_derive(Details, attributes(oxide))]
pub fn derive_details(input: TokenStream) -> TokenStream {
    details::derive_details_impl(input)
}

#[proc_macro_derive(JsonPath)]
pub fn derive_json_path(input: TokenStream) -> TokenStream {
    json_path::derive_json_path_impl(input)
}

#[proc_macro]
pub fn crud(input: TokenStream) -> TokenStream {
    crud::crud_impl(input)
}
