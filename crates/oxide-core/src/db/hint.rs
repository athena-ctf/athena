use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use oxide_macros::{crud_interface_db, multiple_relation_db, single_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::CachedValue;
use crate::entity::prelude::*;
use crate::errors::{Error, Result};

crud_interface_db!(Hint);

single_relation_db!(Hint, Challenge);
multiple_relation_db!(Hint, Unlock);

pub async fn unlock(hint_id: Uuid, player_id: Uuid, db: &DbConn) -> Result<Option<HintModel>> {
    super::unlock::create(UnlockDetails { player_id, hint_id }, db).await?;

    let Some(hint_model) = Hint::find_by_id(hint_id).one(db).await? else {
        return Ok(None);
    };
    let player_model = Player::find_by_id(player_id).one(db).await?.unwrap();
    let score = player_model.score;

    let mut active_model = player_model.into_active_model();
    active_model.score = ActiveValue::Set(score - hint_model.cost);

    active_model.update(db).await?;

    Ok(Some(hint_model))
}
