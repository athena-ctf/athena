use bollard::models::ContainerStateStatusEnum;
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
    Disabled,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct ChallengeSummary {
    pub challenge: ChallengeModel,
    pub state: PlayerChallengeState,
    pub deployment: Option<DeploymentModel>,
    pub attempts: usize,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
#[serde(tag = "type", content = "data", rename_all = "snake_case")]
pub enum PlayerChallenge {
    Single {
        summary: ChallengeSummary,
    },
    Group {
        group: Grouping,
        summaries: Vec<ChallengeSummary>,
    },
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub enum ContainerStateEnum {
    Created,
    Running,
    Paused,
    Restarting,
    Removing,
    Exited,
    Dead,
}

impl From<ContainerStateStatusEnum> for ContainerStateEnum {
    fn from(value: ContainerStateStatusEnum) -> Self {
        match value {
            ContainerStateStatusEnum::CREATED => Self::Created,
            ContainerStateStatusEnum::RUNNING => Self::Running,
            ContainerStateStatusEnum::PAUSED => Self::Paused,
            ContainerStateStatusEnum::RESTARTING => Self::Restarting,
            ContainerStateStatusEnum::REMOVING => Self::Removing,
            ContainerStateStatusEnum::EXITED => Self::Exited,
            ContainerStateStatusEnum::DEAD => Self::Dead,
            ContainerStateStatusEnum::EMPTY => unreachable!(),
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
    pub challenges: Vec<PlayerChallenge>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct DetailedChallenge {
    pub files: Vec<FileModel>,
    pub hints: Vec<HintSummary>,
    pub instances: Option<Vec<ChallengeInstance>>,
    pub solves: u64,
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
    pub points: i64,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct PlayerProfile {
    pub player: PlayerModel,
    pub solved_challenges: Vec<ChallengeModel>,
    pub awards: Vec<AwardsReceived>,
    pub tag_solves: Vec<TagSolves>,
    pub rank: u64,
    pub score: i32,
    pub history: Vec<PointsHistory>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct PlayerDetails {
    pub profile: PlayerProfile,
    pub submissions: Vec<SubmissionModel>,
    pub unlocks: Vec<UnlockModel>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct TeamMember {
    pub player_id: Uuid,
    pub player_username: String,
    pub rank: u64,
    pub score: i32,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct TeamProfile {
    pub team: TeamModel,
    pub solved_challenges: Vec<ChallengeModel>,
    pub awards: Vec<AwardsReceived>,
    pub tag_solves: Vec<TagSolves>,
    pub members: Vec<TeamMember>,
    pub history: Vec<PointsHistory>,
    pub rank: u64,
    pub score: i32,
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
    pub invites: Vec<InviteModel>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct LeaderboardRankings {
    pub total: u64,
    pub offset: u64,
    pub count: u64,
    pub rankings: Vec<Ranking>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct RankingQuery {
    pub offset: u64,
    pub count: u64,
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
pub struct FileSchema {
    #[schema(value_type = String, format = Binary)]
    #[allow(dead_code)]
    pub file: Vec<u8>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
#[serde(rename_all = "lowercase")]
pub enum ExportFormat {
    Csv,
    Xml,
    Json,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct ExportQuery {
    pub format: ExportFormat,
}

impl ExportQuery {
    pub fn sql_query(&self, table_name: &str, out_path: &str) -> String {
        match self.format {
            ExportFormat::Csv => {
                format!("COPY {table_name} TO '{out_path}' WITH (FORMAT CSV, HEADER);")
            }
            ExportFormat::Json => {
                format!("COPY (SELECT json_agg(row_to_json({table_name}))::text FROM {table_name}) to '{out_path}';")
            }
            ExportFormat::Xml => format!("COPY (SELECT table_to_xml({table_name}, true , false, '')) TO '{out_path}';"),
        }
    }
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct RoleModel {
    pub role: String,
    pub permissions: Vec<String>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct OverrideModel {
    pub id: Uuid,
    pub permissions: Vec<String>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
#[serde(rename_all = "lowercase")]
pub enum RbacUpdateAction {
    Add,
    Remove,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct UpdateRoleSchema {
    pub action: RbacUpdateAction,
    pub permissions: Vec<String>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct UpdateOverrideSchema {
    pub action: RbacUpdateAction,
    pub permissions: Vec<String>,
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema)]
pub struct StoredFile {
    pub id: Uuid,
    pub name: String,
    pub last_modified: chrono::DateTime<chrono::Utc>,
    pub location: String,
    pub size: usize,
}
