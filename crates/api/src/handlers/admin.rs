use crate::jwt::AuthAdmin;

api_macros::crud!(Admin, single: [], optional: [], multiple: [Ticket]);

#[api_macros::rbac("admin:get_current")]
#[utoipa::path(
    get,
    path = "/admin/current",
    operation_id = "admin_get_current",
    responses(
        (status = 200, body = AdminModel),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn get_current_logged_in(
    AuthAdmin(admin): AuthAdmin,
    state: State<Arc<AppState>>,
) -> Result<ApiResponse<Json<AdminModel>>> {
    let Some(model) = Admin::find_by_id(admin.sub).one(&state.db_conn).await? else {
        return Err(Error::NotFound("Admin not found".to_owned()));
    };

    Ok(ApiResponse::json_ok(model))
}
