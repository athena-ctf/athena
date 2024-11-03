use entity::prelude::*;
use oxide_macros::{crud_interface_db, multiple_relation_db, single_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use crate::errors::{Error, Result};

crud_interface_db!(Deployment);

single_relation_db!(Deployment, Challenge);
single_relation_db!(Deployment, Player);

multiple_relation_db!(Deployment, Instance);
