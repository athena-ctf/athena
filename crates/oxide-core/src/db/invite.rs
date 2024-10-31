use entity::prelude::*;
use oxide_macros::{crud_interface_db, single_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use crate::errors::{Error, Result};

crud_interface_db!(Invite);
single_relation_db!(Invite, Team);

pub async fn verify(id: Uuid, team_name: String, db: &DbConn) -> Result<Uuid> {
    let Some(team_model) = Team::find()
        .filter(entity::team::Column::Name.eq(&team_name))
        .one(db)
        .await?
    else {
        return Err(Error::NotFound("Team not found".to_owned()));
    };

    let Some(invite_model) = team_model
        .find_related(Invite)
        .filter(entity::invite::Column::Id.eq(id))
        .one(db)
        .await?
    else {
        return Err(Error::NotFound("invalid invite code".to_owned()));
    };

    if invite_model.remaining == 0 {
        return Err(Error::BadRequest("invite used up".to_owned()));
    }

    Ok(team_model.id)
}

pub async fn accept(id: Uuid, db: &DbConn) -> Result<()> {
    Invite::update_many()
        .col_expr(
            entity::invite::Column::Remaining,
            Expr::col(entity::invite::Column::Remaining).sub(1),
        )
        .filter(entity::invite::Column::Id.eq(id))
        .exec(db)
        .await?;

    Ok(())
}
