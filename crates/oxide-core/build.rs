use std::collections::BTreeMap;
use std::path::Path;

use quote::quote;

#[derive(serde::Deserialize, Clone, Copy)]
struct ObjectPerms {
    create: RoleEnum,
    read: RoleEnum,
    update: RoleEnum,
    delete: RoleEnum,
}

#[derive(serde::Deserialize, Clone, Copy)]
#[serde(rename_all = "lowercase")]
#[repr(u8)]
pub enum RoleEnum {
    Analyst,
    Editor,
    Judge,
    Manager,
    Moderator,
}

#[derive(serde::Deserialize)]
struct PermissionsConfig(BTreeMap<String, ObjectPerms>);

fn main() {
    let config: PermissionsConfig =
        toml::from_str(include_str!("permissions.toml")).expect("Failed to parse permissions.toml");

    let objects: Vec<_> = config.0.keys().collect();
    let requirements = config
        .0
        .values()
        .map(
            |&ObjectPerms {
                 create,
                 read,
                 update,
                 delete,
             }| {
                let create = create as usize;
                let update = update as usize;
                let delete = delete as usize;
                let read = read as usize;

                quote! {
                    [#create, #read, #update, #delete]
                }
            },
        )
        .collect::<Vec<_>>();

    let perm_file = quote! {
        const OBJECT_NAMES: &[&str] = &[#(#objects),*];
        const REQUIREMENTS: &[[usize; 4]] = &[#(#requirements),*];
    };

    std::fs::write(
        Path::new(&std::env::var("OUT_DIR").unwrap()).join("permissions.rs"),
        perm_file.to_string(),
    )
    .expect("Failed to write permissions file");
}
