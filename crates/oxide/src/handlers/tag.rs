use crate::schemas::{
    Challenge, ChallengeModel, ChallengeTag, ChallengeTagModel, CreateTagSchema, JsonResponse, Tag,
    TagModel,
};

oxide_macros::crud!(Tag, single: [], optional: [], multiple: [ChallengeTag, Challenge], id_descriptor: value);
