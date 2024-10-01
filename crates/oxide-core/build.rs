use std::collections::BTreeMap;
use std::path::Path;

use codegen::{Scope, Type};
use heck::{AsPascalCase, AsShoutySnekCase};

type PermissionTable = BTreeMap<String, BTreeMap<String, usize>>;

fn main() {
    let table = toml::from_str::<PermissionTable>(include_str!("permissions.toml")).unwrap();
    let mut scope = Scope::new();

    for (obj, actions) in table {
        let struct_name = AsPascalCase(obj).to_string() + "Perms";
        let struct_name = struct_name.as_str();

        scope.new_struct(struct_name).vis("pub");
        let obj_impl = scope.new_impl(struct_name);

        for (action, min_role) in actions {
            obj_impl.associate_const(
                AsShoutySnekCase(action).to_string(),
                Type::new("usize"),
                min_role.to_string(),
                "pub",
            );
        }
    }

    std::fs::write(
        Path::new(&std::env::var("OUT_DIR").unwrap()).join("permissions.rs"),
        scope.to_string(),
    )
    .unwrap();
}
