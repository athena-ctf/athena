use entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(tag = "action")]
pub enum Action<T> {
    Insert { model: T },
    Update { old_model: T, new_model: T },
    Delete { model: T },
}

#[derive(Serialize, Deserialize)]
#[serde(tag = "kind", content = "data")]
pub enum Notification {
    Challenge(Action<ChallengeModel>),
    Player(Action<PlayerModel>),
    Achievement(Action<AchievementModel>),
    Ticket(Action<TicketModel>),
    Invite(Action<InviteModel>),
}

impl Notification {
    pub fn into_model(self) -> Option<NotificationModel> {
        match self {
            Self::Challenge(action) => match action {
                Action::Insert { model } => Some(NotificationModel::new(
                    "New challenge added",
                    format!(r#""{}" ({}) is active now"#, model.title, model.level),
                    None,
                )),

                Action::Delete { model } => Some(NotificationModel::new(
                    "Challenge removed",
                    format!(r#""{}" has been removed"#, model.title),
                    None,
                )),

                Action::Update {
                    old_model,
                    new_model,
                } => {
                    if old_model.title == new_model.title {
                        Some(NotificationModel::new(
                            "Challenge updated",
                            format!(r#""{} updated""#, new_model.title),
                            None,
                        ))
                    } else {
                        Some(NotificationModel::new(
                            "Challenge renamed",
                            format!(
                                r#""{} is renamed to "{}"""#,
                                old_model.title, new_model.title
                            ),
                            None,
                        ))
                    }
                }
            },
            Self::Player(action) => match action {
                Action::Delete { .. } | Action::Insert { .. } => None,
                Action::Update {
                    old_model,
                    new_model,
                } => {
                    if old_model.ban_id.is_none() && new_model.ban_id.is_some() {
                        Some(NotificationModel::new(
                            "You have been banned",
                            "You have been banned",
                            new_model.id,
                        ))
                    } else {
                        None
                    }
                }
            },
            Self::Achievement(action) => match action {
                Action::Delete { model } => Some(NotificationModel::new(
                    "Achievement removed",
                    format!(r#"Your achievement "{}" is removed"#, model.value),
                    model.player_id,
                )),
                Action::Insert { model } => Some(NotificationModel::new(
                    "Achievement added",
                    format!(r#"You have a new achievement "{}""#, model.value),
                    model.player_id,
                )),
                Action::Update {
                    old_model,
                    new_model,
                } => {
                    if old_model.value != new_model.value {
                        Some(NotificationModel::new(
                            "Achievement renamed",
                            format!(
                                r#"Your achievement "{}" has been renamed to "{}""#,
                                old_model.value, new_model.value
                            ),
                            new_model.player_id,
                        ))
                    } else if old_model.prize != new_model.prize {
                        Some(NotificationModel::new(
                            "Achievement re evaluated",
                            format!(
                                r#"Your achievement "{}" has been reevaluated from {} to  {}"#,
                                old_model.value, old_model.prize, new_model.prize
                            ),
                            new_model.player_id,
                        ))
                    } else {
                        None
                    }
                }
            },
            Self::Ticket(action) => todo!(),
            Self::Invite(action) => todo!(),
        }
    }
}
