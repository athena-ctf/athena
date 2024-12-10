use crate::schemas::{
    CreateUnlockSchema, Hint, HintModel, JsonResponse, Player, PlayerModel, Unlock, UnlockModel,
    UpdateUnlockSchema,
};

oxide_macros::crud_join!(Unlock, Player, Hint);
