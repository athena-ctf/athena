use entity::prelude::*;
use oxide_macros::{crud_interface_db, optional_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use crate::errors::Result;

crud_interface_db!(Ban);

optional_relation_db!(Ban, Team);
optional_relation_db!(Ban, Player);
