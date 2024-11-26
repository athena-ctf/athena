use bollard::secret::ContainerStateStatusEnum;
use chrono::{DateTime, FixedOffset};
pub use entity::extensions::*;
pub use entity::prelude::*;
use sea_orm::FromQueryResult;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use uuid::Uuid;

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
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

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct InviteVerificationResult {
    pub team_id: Uuid,
    pub invite_id: Uuid,
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
    pub team: TeamRegister,
    pub avatar_url: String,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
#[serde(tag = "kind", rename_all = "lowercase")]
pub enum TeamRegister {
    Join { team_id: Uuid, invite_id: String },
    Create { team_name: String },
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
#[serde(rename_all = "snake_case")]
pub enum PlayerChallengeState {
    Solved,
    Unsolved,
    ChallengeLimitReached,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct ChallengeSummary {
    pub challenge: ChallengeModel,
    pub tags: Vec<TagModel>,
    pub state: PlayerChallengeState,
    pub deployment: Option<DeploymentModel>,
    pub solves: u64,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
#[serde(rename_all = "lowercase")]
pub enum ContainerStateEnum {
    EMPTY,
    CREATED,
    RUNNING,
    PAUSED,
    RESTARTING,
    REMOVING,
    EXITED,
    DEAD,
}

impl From<ContainerStateStatusEnum> for ContainerStateEnum {
    fn from(value: ContainerStateStatusEnum) -> Self {
        match value {
            ContainerStateStatusEnum::EMPTY => Self::EMPTY,
            ContainerStateStatusEnum::CREATED => Self::CREATED,
            ContainerStateStatusEnum::RUNNING => Self::RUNNING,
            ContainerStateStatusEnum::PAUSED => Self::PAUSED,
            ContainerStateStatusEnum::RESTARTING => Self::RESTARTING,
            ContainerStateStatusEnum::REMOVING => Self::REMOVING,
            ContainerStateStatusEnum::EXITED => Self::EXITED,
            ContainerStateStatusEnum::DEAD => Self::DEAD,
        }
    }
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct ChallengeInstance {
    pub instance_model: InstanceModel,
    pub state: ContainerStateEnum,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct PlayerChallenges {
    pub summaries: Vec<ChallengeSummary>,
    pub tags: Vec<TagModel>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct DetailedChallenge {
    pub files: Vec<FileModel>,
    pub hints: Vec<HintSummary>,
    pub instances: Option<Vec<ChallengeInstance>>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct StatSchema {
    pub award: u64,
    pub admin: u64,
    pub ban: u64,
    pub challenge_tag: u64,
    pub challenge: u64,
    pub container: u64,
    pub deployment: u64,
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
    pub ticket: u64,
    pub unlocks: u64,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct TagSolves {
    pub tag_value: String,
    pub solves: usize,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema, FromQueryResult)]
#[sea_orm(entity = "Award")]
pub struct AwardsReceived {
    pub id: Uuid,
    pub created_at: DateTime<FixedOffset>,
    pub updated_at: DateTime<FixedOffset>,
    pub value: String,
    pub prize: i32,
    pub logo_url: String,
    pub count: i32,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct PointsHistory {
    pub timestamp: i64,
    pub points: f64,
}

impl PointsHistory {
    pub fn parse(s: &str) -> Self {
        let (x, y) = s.split_once(':').unwrap();

        let timestamp = x.parse().unwrap();
        let points = y.parse().unwrap();

        Self { timestamp, points }
    }
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct PlayerProfile {
    pub player: PlayerModel,
    pub solved_challenges: Vec<ChallengeModel>,
    pub awards: Vec<AwardsReceived>,
    pub tag_solves: Vec<TagSolves>,
    pub rank: u64,
    pub score: u64,
    pub history: Vec<PointsHistory>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct PlayerDetails {
    pub profile: PlayerProfile,
    pub submissions: Vec<SubmissionModel>,
    pub unlocks: Vec<UnlockModel>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct TeamProfile {
    pub team: TeamModel,
    pub solved_challenges: Vec<ChallengeModel>,
    pub tag_solves: Vec<TagSolves>,
    pub members: Vec<PlayerProfile>,
    pub rank: u64,
    pub score: u64,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct UpdateInviteSchema {
    pub remaining: Option<i32>,
    pub expires_at: Option<DateTime<FixedOffset>>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct TeamDetails {
    pub profile: TeamProfile,
    pub submissions: Vec<SubmissionModel>,
    pub unlocks: Vec<UnlockModel>,
    pub awards: Vec<AwardModel>,
    pub invites: Vec<InviteModel>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct LeaderboardRankings {
    pub total: i64,
    pub offset: i64,
    pub count: i64,
    pub rankings: Vec<Ranking>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct RankingQuery {
    pub offset: i64,
    pub count: i64,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct Ranking {
    pub member: String,
    pub score: f64,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct RegisterVerifyEmailQuery {
    pub email: String,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct RegisterVerifyInviteQuery {
    pub team_name: String,
    pub invite_code: String,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
#[serde(tag = "kind", rename_all = "snake_case")]
pub enum UnlockStatus {
    Locked,
    Unlocked { value: String },
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct HintSummary {
    pub id: Uuid,
    pub cost: i32,
    pub status: UnlockStatus,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct LoginResponse<T> {
    pub model: T,
    pub access_token: String,
}

#[derive(ToSchema)]
pub struct ImportFile {
    #[schema(value_type = String, format = Binary)]
    #[allow(dead_code)]
    pub csv_file: Vec<u8>,
}
