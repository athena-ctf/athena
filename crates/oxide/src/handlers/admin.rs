use crate::jwt::AuthAdmin;
use crate::schemas::{Admin, AdminModel, CreateAdminSchema, JsonResponse, Ticket, TicketModel};

oxide_macros::crud!(Admin, single: [], optional: [], multiple: [Ticket]);

#[utoipa::path(
    get,
    path = "/admin/current",
    operation_id = "admin_get_current",
    responses(
        (status = 200, description = "Password reset email sent successful", body = AdminModel),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "Admin not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Return currently authenticated admin
pub async fn get_current_logged_in(
    AuthAdmin(admin): AuthAdmin,
    state: State<Arc<AppState>>,
) -> Result<Json<AdminModel>> {
    let Some(model) = Admin::find_by_id(admin.sub).one(&state.db_conn).await? else {
        return Err(Error::NotFound("Admin not found".to_owned()));
    };

    Ok(Json(model))
}
