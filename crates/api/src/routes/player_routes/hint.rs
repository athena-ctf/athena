use std::sync::Arc;

use axum::Router;
use axum::routing::get;

use crate::AppState;
use crate::handlers::hint;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/hint/unlock/{id}", get(hint::unlock_by_id))
}
