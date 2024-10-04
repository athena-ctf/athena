use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use chrono::Utc;
use entity::prelude::*;
use oxide_macros::bind_crud_interface_db;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::CachedValue;
use crate::errors::Result;

bind_crud_interface_db!(Submission, Challenge, Player);
