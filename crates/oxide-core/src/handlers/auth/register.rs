use std::sync::Arc;

use askama::Template;
use axum::extract::State;
use axum::Json;
use lettre::message::header::ContentType;
use lettre::message::{MultiPart, SinglePart};
use lettre::{Message, Transport};

use crate::errors::{Error, Result};
use crate::schemas::{JsonResponse, PlayerDetails, RegisterPlayer, SendTokenSchema};
use crate::service::AppState;
use crate::templates::{VerifyEmailHtml, VerifyEmailPlain};
use crate::{db, token};

#[utoipa::path(
    post,
    path = "/auth/register",
    request_body = RegisterPlayer,
    responses(
        (status = 200, description = "Password reset email sent successful", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
    security(())
)]
/// Register user
pub async fn action(
    state: State<Arc<AppState>>,
    Json(body): Json<RegisterPlayer>,
) -> Result<Json<JsonResponse>> {
    if token::check(
        &body.email,
        &body.token,
        token::HashKey::Register,
        &mut state.token_client.get().await.unwrap(),
    )
    .await?
    {
        return Err(Error::BadRequest("Incorrect token".to_owned()));
    }

    db::player::create(
        PlayerDetails {
            email: body.email,
            username: body.username,
            password: body.password,
            display_name: body.display_name,
            verified: false,
            team_id: None,
            ban_id: None,
            discord_id: None,
            score: 0,
        },
        &state.db_conn,
    )
    .await?;

    Ok(Json(JsonResponse {
        message: "Successfully registered".to_string(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/register/send-token",
    request_body = SendTokenSchema,
    responses(
        (status = 200, description = "Token sent successful", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
    security(())
)]
/// Send verification token to email
pub async fn send_token(
    state: State<Arc<AppState>>,
    Json(body): Json<SendTokenSchema>,
) -> Result<Json<JsonResponse>> {
    let token = token::create();

    token::store(
        &body.email,
        &token,
        token::HashKey::Register,
        &mut state.token_client.get().await.unwrap(),
    )
    .await?;

    let email = Message::builder()
        .from(state.settings.read().await.smtp.from.clone())
        .to(body.email.parse().unwrap())
        .subject("Verification email for Athena CTF")
        .multipart(
            MultiPart::alternative()
                .singlepart(
                    SinglePart::builder().header(ContentType::TEXT_PLAIN).body(
                        VerifyEmailPlain {
                            token: token.clone(),
                        }
                        .render()
                        .unwrap(),
                    ),
                )
                .singlepart(
                    SinglePart::builder()
                        .header(ContentType::TEXT_HTML)
                        .body(VerifyEmailHtml { token }.render().unwrap()),
                ),
        )
        .unwrap();

    state.mail_transport.send(&email).unwrap();

    Ok(Json(JsonResponse {
        message: "Successfully sent mail".to_owned(),
    }))
}
