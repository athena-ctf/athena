use crate::schemas::{
    Challenge, ChallengeModel, ChallengeTag, ChallengeTagModel, CreateChallengeTagSchema,
    JsonResponse, Tag, TagModel,
};

oxide_macros::crud_join!(ChallengeTag, Challenge, Tag);
