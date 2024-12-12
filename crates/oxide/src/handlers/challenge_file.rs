use crate::schemas::{
    Challenge, ChallengeFile, ChallengeFileModel, ChallengeModel, CreateChallengeFileSchema, File,
    FileModel, JsonResponse, UpdateChallengeFileSchema,
};

oxide_macros::crud_join!(ChallengeFile, Challenge, File);
