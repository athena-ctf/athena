pub mod achievement;
pub mod admin;
pub mod ban;
pub mod challenge;
pub mod challenge_tag;
pub mod file;
pub mod flag;
pub mod hint;
pub mod instance;
pub mod invite;
pub mod leaderboard;
pub mod notification;
pub mod player;
pub mod submission;
pub mod tag;
pub mod team;
pub mod ticket;
pub mod unlock;
pub mod user;

use sea_orm::prelude::*;

use crate::errors::Result;
use crate::schemas::StatSchema;

pub async fn stats(db: &DbConn) -> Result<StatSchema> {
    Ok(StatSchema {
        achievement: entity::achievement::Entity::find().count(db).await?,
        ban: entity::ban::Entity::find().count(db).await?,
        challenge: entity::challenge::Entity::find().count(db).await?,
        file: entity::file::Entity::find().count(db).await?,
        flag: entity::flag::Entity::find().count(db).await?,
        hint: entity::hint::Entity::find().count(db).await?,
        instance: entity::instance::Entity::find().count(db).await?,
        invite: entity::invite::Entity::find().count(db).await?,
        notification: entity::notification::Entity::find().count(db).await?,
        player: entity::player::Entity::find().count(db).await?,
        submission: entity::submission::Entity::find().count(db).await?,
        tag: entity::tag::Entity::find().count(db).await?,
        team: entity::team::Entity::find().count(db).await?,
        unlocks: entity::unlock::Entity::find().count(db).await?,
    })
}
