use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use chrono::Utc;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::details::prelude::*;
use super::CachedValue;
use crate::entity;
use crate::entity::prelude::*;
use crate::errors::{AthenaError, Result};
use crate::macros::db::{crud_interface, single_relation};

crud_interface!(Invite);
single_relation!(Invite, Team);
