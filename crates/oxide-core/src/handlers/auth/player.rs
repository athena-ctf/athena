use std::str::FromStr;
use std::sync::Arc;

use argon2::password_hash::rand_core::OsRng;
use argon2::password_hash::SaltString;
use argon2::{Argon2, PasswordHasher};
use askama::Template;
use axum::extract::{Query, State};
use axum::Json;
use fred::prelude::SortedSetsInterface;
use lettre::message::header::ContentType;
use lettre::message::{Mailbox, MultiPart, SinglePart};
use lettre::{AsyncTransport, Message};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, Condition, IntoActiveModel, TransactionTrait};
use tower_sessions::Session;

use crate::errors::{Error, Result};
use crate::schemas::{
    GroupEnum, Invite, InviteVerificationResult, JsonResponse, LoginModel, Player, PlayerModel,
    RegisterPlayer, RegisterVerifyEmailQuery, RegisterVerifyInviteQuery, ResetPasswordSchema,
    SendTokenSchema, Team, TeamModel, TeamRegister, User, UserModel,
};
use crate::service::AppState;
use crate::templates::{ResetPasswordHtml, ResetPasswordPlain, VerifyEmailHtml, VerifyEmailPlain};

#[utoipa::path(
    get,
    path = "/auth/player/register/verify/email",
    params(
        ("email" = String, Query, description = "Email of user to check")
    ),
    operation_id = "player_register_verify_email",
    responses(
        (status = 200, description = "User existence check successfully", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
    security(())
)]
/// Verify user exists
pub async fn register_verify_email(
    state: State<Arc<AppState>>,
    Query(query): Query<RegisterVerifyEmailQuery>,
) -> Result<()> {
    if User::find()
        .filter(Condition::any().add(entity::user::Column::Email.eq(query.email)))
        .one(&state.db_conn)
        .await?
        .is_some()
    {
        return Err(Error::BadRequest(
            "User with username or email already exists".to_owned(),
        ));
    }

    Ok(())
}

