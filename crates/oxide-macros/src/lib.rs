pub mod macros;
pub use oxide_derive as derive;
pub use paste::paste;
mod json_path;

pub use derive::JsonPath;
pub use json_path::JsonPath;
