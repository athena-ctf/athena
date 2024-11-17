use sea_orm::{Linked, RelationTrait};

// TODO: check links

pub struct TeamToChallenge;

impl Linked for TeamToChallenge {
    type FromEntity = super::team::Entity;
    type ToEntity = super::challenge::Entity;

    fn link(&self) -> Vec<sea_orm::LinkDef> {
        vec![
            super::player::Relation::Team.def().rev(),
            super::submission::Relation::Player.def().rev(),
            super::submission::Relation::Challenge.def(),
        ]
    }
}

pub struct TeamToSubmission;

impl Linked for TeamToSubmission {
    type FromEntity = super::team::Entity;
    type ToEntity = super::submission::Entity;

    fn link(&self) -> Vec<sea_orm::LinkDef> {
        vec![
            super::player::Relation::Team.def().rev(),
            super::player::Relation::Submission.def(),
        ]
    }
}

pub struct TeamToUnlock;

impl Linked for TeamToUnlock {
    type FromEntity = super::team::Entity;
    type ToEntity = super::unlock::Entity;

    fn link(&self) -> Vec<sea_orm::LinkDef> {
        vec![
            super::player::Relation::Team.def().rev(),
            super::player::Relation::Unlock.def(),
        ]
    }
}

pub struct TeamToHint;

impl Linked for TeamToHint {
    type FromEntity = super::team::Entity;
    type ToEntity = super::hint::Entity;

    fn link(&self) -> Vec<sea_orm::LinkDef> {
        vec![
            super::player::Relation::Team.def().rev(),
            super::unlock::Relation::Player.def().rev(),
            super::unlock::Relation::Hint.def(),
        ]
    }
}

pub struct TeamToAchievement;

impl Linked for TeamToAchievement {
    type FromEntity = super::team::Entity;
    type ToEntity = super::achievement::Entity;

    fn link(&self) -> Vec<sea_orm::LinkDef> {
        vec![
            super::player::Relation::Team.def().rev(),
            super::player_achievement::Relation::Player.def().rev(),
            super::player_achievement::Relation::Achievement.def(),
        ]
    }
}
