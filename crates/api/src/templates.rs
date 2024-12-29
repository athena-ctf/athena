use askama::Template;

#[derive(Template)]
#[template(path = "reset-password.html")]
pub struct ResetPasswordHtml {
    pub token: String,
}

#[derive(Template)]
#[template(path = "reset-password.html")]
pub struct ResetPasswordPlain {
    pub token: String,
}

#[derive(Template)]
#[template(path = "reset-password.html")]
pub struct VerifyEmailHtml {
    pub token: String,
}

#[derive(Template)]
#[template(path = "reset-password.html")]
pub struct VerifyEmailPlain {
    pub token: String,
}
