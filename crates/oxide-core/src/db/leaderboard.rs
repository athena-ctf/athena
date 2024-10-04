use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use entity::prelude::*;
use oxide_macros::crud_interface_db;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::CachedValue;
use crate::errors::Result;

crud_interface_db!(Leaderboard);
