use axum::body::Bytes;
use axum_typed_multipart::{FieldData, TryFromMultipart};
use entity::extensions::{ContainerMeta, HintSummary};
pub use entity::prelude::*;
use serde::{Deserialize, Serialize};
use strum::{Display, EnumString};
use utoipa::ToSchema;
use uuid::Uuid;

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct LoginModel {
    pub username: String,
    pub password: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct ErrorModel {
    pub message: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct TokenPair {
    pub access_token: String,
    pub refresh_token: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct JsonResponse {
    pub message: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct ResetPasswordSchema {
    pub token: String,
    pub email: String,
    pub new_password: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct VerifyFlagSchema {
    pub challenge_id: Uuid,
    pub flag: String,
}
#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct FlagVerificationResult {
    pub is_correct: bool,
}

#[derive(TryFromMultipart, Debug, ToSchema)]
pub struct UploadedFile {
    #[schema(value_type = String, format = Binary)]
    pub file: FieldData<Bytes>,
    pub challenge_id: Uuid,
}

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub enum TokenClaimKind {
    Player,
    Admin(RoleEnum),
}

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema, Display, EnumString)]
#[strum(serialize_all = "lowercase")]
pub enum TokenType {
    Access,
    Refresh,
}

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct TokenClaims {
    pub id: Uuid,
    pub exp: u64,
    pub iat: u64,
    pub token_type: TokenType,
    pub kind: TokenClaimKind,
}

#[derive(Debug, Serialize, Deserialize, Clone, ToSchema)]
pub struct SendTokenSchema {
    pub email: String,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct RegisterPlayer {
    pub display_name: String,
    pub email: String,
    pub username: String,
    pub password: String,
    pub token: String,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct ChallengeSolves {
    pub solves: u64,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct ChallengeRelations {
    pub challenge: ChallengeModel,
    pub files: Vec<FileModel>,
    pub hints: Vec<HintSummary>,
    pub tags: Vec<TagModel>,
    pub solves: u64,
}

#[derive(Debug, ToSchema, Serialize, Deserialize)]
pub struct CreateChallengeSchema {
    pub container_meta: Option<ContainerMeta>,
    pub author_name: String,
    pub description: String,
    pub difficulty: DifficultyEnum,
    pub points: i32,
    pub status: ChallengeStatusEnum,
    pub title: String,
    pub tags: Vec<String>,
    pub flag_type: FlagTypeEnum,
}

#[derive(TryFromMultipart, Debug, ToSchema)]
pub struct CreateImageSchema {
    #[schema(value_type = String, format = Binary)]
    pub file: FieldData<Bytes>,
    pub container_name: String,
    pub challenge_title: String,
}

#[derive(Serialize, Debug, Deserialize, Clone, Copy, ToSchema)]
pub enum ImageStatus {
    Build,
    Push,
    Done,
    Failed,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct ContainerImage {
    pub name: String,
    pub status: ImageStatus,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct StatSchema {
    pub achievement: u64,
    pub ban: u64,
    pub challenge: u64,
    pub file: u64,
    pub flag: u64,
    pub hint: u64,
    pub instance: u64,
    pub invite: u64,
    pub notification: u64,
    pub player: u64,
    pub submission: u64,
    pub tag: u64,
    pub team: u64,
    pub unlocks: u64,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct TagSolves {
    pub tag_id: Uuid,
    pub tag_value: String,
    pub solves: usize,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct PlayerProfile {
    pub player: PlayerModel,
    pub solved_challenges: Vec<ChallengeModel>,
    pub tag_solves: Vec<TagSolves>,
}