#[utoipa::path(
    post,
    path = "/auth/player/register",
    request_body = RegisterPlayer,
    operation_id = "player_register",
    responses(
        (status = 200, description = "Registered user successfully", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
    security(())
)]
/// Register user
pub async fn register(
    state: State<Arc<AppState>>,
    Json(body): Json<RegisterPlayer>,
) -> Result<Json<JsonResponse>> {
    let txn = state.db_conn.begin().await?;

    let verified = state
        .token_manager
        .verify("register", &body.email, &body.token)
        .await?;

    if verified.is_invalid() {
        return Err(Error::BadRequest("Incorrect token".to_owned()));
    } else if verified.is_retries_exceeded() {
        return Err(Error::BadRequest("Too many retries".to_owned()));
    }

    let salt = SaltString::generate(&mut OsRng);
    let password = Argon2::default()
        .hash_password(body.password.as_bytes(), &salt)?
        .to_string();

    let user = UserModel::new(body.username, &body.email, password, GroupEnum::Player)
        .into_active_model()
        .insert(&txn)
        .await?;

    state
        .persistent_client
        .zadd::<(), _, _>(
            "leaderboard",
            None,
            None,
            false,
            false,
            (0.0, &body.display_name),
        )
        .await?;

    let team_id = match body.team {
        TeamRegister::Join { team_id, invite_id } => {
            Invite::update_many()
                .col_expr(
                    entity::invite::Column::Remaining,
                    Expr::col(entity::invite::Column::Remaining).sub(1),
                )
                .filter(entity::invite::Column::Id.eq(invite_id))
                .exec(&txn)
                .await?;

            team_id
        }

        TeamRegister::Create { team_name } => {
            let team_model = TeamModel::new(body.email, team_name)
                .into_active_model()
                .insert(&txn)
                .await?;

            team_model.id
        }
    };

    PlayerModel::new(team_id, None, None, user.id)
        .into_active_model()
        .insert(&txn)
        .await?;

    txn.commit().await?;

    Ok(Json(JsonResponse {
        message: "Successfully registered".to_string(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/register/send-token",
    request_body = SendTokenSchema,
    operation_id = "player_register_send_token",
    responses(
        (status = 200, description = "Token sent successful", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
    security(())
)]
/// Send verification token to email
pub async fn register_send_token(
    state: State<Arc<AppState>>,
    Json(body): Json<SendTokenSchema>,
) -> Result<Json<JsonResponse>> {
    let token = state
        .token_manager
        .generate("register", &body.email)
        .await?;

    let email = Message::builder()
        .from(Mailbox::from_str(&state.settings.read().await.smtp.from).unwrap())
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

    tokio::spawn(async move {
        if let Err(err) = state.mail_transport.send(email).await {
            tracing::error!("{err:?}");
        }
    });

    Ok(Json(JsonResponse {
        message: "Successfully sent mail".to_owned(),
    }))
}

#[utoipa::path(
    get,
    path = "/auth/player/register/verify/invite",
    params(
        ("team_name" = String, Query, description = "Team name to check"),
        ("invite_id" = String, Query, description = "Invite ID to verify")
    ),
    operation_id = "player_register_verify_invite",
    responses(
        (status = 200, description = "Verified invite successfully", body = InviteVerificationResult),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Verify invite
pub async fn register_verify_invite(
    state: State<Arc<AppState>>,
    Query(body): Query<RegisterVerifyInviteQuery>,
) -> Result<Json<InviteVerificationResult>> {
    let Some(team_model) = Team::find()
        .filter(entity::team::Column::Name.eq(body.team_name))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Team not found".to_owned()));
    };

    let Some(invite_model) = team_model
        .find_related(Invite)
        .filter(entity::invite::Column::Id.eq(body.invite_id))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("invalid invite code".to_owned()));
    };

    if invite_model.remaining == 0 {
        return Err(Error::BadRequest("invite used up".to_owned()));
    }

    Ok(Json(InviteVerificationResult {
        team_id: team_model.id,
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/reset-password",
    request_body = ResetPasswordSchema,
    operation_id = "player_reset_password",
    responses(
        (status = 200, description = "Reset password successfully", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
    security(())
)]
/// Auth reset password
pub async fn reset_password(
    state: State<Arc<AppState>>,
    Json(body): Json<ResetPasswordSchema>,
) -> Result<Json<JsonResponse>> {
    let verified = state
        .token_manager
        .verify("reset", &body.email, &body.token)
        .await?;

    if verified.is_invalid() {
        return Err(Error::BadRequest("Incorrect token".to_owned()));
    } else if verified.is_retries_exceeded() {
        return Err(Error::BadRequest("Too many retries".to_owned()));
    }

    let txn = state.db_conn.begin().await?;

    let Some((user_model, Some(_))) = User::find()
        .find_also_related(Player)
        .filter(entity::user::Column::Email.eq(&body.email))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("User does not exist".to_owned()));
    };

    let mut active_user = user_model.into_active_model();
    let salt = SaltString::generate(&mut OsRng);

    active_user.password = ActiveValue::Set(
        Argon2::default()
            .hash_password(body.new_password.as_bytes(), &salt)?
            .to_string(),
    );

    active_user.update(&txn).await?;

    txn.commit().await?;

    Ok(Json(JsonResponse {
        message: "Successfully reset password".to_owned(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/reset-password/send-token",
    request_body = SendTokenSchema,
    operation_id = "player_reset_password_send_token",
    responses(
        (status = 200, description = "Token sent successful", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
    security(())
)]
/// Send reset token to email
pub async fn reset_password_send_token(
    state: State<Arc<AppState>>,
    Json(body): Json<SendTokenSchema>,
) -> Result<Json<JsonResponse>> {
    let token = state.token_manager.generate("reset", &body.email).await?;

    let email = Message::builder()
        .from(Mailbox::from_str(&state.settings.read().await.smtp.from).unwrap())
        .to(body.email.parse().unwrap())
        .subject("Reset email for Athena CTF")
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

    tokio::spawn(async move {
        if let Err(err) = state.mail_transport.send(email).await {
            tracing::error!("{err:?}");
        }
    });

    Ok(Json(JsonResponse {
        message: "Successfully sent mail".to_owned(),
    }))
}

#[utoipa::path(
    post,
    path = "/auth/player/login",
    request_body = LoginModel,
    operation_id = "player_login",
    responses(
        (status = 200, description = "Player logged in successfully", body = PlayerModel),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
    security(())
)]
/// Login user
pub async fn login(
    state: State<Arc<AppState>>,
    session: Session,
    Json(body): Json<LoginModel>,
) -> Result<Json<PlayerModel>> {
    let Some(user_model) = super::verify(body.username, body.password, &state.db_conn).await?
    else {
        return Err(Error::BadRequest("Username invalid".to_owned()));
    };

    let Some(player_model) = user_model.find_related(Player).one(&state.db_conn).await? else {
        return Err(Error::NotFound("User is not admin".to_owned()));
    };

    if player_model.ban_id.is_some() {
        return Err(Error::BadRequest("Player is banned".to_owned()));
    }

    session.insert("player", player_model.clone()).await?;

    Ok(Json(player_model))
}

#[utoipa::path(
    get,
    path = "/auth/player/logout",
    operation_id = "player_logout",
    responses(
        (status = 200, description = "Refreshed token successfully"),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Logout user
pub async fn logout(session: Session) -> Result<()> {
    Ok(session.delete().await?)
}
