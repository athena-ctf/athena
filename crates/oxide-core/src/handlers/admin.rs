use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::routing::get;
use axum::Router;
use fred::prelude::*;
use oxide_macros::table_api;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{
    Admin, AdminModel, CreateAdminSchema, JsonResponse, Ticket, TicketModel, User, UserModel,
};
use crate::service::{AppState, CachedJson};

table_api!(Admin, single: [User], optional: [], multiple: [Ticket]);
