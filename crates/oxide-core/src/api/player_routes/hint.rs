use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::hint;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/hint/unlock/:id", get(hint::unlock_by_id))
}
