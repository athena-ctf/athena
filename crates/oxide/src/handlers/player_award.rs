use crate::schemas::{
    Award, AwardModel, CreatePlayerAwardSchema, JsonResponse, Player, PlayerAward,
    PlayerAwardModel, PlayerModel, UpdatePlayerAwardSchema,
};

oxide_macros::crud_join!(PlayerAward, Player, Award);
