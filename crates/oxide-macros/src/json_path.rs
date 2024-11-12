// lib.rs
use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, Data, DeriveInput};

pub fn derive_json_path_impl(input: TokenStream) -> TokenStream {
    let input = parse_macro_input!(input as DeriveInput);
    let name = input.ident;

    match input.data {
        Data::Struct(struct_data) => {
            let retrieve_fields = struct_data.fields.iter().map(|field| {
                let ident = field.ident.clone().unwrap();
                let ident_str = ident.to_string();

                quote! { #ident_str => self.#ident.retrieve_at(&segments[1..]), }
            });

            let update_fields = struct_data.fields.iter().map(|field| {
                let ident = field.ident.clone().unwrap();
                let ident_str = ident.to_string();

                quote! { #ident_str => self.#ident.update_at(&segments[1..], value), }
            });

            quote! {
                #[automatically_derived]
                impl JsonPath for #name {
                    fn retrieve_at(&self, segments: &[String]) -> Option<serde_json::Value> {
                        if segments.is_empty() {
                            return serde_json::to_value(self).ok();
                        }

                        match segments[0].as_str() {
                            #(#retrieve_fields)*
                            _ => None
                        }
                    }

                    fn update_at(&mut self, segments: &[String], value: serde_json::Value) -> bool {
                        if segments.is_empty() {
                            return false;
                        }

                        match segments[0].as_str() {
                            #(#update_fields)*
                            _ => false
                        }
                    }
                }
            }
            .into()
        }

        Data::Enum(_) => quote! {
            impl JsonPath for #name {
                fn retrieve_at(&self, segments: &[String]) -> Option<Value> {
                    if segments.is_empty() {
                        serde_json::to_value(self).ok()
                    } else {
                        None
                    }
                }

                fn update_at(&mut self, segments: &[String], value: Value) -> bool {
                    if segments.is_empty() {
                        if let Ok(new_value) = serde_json::from_value(value) {
                            *self = new_value;
                            true
                        } else {
                            false
                        }
                    } else {
                        false
                    }
                }
            }
        }
        .into(),

        Data::Union(_) => panic!("Cannot derive"),
    }
}
