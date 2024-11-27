use crate::schemas::{
    Challenge, ChallengeModel, CreateSubmissionSchema, JsonResponse, Player, PlayerModel,
    Submission, SubmissionModel,
};

oxide_macros::crud_join!(Submission, Challenge, Player);
