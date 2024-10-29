use chrono::Utc;
use entity::prelude::*;
use oxide_macros::join_crud_interface_db;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use crate::errors::Result;

join_crud_interface_db!(Submission, Challenge, Player);
