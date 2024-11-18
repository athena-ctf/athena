use std::sync::Arc;

use axum::extract::State;
use axum::Json;
use sea_orm::{EntityTrait, PaginatorTrait};

use crate::errors::Result;
use crate::schemas::{JsonResponse, StatSchema};
use crate::service::AppState;

#[utoipa::path(
    get,
    path = "/admin/stats",
    responses(
        (status = 200, description = "Retrieved stats successfully", body = StatSchema),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve stats of all tables
pub async fn retrieve(state: State<Arc<AppState>>) -> Result<Json<StatSchema>> {
    Ok(Json(StatSchema {
        award: entity::award::Entity::find().count(&state.db_conn).await?,
        admin: entity::admin::Entity::find().count(&state.db_conn).await?,
        ban: entity::ban::Entity::find().count(&state.db_conn).await?,
        challenge_tag: entity::challenge_tag::Entity::find()
            .count(&state.db_conn)
            .await?,
        challenge: entity::challenge::Entity::find()
            .count(&state.db_conn)
            .await?,
        container: entity::container::Entity::find()
            .count(&state.db_conn)
            .await?,
        deployment: entity::deployment::Entity::find()
            .count(&state.db_conn)
            .await?,
        file: entity::file::Entity::find().count(&state.db_conn).await?,
        flag: entity::flag::Entity::find().count(&state.db_conn).await?,
        hint: entity::hint::Entity::find().count(&state.db_conn).await?,
        instance: entity::instance::Entity::find()
            .count(&state.db_conn)
            .await?,
        invite: entity::invite::Entity::find().count(&state.db_conn).await?,
        notification: entity::notification::Entity::find()
            .count(&state.db_conn)
            .await?,
        player: entity::player::Entity::find().count(&state.db_conn).await?,
        submission: entity::submission::Entity::find()
            .count(&state.db_conn)
            .await?,
        tag: entity::tag::Entity::find().count(&state.db_conn).await?,
        team: entity::team::Entity::find().count(&state.db_conn).await?,
        ticket: entity::ticket::Entity::find().count(&state.db_conn).await?,
        unlocks: entity::unlock::Entity::find().count(&state.db_conn).await?,
    }))
}
