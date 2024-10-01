use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use oxide_macros::{crud_interface_db, single_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::CachedValue;
use crate::entity::prelude::*;
use crate::errors::{Error, Result};

crud_interface_db!(Notification);
single_relation_db!(Notification, Player);
