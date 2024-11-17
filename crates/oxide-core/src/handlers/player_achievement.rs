use crate::schemas::{
    Achievement, AchievementModel, CreatePlayerAchievementSchema, JsonResponse, Player,
    PlayerAchievement, PlayerAchievementModel, PlayerModel,
};

oxide_macros::crud_join!(PlayerAchievement, Player, Achievement);
