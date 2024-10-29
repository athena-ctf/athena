use entity::prelude::*;
use oxide_macros::{crud_interface_db, single_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use crate::errors::{Error, Result};
use crate::schemas::{VerifyInviteResponse, VerifyInviteResponseKind};

crud_interface_db!(Invite);
single_relation_db!(Invite, Team);

pub async fn verify_invite(
    id: Uuid,
    team_name: String,
    db: &DbConn,
) -> Result<VerifyInviteResponse> {
    let Some(team_model) = Team::find()
        .filter(entity::team::Column::Name.eq(&team_name))
        .one(db)
        .await?
    else {
        return Ok(VerifyInviteResponse {
            response_kind: VerifyInviteResponseKind::TeamNotFound,
        });
    };

    let Some(invite_model) = team_model
        .find_related(Invite)
        .filter(entity::invite::Column::Id.eq(id))
        .one(db)
        .await?
    else {
        return Ok(VerifyInviteResponse {
            response_kind: VerifyInviteResponseKind::InviteNotFound,
        });
    };

    if invite_model.remaining == 0 {
        return Ok(VerifyInviteResponse {
            response_kind: VerifyInviteResponseKind::InviteUsedUp,
        });
    }

    Ok(VerifyInviteResponse {
        response_kind: VerifyInviteResponseKind::Valid,
    })
}
