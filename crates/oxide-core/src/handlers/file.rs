use crate::schemas::{Challenge, ChallengeModel, CreateFileSchema, File, FileModel, JsonResponse};

oxide_macros::crud!(File, single: [Challenge], optional: [], multiple: []);
