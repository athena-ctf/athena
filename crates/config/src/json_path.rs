use chrono::{DateTime, Utc};
use indexmap::IndexMap;
use serde::Serialize;
use serde::de::DeserializeOwned;
use serde_json::Value;

pub trait JsonPath: Serialize + DeserializeOwned {
    fn retrieve_at(&self, segments: &[String]) -> Option<Value>;
    fn update_at(&mut self, segments: &[String], value: Value) -> bool;

    fn update_value<T: serde::Serialize + serde::de::DeserializeOwned + Clone>(
        value: &mut T,
        segments: &[String],
        new_value: Value,
    ) -> Result<bool, serde_json::Error> {
        if segments.is_empty() {
            return Ok(false);
        }

        let mut value_json = serde_json::to_value(value.clone())?;

        match value_json {
            Value::Object(ref mut map) => {
                let first = &segments[0];
                if segments.len() == 1 {
                    map.insert(first.clone(), new_value);
                    *value = serde_json::from_value(Value::Object(map.clone()))?;
                    Ok(true)
                } else if let Some(next_value) = map.get_mut(first) {
                    Self::update_value(next_value, &segments[1..], new_value)
                } else {
                    Ok(false)
                }
            }
            Value::Array(ref mut arr) => {
                let first = &segments[0];
                if let Ok(index) = first.parse::<usize>() {
                    if index < arr.len() {
                        if segments.len() == 1 {
                            arr[index] = new_value;
                            *value = serde_json::from_value(Value::Array(arr.clone()))?;
                            Ok(true)
                        } else if let Some(next_value) = arr.get_mut(index) {
                            Self::update_value(next_value, &segments[1..], new_value)
                        } else {
                            Ok(false)
                        }
                    } else {
                        Ok(false)
                    }
                } else {
                    Ok(false)
                }
            }
            _ => Ok(false),
        }
    }
}

macro_rules! impl_json_path_terminal {
    ($type:ty) => {
        impl JsonPath for $type {
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
    };
}

impl_json_path_terminal!(String);
impl_json_path_terminal!(i8);
impl_json_path_terminal!(i16);
impl_json_path_terminal!(i32);
impl_json_path_terminal!(i64);
impl_json_path_terminal!(i128);
impl_json_path_terminal!(isize);
impl_json_path_terminal!(u8);
impl_json_path_terminal!(u16);
impl_json_path_terminal!(u32);
impl_json_path_terminal!(u64);
impl_json_path_terminal!(u128);
impl_json_path_terminal!(usize);
impl_json_path_terminal!(f32);
impl_json_path_terminal!(f64);
impl_json_path_terminal!(bool);
impl_json_path_terminal!(DateTime<Utc>);

impl<T: JsonPath> JsonPath for Option<T> {
    fn retrieve_at(&self, segments: &[String]) -> Option<Value> {
        self.as_ref().and_then(|value| value.retrieve_at(segments))
    }

    fn update_at(&mut self, segments: &[String], value: Value) -> bool {
        if let Some(inner) = self {
            return inner.update_at(segments, value);
        }

        let Ok(inner) = serde_json::from_value(value) else {
            return false;
        };
        *self = Some(inner);

        true
    }
}

impl<T: JsonPath + Clone> JsonPath for Vec<T> {
    fn retrieve_at(&self, segments: &[String]) -> Option<Value> {
        if segments.is_empty() {
            return serde_json::to_value(self).ok();
        }

        let first = &segments[0];
        first.parse::<usize>().ok().and_then(|index| {
            if index < self.len() {
                self[index].retrieve_at(&segments[1..])
            } else {
                None
            }
        })
    }

    fn update_at(&mut self, segments: &[String], value: Value) -> bool {
        if segments.is_empty() {
            return false;
        }

        let first = &segments[0];
        first.parse::<usize>().is_ok_and(|index| {
            if index < self.len() {
                self[index].update_at(&segments[1..], value)
            } else {
                false
            }
        })
    }
}

impl<V: JsonPath + Clone> JsonPath for IndexMap<String, V> {
    fn retrieve_at(&self, segments: &[String]) -> Option<Value> {
        if segments.is_empty() {
            return serde_json::to_value(self).ok();
        }

        let first = &segments[0];
        self.get(first).and_then(|value| {
            if segments.len() == 1 {
                value.retrieve_at(&[])
            } else {
                value.retrieve_at(&segments[1..])
            }
        })
    }

    fn update_at(&mut self, segments: &[String], value: Value) -> bool {
        if segments.is_empty() {
            return false;
        }

        let first = &segments[0];
        self.get_mut(first).is_some_and(|existing_value| {
            if segments.len() == 1 {
                existing_value.update_at(&[], value)
            } else {
                existing_value.update_at(&segments[1..], value)
            }
        })
    }
}

impl<V: JsonPath + Clone> JsonPath for IndexMap<i32, V> {
    fn retrieve_at(&self, segments: &[String]) -> Option<Value> {
        if segments.is_empty() {
            return serde_json::to_value(self).ok();
        }

        let first = segments[0].parse::<i32>().unwrap();
        self.get(&first).and_then(|value| value.retrieve_at(&segments[1..]))
    }

    fn update_at(&mut self, segments: &[String], value: Value) -> bool {
        if segments.is_empty() {
            return false;
        }

        let first = segments[0].parse::<i32>().unwrap();
        self.get_mut(&first)
            .is_some_and(|existing_value| existing_value.update_at(&segments[1..], value))
    }
}
