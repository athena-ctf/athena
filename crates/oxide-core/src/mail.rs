/*
# Features
- list mailbox.as_ref()es with attributes
- list emails inside a mailbox.as_ref()
- get email data of a email
*/

use imap::types::Flag;
use imap::{Connection, Session};
use imap_proto::NameAttribute;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum MailboxKind {
    Junk,
    Trash,
    Archive,
}

#[derive(Serialize, Deserialize)]
pub struct Mailbox {
    name: String,
    marked: bool,
    kind: MailboxKind,
}

pub fn list_mailboxes(imap_session: &mut Session<Connection>) -> Vec<Mailbox> {
    imap_session
        .list(None, Some("*"))
        .unwrap()
        .iter()
        .filter_map(|names| {
            let mut mailbox = Mailbox {
                kind: MailboxKind::Archive,
                name: names.name().to_string(),
                marked: false,
            };

            for attr in names.attributes() {
                match attr {
                    NameAttribute::Archive => mailbox.kind = MailboxKind::Archive,
                    NameAttribute::Junk => mailbox.kind = MailboxKind::Junk,
                    NameAttribute::Trash => mailbox.kind = MailboxKind::Trash,
                    NameAttribute::Marked => mailbox.marked = true,
                    NameAttribute::Unmarked => mailbox.marked = false,
                    NameAttribute::NoSelect => return None,
                    _ => (),
                }
            }

            Some(mailbox)
        })
        .collect()
}

#[derive(Serialize, Deserialize)]
pub struct EmailHeader {
    pub seen: bool,
    pub flagged: bool,
    pub recent: bool,
    pub date: String,
    pub subject: String,
    pub from: Vec<String>,
}

pub fn list_emails_in_mailbox(
    imap_session: &mut Session<Connection>,
    mailbox_name: &str,
) -> Vec<EmailHeader> {
    imap_session.select(mailbox_name).unwrap();

    imap_session
        .fetch("1:*", "(FLAGS ENVELOPE)")
        .unwrap()
        .iter()
        .filter_map(|email| {
            let envelope = email.envelope().unwrap();

            let mut email_header = EmailHeader {
                seen: false,
                flagged: false,
                recent: false,
                date: envelope.date.as_ref().map_or_else(String::new, |field| {
                    String::from_utf8(field.to_vec()).unwrap()
                }),
                subject: envelope.subject.as_ref().map_or_else(String::new, |field| {
                    String::from_utf8(field.to_vec()).unwrap()
                }),
                from: envelope.from.as_ref().map_or_else(Vec::new, |field| {
                    field
                        .iter()
                        .map(|address| {
                            format!(
                                "{}@{}",
                                String::from_utf8(address.mailbox.as_ref().unwrap().to_vec())
                                    .unwrap(),
                                String::from_utf8(address.host.as_ref().unwrap().to_vec()).unwrap()
                            )
                        })
                        .collect()
                }),
            };

            for flag in email.flags() {
                match flag {
                    Flag::Seen => email_header.seen = true,
                    Flag::Recent => email_header.recent = true,
                    Flag::Flagged => email_header.flagged = true,
                    Flag::Deleted | Flag::Draft => return None,
                    _ => (),
                }
            }

            Some(email_header)
        })
        .collect::<Vec<_>>()
}

pub fn retrieve_email(imap_session: &mut Session<Connection>, id: usize, mailbox_name: &str) {
    imap_session.select(mailbox_name).unwrap();

    let binding = imap_session.fetch(id.to_string(), "BODY[]").unwrap();
    let message = binding.iter().next().unwrap();

    message.bodystructure().unwrap();
}
