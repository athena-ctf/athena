use axum::body::Body;
use axum::extract::Request;
use axum::http::StatusCode;
use axum::middleware::Next;
use axum::response::IntoResponse;
use axum::Json;
use tower_sessions::Session;

use crate::permissions::has_permission;
use crate::schemas::{AdminModel, JsonResponse, PlayerModel};

pub async fn middleware(
    session: Session,
    req: Request<Body>,
    next: Next,
) -> Result<impl IntoResponse, (StatusCode, Json<JsonResponse>)> {
    let path = req.uri().path();

    if path.starts_with("/auth") {
        return Ok(next.run(req).await);
    }

    if path.starts_with("/admin") {
        if let Ok(model) = session.get::<AdminModel>("admin").await {
            if let Some(model) = model {
                if has_permission(req.method(), &path[7..], model.role) {
                    return Ok(next.run(req).await);
                }

                return Err((
                    StatusCode::FORBIDDEN,
                    Json(JsonResponse {
                        message: "Cannot access specified resource".to_owned(),
                    }),
                ));
            }

            return Err((
                StatusCode::UNAUTHORIZED,
                Json(JsonResponse {
                    message: "Session invalid".to_owned(),
                }),
            ));
        }

        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(JsonResponse {
                message: "Could not retrieve session".to_owned(),
            }),
        ));
    }

    if path.starts_with("/player") {
        if let Ok(model) = session.get::<PlayerModel>("player").await {
            return if let Some(model) = model {
                if model.ban_id.is_some() {
                    Err((
                        StatusCode::FORBIDDEN,
                        Json(JsonResponse {
                            message: "SPlayer banned".to_owned(),
                        }),
                    ))
                } else {
                    Ok(next.run(req).await)
                }
            } else {
                Err((
                    StatusCode::UNAUTHORIZED,
                    Json(JsonResponse {
                        message: "Session invalid".to_owned(),
                    }),
                ))
            };
        }

        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(JsonResponse {
                message: "Could not retrieve session".to_owned(),
            }),
        ));
    }

    Err((
        StatusCode::NOT_FOUND,
        Json(JsonResponse {
            message: "The requested url does not exist.".to_owned(),
        }),
    ))
}
