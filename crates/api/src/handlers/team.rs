use std::collections::HashMap;

use entity::links::{TeamToAward, TeamToChallenge, TeamToSubmission, TeamToUnlock};
use sea_orm::{Iterable, QuerySelect};

use crate::jwt::AuthPlayer;
use crate::leaderboard;
use crate::schemas::{AwardsReceived, Challenge, TagSolves, TeamDetails, TeamMember, TeamProfile};

api_macros::crud!(Team, single: [], optional: [], multiple: [Invite, Player]);

async fn get_team_profile(
    team: TeamModel,
    leaderboard_manager: &leaderboard::Manager,
    db: &DbConn,
) -> Result<TeamProfile> {
    let (rank, score) = leaderboard_manager.team_rank(team.id).await?;

    let players = team.find_related(Player).all(db).await?;
    let mut members = Vec::with_capacity(players.len());

    for player_model in players {
        let (rank, score) = leaderboard_manager.player_rank(player_model.id).await?;

        members.push(TeamMember {
            player_id: player_model.id,
            player_username: player_model.username,
            rank,
            score,
        });
    }

    let mut tags_map = Challenge::find()
        .select_only()
        .column(entity::challenge::Column::Tags)
        .into_tuple::<(Vec<String>,)>()
        .all(db)
        .await?
        .into_iter()
        .flat_map(|tags| {
            tags.0.into_iter().map(|tag| {
                (tag.clone(), TagSolves {
                    tag_value: tag,
                    solves: 0,
                })
            })
        })
        .collect::<HashMap<_, _>>();

    let solved_challenges = team
        .find_linked(TeamToChallenge)
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .all(db)
        .await?;

    for solved_challenge in &solved_challenges {
        for tag in &solved_challenge.tags {
            tags_map.get_mut(tag).unwrap().solves += 1;
        }
    }

    let history = leaderboard_manager.team_history(team.id).await?;

    let awards = team
        .find_linked(TeamToAward)
        .select_only()
        .columns(entity::award::Column::iter())
        .column(entity::player_award::Column::Count)
        .into_model::<AwardsReceived>()
        .all(db)
        .await?;

    Ok(TeamProfile {
        team,
        solved_challenges,
        tag_solves: tags_map.values().cloned().collect(),
        awards,
        history,
        members,
        rank,
        score,
    })
}

#[utoipa::path(
    get,
    path = "/player/team/{team_name}/profile",
    params(("team_name" = String, Path)),
    responses(
        (status = 200, body = TeamProfile),
        (status = 401, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn retrieve_team_by_teamname(
    state: State<Arc<AppState>>,
    Path(team_name): Path<String>,
) -> Result<ApiResponse<Json<TeamProfile>>> {
    let Some(team_model) = Team::find()
        .filter(entity::team::Column::Name.eq(&team_name))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Team not found".to_owned()));
    };

    get_team_profile(team_model, &state.leaderboard_manager, &state.db_conn)
        .await
        .map(ApiResponse::json_ok)
}

#[utoipa::path(
    patch,
    path = "/player/team/update-profile",
    params(("id" = Uuid, Path)),
    operation_id = "update_team_profile",
    responses(
        (status = 200, body = TeamModel),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn update_details(
    state: State<Arc<AppState>>,
    AuthPlayer(player_claims): AuthPlayer,
    Json(details): Json<CreateTeamSchema>,
) -> Result<ApiResponse<Json<TeamModel>>> {
    let Some(team_model) = Team::find_by_id(player_claims.team_id).one(&state.db_conn).await? else {
        return Err(Error::BadRequest("Invalid access token".to_owned()));
    };

    if team_model.email != player_claims.email {
        return Err(Error::Forbidden("Cannot edit team if not team owner".to_owned()));
    }

    let mut active_team = details.into_active_model();
    active_team.id = ActiveValue::Set(player_claims.team_id);

    Ok(ApiResponse::json_ok(active_team.update(&state.db_conn).await?))
}

#[utoipa::path(
    get,
    path = "/player/team/summary",
    operation_id = "retrieve_team_summary",
    responses(
        (status = 200, body = TeamDetails),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn retrieve_summary(
    AuthPlayer(player): AuthPlayer,
    state: State<Arc<AppState>>,
) -> Result<ApiResponse<Json<TeamDetails>>> {
    let Some(team_model) = Team::find()
        .left_join(Player)
        .filter(entity::player::Column::Id.eq(player.sub))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::BadRequest("Invalid access token".to_owned()));
    };

    let invites = team_model.find_related(Invite).all(&state.db_conn).await?;

    Ok(ApiResponse::json_ok(TeamDetails {
        submissions: team_model.find_linked(TeamToSubmission).all(&state.db_conn).await?,
        unlocks: team_model.find_linked(TeamToUnlock).all(&state.db_conn).await?,
        profile: get_team_profile(team_model, &state.leaderboard_manager, &state.db_conn).await?,
        invites,
    }))
}
