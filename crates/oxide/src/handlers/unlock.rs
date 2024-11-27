use crate::schemas::{
    CreateUnlockSchema, Hint, HintModel, JsonResponse, Player, PlayerModel, Unlock, UnlockModel,
};

oxide_macros::crud_join!(Unlock, Player, Hint);
