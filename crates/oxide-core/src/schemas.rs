use entity::extensions::{HintSummary, PartialChallenge};
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
pub struct JsonResponse {
    pub message: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct TokenPair {
    pub access_token: String,
    pub refresh_token: String,
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

#[derive(Clone, Copy, Debug, Serialize, Deserialize, ToSchema)]
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
    pub team_id: Uuid,
    pub invite_id: Uuid,
    pub token: String,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct VerifyInviteRequest {
    pub team_name: String,
    pub invite_id: Uuid,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub enum VerifyInviteResponseKind {
    TeamNotFound,
    InviteNotFound,
    InviteUsedUp,
    Valid,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct VerifyInviteResponse {
    pub response_kind: VerifyInviteResponseKind,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub enum PlayerChallengeState {
    Solved,
    Unsolved,
    ChallengeLimitReached,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct ChallengeSummary {
    pub challenge: PartialChallenge,
    pub tags: Vec<CreateTagSchema>,
    pub state: PlayerChallengeState,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct DetailedChallenge {
    pub files: Vec<CreateFileSchema>,
    pub hints: Vec<HintSummary>,
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

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct PlayerSummary {
    pub player: PlayerModel,
    pub user: UserModel,
    pub submissions: Vec<SubmissionModel>,
    pub unlocks: Vec<UnlockModel>,
    pub achievements: Vec<AchievementModel>,
    pub tag_solves: Vec<TagSolves>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct TeamProfile {
    pub team: TeamModel,
    pub solved_challenges: Vec<ChallengeModel>,
    pub tag_solves: Vec<TagSolves>,
    pub members: Vec<CreatePlayerSchema>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct TeamSummary {
    pub team: TeamModel,
    pub members: Vec<PlayerProfile>,
    pub submissions: Vec<SubmissionModel>,
    pub unlocks: Vec<UnlockModel>,
    pub achievements: Vec<AchievementModel>,
    pub tag_solves: Vec<TagSolves>,
}
