use crate::schemas::{
    Award, AwardModel, CreateAwardSchema, JsonResponse, Player, PlayerAward, PlayerAwardModel,
    PlayerModel,
};

oxide_macros::crud!(
    Award,
    single: [Player, PlayerAward],
    optional: [],
    multiple: [],
    id_descriptor: value
);
