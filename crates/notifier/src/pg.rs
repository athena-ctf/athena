use entity::prelude::*;
use sea_orm::{DbConn, EntityTrait};
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
    Ticket(Action<TicketModel>),
    Invite(Action<InviteModel>),
}

pub const fn get_status(status: TicketStatusEnum) -> &'static str {
    match status {
        TicketStatusEnum::Closed => "closed",
        TicketStatusEnum::Open => "opened",
        TicketStatusEnum::Resolved => "resolved",
    }
}

impl Notification {
    pub async fn into_model(self, db: &DbConn) -> Option<NotificationModel> {
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
                        let ban_model = Ban::find_by_id(new_model.ban_id.unwrap())
                            .one(db)
                            .await
                            .unwrap()
                            .unwrap();
                        Some(NotificationModel::new(
                            "Banned",
                            format!(
                                r#"You have been banned due to "{}" for {} hours"#,
                                ban_model.reason, ban_model.duration
                            ),
                            new_model.id,
                        ))
                    } else {
                        None
                    }
                }
            },
            Self::Ticket(action) => match action {
                Action::Delete { model } => Some(NotificationModel::new(
                    "Ticket removed",
                    "Your ticket has been deleted",
                    model.opened_by,
                )),
                Action::Update {
                    old_model,
                    new_model,
                } => {
                    if old_model.title != new_model.title {
                        Some(NotificationModel::new(
                            "Ticket renamed",
                            format!(
                                r#"Your ticket "{}" has been renamed to "{}""#,
                                old_model.title, new_model.title
                            ),
                            new_model.opened_by,
                        ))
                    } else if old_model.assigned_to.is_none() && new_model.assigned_to.is_some() {
                        let admin_model = Admin::find_by_id(new_model.assigned_to.unwrap())
                            .one(db)
                            .await
                            .unwrap()
                            .unwrap();
                        Some(NotificationModel::new(
                            "Ticket assigned",
                            format!(
                                r#"Your ticket "{}" has been assigned to {}"#,
                                new_model.title, admin_model.username
                            ),
                            new_model.opened_by,
                        ))
                    } else if old_model.status != new_model.status {
                        Some(NotificationModel::new(
                            "Ticket status changed",
                            format!(
                                r#"Your ticket "{}" has been {}"#,
                                new_model.title,
                                get_status(new_model.status)
                            ),
                            new_model.opened_by,
                        ))
                    } else {
                        None
                    }
                }
                Action::Insert { model } => Some(NotificationModel::new(
                    "Ticket created",
                    format!(r#"Your ticket "{}" has been created"#, model.title),
                    model.opened_by,
                )),
            },
            Self::Invite(action) => match action {
                Action::Delete { model } => {
                    let _team_model = Team::find_by_id(model.team_id)
                        .one(db)
                        .await
                        .unwrap()
                        .unwrap();

                    todo!()
                }
                Action::Insert { .. } => todo!(),
                Action::Update { .. } => todo!(),
            },
        }
    }
}
