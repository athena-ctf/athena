use crate::schemas::{
    Admin, AdminModel, CreateTicketSchema, JsonResponse, Player, PlayerModel, Ticket, TicketModel,
};

oxide_macros::crud!(Ticket, single: [Admin, Player], optional: [], multiple: [], id_descriptor: title);
