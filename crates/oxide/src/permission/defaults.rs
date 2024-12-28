use std::collections::HashMap;

macro_rules! map {
    ($($key:expr => $value:expr,)*) => {
        HashMap::from([
            $(
                ($key.into(), $value),
            )*
        ])
    };
}

// TODO: add proper permissions
pub fn get() -> HashMap<String, Vec<String>> {
    map! {
        "moderator" => vec![],
        "editor" => vec![],
        "analyst" => vec![],
        "judge" => vec![],
    }
}
