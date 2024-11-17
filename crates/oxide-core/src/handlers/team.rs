use std::collections::HashMap;

use entity::links::{TeamToAchievement, TeamToChallenge, TeamToSubmission, TeamToUnlock};

use crate::schemas::{
    AuthPlayer, CreateTeamSchema, Invite, InviteModel, JsonResponse, Player, PlayerModel, Tag,
    TagSolves, Team, TeamDetails, TeamModel, TeamProfile,
};

oxide_macros::crud!(Team, single: [], optional: [], multiple: [Invite, Player]);

async fn get_team_profile(
    team_model: TeamModel,
    pool: &RedisPool,
    db: &DbConn,
) -> Result<TeamProfile> {
    let rank = pool
        .zrevrank("leaderboard:team", &team_model.id.simple().to_string())
        .await?;

    let score = pool
        .zscore("leaderboard:team", &team_model.id.simple().to_string())
        .await?;

    let players = team_model.find_related(Player).all(db).await?;
    let mut members = Vec::with_capacity(players.len());

    for player_model in players {
        members.push(super::retrieve_profile(player_model, db, pool).await?);
    }

    let mut tags_map = Tag::find()
        .all(db)
        .await?
        .into_iter()
        .map(|tag| {
            (
                tag.id,
                TagSolves {
                    tag_value: tag.value,
                    solves: 0,
                },
            )
        })
        .collect::<HashMap<_, _>>();

    let mut challenges = Vec::new();

    for submitted_challenge in team_model
        .find_linked(TeamToChallenge)
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .all(db)
        .await?
    {
        let tags = submitted_challenge.find_related(Tag).all(db).await?;
        for tag in tags {
            tags_map
                .entry(tag.id)
                .and_modify(|tag_solves| tag_solves.solves += 1);
        }

        challenges.push(submitted_challenge);
    }

    Ok(TeamProfile {
        team: team_model,
        solved_challenges: challenges,
        tag_solves: tags_map.values().cloned().collect(),
        members,
        rank,
        score,
    })
}

#[utoipa::path(
    get,
    path = "/player/team/{team_name}/profile",
    params(("team_name" = String, Path, description = "Team name of team")),
    responses(
        (status = 200, description = "Retrieved team details by id successfully", body = TeamProfile),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No player found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve team details by teamname
pub async fn retrieve_team_by_teamname(
    state: State<Arc<AppState>>,
    Path(team_name): Path<String>,
) -> Result<Json<TeamProfile>> {
    let Some(team_model) = Team::find()
        .filter(entity::team::Column::Name.eq(&team_name))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Team not found".to_owned()));
    };

    get_team_profile(team_model, &state.persistent_client, &state.db_conn)
        .await
        .map(Json)
}

#[utoipa::path(
    patch,
    path = "/player/team/{id}/profile",
    params(("id" = Uuid, Path, description = "Id of entity")),
    operation_id = "update_team_profile",
    responses(
        (status = 200, description = "Retrieved team details by id successfully", body = TeamModel),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No player found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve team details by teamname
pub async fn update_details(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
    Json(details): Json<CreateTeamSchema>,
) -> Result<Json<TeamModel>> {
    let mut model = details.into_active_model();
    model.id = ActiveValue::Set(id);

    Ok(model.update(&state.db_conn).await.map(Json)?)
}

#[utoipa::path(
    get,
    path = "/player/team/summary",
    operation_id = "retrieve_team_summary",
    responses(
        (status = 200, description = "Retrieved team summary by id successfully", body = TeamDetails),
        (status = 400, description = "Invalid parameters/request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No player found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve team summary
pub async fn retrieve_summary(
    AuthPlayer(player): AuthPlayer,
    state: State<Arc<AppState>>,
) -> Result<Json<TeamDetails>> {
    let Some(team_model) = Team::find()
        .left_join(Player)
        .filter(entity::player::Column::Id.eq(player.id))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Player team not found".to_owned()));
    };

    let mut tags_map = Tag::find()
        .all(&state.db_conn)
        .await?
        .into_iter()
        .map(|tag| {
            (
                tag.id,
                TagSolves {
                    tag_value: tag.value,
                    solves: 0,
                },
            )
        })
        .collect::<HashMap<_, _>>();

    for submitted_challenge in team_model
        .find_linked(TeamToChallenge)
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .all(&state.db_conn)
        .await?
    {
        let tags = submitted_challenge
            .find_related(Tag)
            .all(&state.db_conn)
            .await?;
        for tag in tags {
            tags_map
                .entry(tag.id)
                .and_modify(|tag_solves| tag_solves.solves += 1);
        }
    }

    Ok(Json(TeamDetails {
        submissions: team_model
            .find_linked(TeamToSubmission)
            .all(&state.db_conn)
            .await?,
        unlocks: team_model
            .find_linked(TeamToUnlock)
            .all(&state.db_conn)
            .await?,
        achievements: team_model
            .find_linked(TeamToAchievement)
            .all(&state.db_conn)
            .await?,
        profile: get_team_profile(team_model, &state.persistent_client, &state.db_conn).await?,
    }))
}
