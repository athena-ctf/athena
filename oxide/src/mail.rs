// use email::backend::Backend;
// use email::envelope::list::{ListEnvelopes, ListEnvelopesOptions};
// use email::envelope::{Envelopes, Id};
// use email::folder::FolderKind;
// use email::imap::ImapContextSync;
// use email::message::get::GetMessages;
// use email::message::Messages;

// pub async fn get_envelopes(imap: Backend<ImapContextSync>, folder: FolderKind) -> Envelopes {
//     // let account_config = Arc::new(AccountConfig::default());

//     // let imap_config = Arc::new(ImapConfig {
//     //     host: "localhost".into(),
//     //     port: 993,
//     //     encryption: Some(ImapEncryptionKind::None),
//     //     login: "alice".into(),
//     //     auth: ImapAuthConfig::Passwd(PasswdConfig(Secret::new_raw("password"))),
//     //     ..Default::default()
//     // });
//     // let imap_ctx = ImapContextBuilder::new(account_config.clone(), imap_config.clone());
//     // let imap = BackendBuilder::new(account_config, imap_ctx)
//     //     .build::<Backend<ImapContextSync>>()
//     //     .await
//     //     ?;

//     imap.list_envelopes(
//         folder.as_str(),
//         ListEnvelopesOptions {
//             page: 1,
//             page_size: 100,
//             query: None,
//         },
//     )
//     .await
//     ?
// }

// pub async fn get_messages(
//     imap: Backend<ImapContextSync>,
//     folder: FolderKind,
//     id: String,
// ) -> Messages {
//     imap.get_messages(folder.as_str(), &Id::single(id))
//         .await
//         ?
// }
