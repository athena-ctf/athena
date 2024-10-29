use std::collections::HashMap;

use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use entity::links::{TeamToAchievement, TeamToChallenge, TeamToSubmission, TeamToUnlock};
use entity::prelude::*;
use oxide_macros::{crud_interface_db, multiple_relation_db, optional_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::CachedValue;
use crate::errors::Result;
use crate::schemas::{TagSolves, TeamProfile, TeamSummary};

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

pub async fn ban(id: Uuid, details: CreateBanSchema, db: &DbConn) -> Result<Option<BanModel>> {
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

pub async fn retrieve_team_by_teamname(
    teamname: String,
    db: &DbConn,
) -> Result<Option<TeamProfile>> {
    let Some(team_model) = Team::find()
        .filter(entity::team::Column::Name.eq(&teamname))
        .one(db)
        .await?
    else {
        return Ok(None);
    };

    let players = team_model
        .find_related(Player)
        .into_partial_model::<CreatePlayerSchema>()
        .all(db)
        .await?;
    let mut tags_map = Tag::find()
        .all(db)
        .await?
        .into_iter()
        .map(|tag| {
            (
                tag.value.clone(),
                TagSolves {
                    tag_id: tag.id,
                    tag_value: tag.value,
                    solves: 0,
                },
            )
        })
        .collect::<HashMap<String, TagSolves>>();

    let mut challenges = Vec::new();

    for submitted_challenge in team_model
        .find_linked(TeamToChallenge)
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .all(db)
        .await?
    {
        let tags = crate::db::challenge::related_tags(&submitted_challenge, db).await?;
        for tag in tags {
            tags_map
                .entry(tag.value)
                .and_modify(|tag_solves| tag_solves.solves += 1);
        }

        challenges.push(submitted_challenge);
    }

    Ok(Some(TeamProfile {
        team: team_model,
        solved_challenges: challenges,
        tag_solves: tags_map.values().cloned().collect(),
        members: players,
    }))
}

pub async fn retrieve_team_summary_by_id(id: Uuid, db: &DbConn) -> Result<Option<TeamSummary>> {
    let Some((_, team_model)) = crate::db::player::related_team(id, db).await? else {
        return Ok(None);
    };

    let mut tags_map = Tag::find()
        .all(db)
        .await?
        .into_iter()
        .map(|tag| {
            (
                tag.value.clone(),
                TagSolves {
                    tag_id: tag.id,
                    tag_value: tag.value,
                    solves: 0,
                },
            )
        })
        .collect::<HashMap<String, TagSolves>>();

    for submitted_challenge in team_model
        .find_linked(TeamToChallenge)
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .all(db)
        .await?
    {
        let tags = crate::db::challenge::related_tags(&submitted_challenge, db).await?;
        for tag in tags {
            tags_map
                .entry(tag.value)
                .and_modify(|tag_solves| tag_solves.solves += 1);
        }
    }

    let players = team_model.find_related(Player).all(db).await?;
    let mut members = Vec::with_capacity(players.len());

    for player_model in players {
        members.push(crate::db::player::retrieve_profile(player_model, db).await?);
    }

    Ok(Some(TeamSummary {
        members,
        submissions: team_model.find_linked(TeamToSubmission).all(db).await?,
        unlocks: team_model.find_linked(TeamToUnlock).all(db).await?,
        achievements: team_model.find_linked(TeamToAchievement).all(db).await?,
        team: team_model,
        tag_solves: tags_map.values().cloned().collect(),
    }))
}
