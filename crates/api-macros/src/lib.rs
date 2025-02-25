use proc_macro::TokenStream;

mod crud;
mod crud_join;
mod docker_wrapper;
mod gen_schemas;
mod json_path;
mod rbac;

#[proc_macro_derive(JsonPath)]
pub fn derive_json_path(input: TokenStream) -> TokenStream {
    json_path::derive_json_path_impl(input)
}

#[proc_macro]
pub fn crud(input: TokenStream) -> TokenStream {
    crud::crud_impl(input)
}

#[proc_macro]
pub fn crud_join(input: TokenStream) -> TokenStream {
    crud_join::crud_join_impl(input)
}

#[proc_macro_attribute]
pub fn gen_schemas(attrs: TokenStream, input: TokenStream) -> TokenStream {
    gen_schemas::gen_schemas_impl(attrs, input)
}

#[proc_macro_attribute]
pub fn docker_wrapper(attrs: TokenStream, input: TokenStream) -> TokenStream {
    docker_wrapper::docker_wrapper_impl(attrs, input)
}

#[proc_macro_attribute]
pub fn rbac(attrs: TokenStream, input: TokenStream) -> TokenStream {
    rbac::rbac_impl(attrs, input)
}

#[proc_macro]
pub fn url_mappings(input: TokenStream) -> TokenStream {
    rbac::url_mappings_impl(input)
}
