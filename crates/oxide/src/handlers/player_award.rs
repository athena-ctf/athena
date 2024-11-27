use crate::schemas::{
    Award, AwardModel, CreatePlayerAwardSchema, JsonResponse, Player, PlayerAward,
    PlayerAwardModel, PlayerModel,
};

oxide_macros::crud_join!(PlayerAward, Player, Award);
