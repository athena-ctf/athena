use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use oxide_macros::{crud_interface_db, multiple_relation_db, optional_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::CachedValue;
use crate::entity;
use crate::entity::prelude::*;
use crate::errors::Result;

crud_interface_db!(Team);

optional_relation_db!(Team, Ban);

multiple_relation_db!(Team, Player);
multiple_relation_db!(Team, Invite);

pub async fn retrieve_by_name(name: &str, db: &DbConn) -> Result<Option<TeamModel>> {
    Ok(Team::find()
        .filter(entity::team::Column::Name.eq(name))
        .one(db)
        .await?)
}

pub async fn ban(id: Uuid, details: BanDetails, db: &DbConn) -> Result<Option<BanModel>> {
    if let Some(team) = Team::find_by_id(id).one(db).await? {
        let ban_model = crate::db::ban::create(details, db).await?;
        let mut active_team = team.into_active_model();
        active_team.ban_id = ActiveValue::Set(Some(ban_model.id));

        active_team.update(db).await?;

        Ok(Some(ban_model))
    } else {
        Ok(None)
    }
}
