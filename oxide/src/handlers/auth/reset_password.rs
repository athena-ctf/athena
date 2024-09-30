use std::sync::Arc;

use askama::Template;
use axum::extract::State;
use axum::Json;
use lettre::message::header::ContentType;
use lettre::message::{MultiPart, SinglePart};
use lettre::{Message, Transport};

use crate::db;
use crate::schemas::{JsonResponse, ResetPasswordSchema, SendTokenSchema, TokenContextEnum};
use crate::service::{ApiError, ApiResult, AppState};
use crate::templates::{ResetPasswordHtml, ResetPasswordPlain};

#[utoipa::path(
    post,
    path = "/auth/reset-password",
    request_body = ResetPasswordSchema,
    responses(
        (status = 200, description = "Password reset email sent successful", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
    security(())
)]
/// Auth reset password
pub async fn action(
    state: State<Arc<AppState>>,
    Json(body): Json<ResetPasswordSchema>,
) -> ApiResult<Json<JsonResponse>> {
    if db::token::verify(
        body.token.clone(),
        body.email.clone(),
        TokenContextEnum::Register,
        &state.db_conn,
    )
    .await?
    {
        return Err(ApiError::BadRequest("Incorrect token".to_owned()));
    }

    let Some(user_model) = db::player::retrieve_by_email(
        body.email,
        &state.db_conn,
        &mut state.redis_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(ApiError::NotFound("User does not exist".to_owned()));
    };

    db::player::reset(user_model, body.new_password, &state.db_conn).await?;

    Ok(Json(JsonResponse {
        message: "Successfully reset password".to_owned(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/reset-password/send-token",
    request_body = SendTokenSchema,
    responses(
        (status = 200, description = "Token sent successful", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
    security(())
)]
/// Send reset token to email
pub async fn send_token(
    state: State<Arc<AppState>>,
    Json(body): Json<SendTokenSchema>,
) -> ApiResult<Json<JsonResponse>> {
    let token = db::token::create(
        body.email.clone(),
        TokenContextEnum::Register,
        &state.db_conn,
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
                        ResetPasswordPlain {
                            token: token.clone(),
                        }
                        .render()
                        .unwrap(),
                    ),
                )
                .singlepart(
                    SinglePart::builder()
                        .header(ContentType::TEXT_HTML)
                        .body(ResetPasswordHtml { token }.render().unwrap()),
                ),
        )
        .unwrap();

    state.mail_transport.send(&email).unwrap();

    Ok(Json(JsonResponse {
        message: "Successfully sent mail".to_owned(),
    }))
}
