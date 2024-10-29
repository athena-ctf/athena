use entity::prelude::*;
use oxide_macros::{crud_interface_db, single_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use crate::errors::{Error, Result};

crud_interface_db!(Achievement);

single_relation_db!(Achievement, Challenge);
single_relation_db!(Achievement, Player);
