use crate::schemas::{CreateInviteSchema, Invite, InviteModel, JsonResponse, Team, TeamModel};

oxide_macros::crud!(Invite, single: [Team], optional: [], multiple: []);
