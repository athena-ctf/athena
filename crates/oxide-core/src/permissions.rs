// include!(concat!(env!("OUT_DIR"), "/permissions.rs"));

// macro_rules! check_permission {
//     ($req:expr, $got:expr) => {
//         if $got < $req {
//             return Err(Error::Forbidden(
//                 "Cannot perform action due to insufficient permissions".to_owned(),
//             ));
//         }
//     };
// }

// pub(crate) use check_permission;
