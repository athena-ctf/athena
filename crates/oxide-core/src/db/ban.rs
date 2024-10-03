use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use oxide_macros::{crud_interface_db, optional_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::CachedValue;
use entity::prelude::*;
use crate::errors::Result;

crud_interface_db!(Ban);

optional_relation_db!(Ban, Team);
optional_relation_db!(Ban, Player);
