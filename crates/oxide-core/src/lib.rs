pub mod api;
pub mod docker;
pub mod errors;
pub mod handlers;
pub mod mail;
pub mod middleware;
pub mod permissions;
pub mod schemas;
pub mod service;
pub mod templates;
pub mod token;

pub fn gen_random(size: usize) -> String {
    std::iter::repeat_with(fastrand::alphanumeric)
        .take(size)
        .collect()
}
