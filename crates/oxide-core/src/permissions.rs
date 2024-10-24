use axum::http::Method;
use entity::prelude::RoleEnum;

include!(concat!(env!("OUT_DIR"), "/permissions.rs"));

#[derive(Clone, Copy)]
#[repr(u8)]
pub enum Action {
    Create = 0,
    Read = 1,
    Update = 2,
    Delete = 3,
}

pub fn can_do_action(action: Action, object: &str, role: usize) -> bool {
    OBJECT_NAMES.binary_search(&object).map_or(false, |idx| {
        let required = REQUIREMENTS[idx][action as usize];
        role >= required
    })
}

pub fn has_permission(method: &Method, url: &str, role: RoleEnum) -> bool {
    match url.split('/').collect::<Vec<_>>().as_slice() {
        [base] if matches!(*method, Method::GET | Method::POST) => {
            if method == Method::GET {
                can_do_action(Action::Read, base, role as usize)
            } else {
                can_do_action(Action::Create, base, role as usize)
            }
        }
        [base, _] if matches!(*method, Method::GET | Method::DELETE | Method::PUT) => {
            if method == Method::GET {
                can_do_action(Action::Read, base, role as usize)
            } else if method == Method::DELETE {
                can_do_action(Action::Delete, base, role as usize)
            } else {
                can_do_action(Action::Update, base, role as usize)
            }
        }
        _ => true,
    }
}
