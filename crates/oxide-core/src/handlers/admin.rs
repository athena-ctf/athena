use crate::schemas::{
    Admin, AdminModel, AuthAdmin, CreateAdminSchema, JsonResponse, Ticket, TicketModel,
};

oxide_macros::crud!(Admin, single: [], optional: [], multiple: [Ticket]);

#[utoipa::path(
    get,
    path = "/admin/current",
    operation_id = "admin_get_current",
    responses(
        (status = 200, description = "Password reset email sent successful", body = AdminModel),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Return currently authenticated user
pub async fn get_current_logged_in(AuthAdmin(admin): AuthAdmin) -> Result<Json<AdminModel>> {
    Ok(Json(admin))
}
