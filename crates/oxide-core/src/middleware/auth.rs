use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Request, State};
use axum::http::{header, StatusCode};
use axum::middleware::Next;
use axum::response::IntoResponse;
use axum::Json;
use jsonwebtoken::{DecodingKey, Validation};

use crate::permissions::has_permission;
use crate::schemas::{JsonResponse, TokenClaimKind, TokenClaims};
use crate::service::AppState;

pub async fn middleware(
    State(state): State<Arc<AppState>>,
    mut req: Request<Body>,
    next: Next,
) -> Result<impl IntoResponse, (StatusCode, Json<JsonResponse>)> {
    if req.uri().path().starts_with("/auth") && req.uri().path() != "/auth/me" {
        return Ok(next.run(req).await);
    }

    let token = req
        .headers()
        .get(header::AUTHORIZATION)
        .and_then(|auth_header| auth_header.to_str().ok())
        .and_then(|header| (header.len() > 7).then_some(header))
        .map(|auth_value| auth_value[7..].to_owned());

    let token = token.ok_or_else(|| {
        let json_error = JsonResponse {
            message: "Missing bearer token".to_string(),
        };
        (StatusCode::UNAUTHORIZED, Json(json_error))
    })?;

    let claims = jsonwebtoken::decode::<TokenClaims>(
        &token,
        &DecodingKey::from_base64_secret(&state.settings.read().await.jwt.secret).unwrap(),
        &Validation::default(),
    )
    .map_err(|_| {
        let json_error = JsonResponse {
            message: "Invalid bearer token".to_string(),
        };
        (StatusCode::UNAUTHORIZED, Json(json_error))
    })?
    .claims;

    let claims_kind = claims.kind;

    req.extensions_mut().insert(claims);

    match claims_kind {
        TokenClaimKind::Player if req.uri().path().starts_with("/player") => {
            Ok(next.run(req).await)
        }

        TokenClaimKind::Admin(role)
            if req.uri().path().starts_with("/admin")
                && has_permission(
                    req.method(),
                    req.uri().path().strip_prefix("/admin/").unwrap(),
                    role,
                ) =>
        {
            Ok(next.run(req).await)
        }

        _ => Err((
            StatusCode::UNAUTHORIZED,
            Json(JsonResponse {
                message: "Cannot access specified resource".to_owned(),
            }),
        )),
    }
}
