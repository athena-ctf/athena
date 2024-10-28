use sea_orm::{Linked, RelationTrait};

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

pub struct TeamToAchievement;

impl Linked for TeamToAchievement {
    type FromEntity = super::team::Entity;
    type ToEntity = super::achievement::Entity;

    fn link(&self) -> Vec<sea_orm::LinkDef> {
        vec![
            super::player::Relation::Team.def().rev(),
            super::player::Relation::Achievement.def(),
        ]
    }
}
