use crate::schemas::{
    Challenge, ChallengeModel, CreateSubmissionSchema, JsonResponse, Player, PlayerModel,
    Submission, SubmissionModel, UpdateSubmissionSchema,
};

oxide_macros::crud_join!(Submission, Challenge, Player);
