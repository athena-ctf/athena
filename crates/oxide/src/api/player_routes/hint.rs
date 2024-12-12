use std::sync::Arc;

use axum::Router;
use axum::routing::get;

use crate::handlers::hint;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/hint/unlock/:id", get(hint::unlock_by_id))
}
