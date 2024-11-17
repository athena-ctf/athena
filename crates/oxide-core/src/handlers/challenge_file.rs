use crate::schemas::{
    Challenge, ChallengeFile, ChallengeFileModel, ChallengeModel, CreateChallengeFileSchema, File,
    FileModel, JsonResponse,
};

oxide_macros::crud_join!(ChallengeFile, Challenge, File);
