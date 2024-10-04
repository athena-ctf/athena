use axum::routing::MethodRouter;

pub struct AthenaRouter<S> {
    inner: axum::Router<S>,
    paths: Vec<String>,
}

impl<S: Clone + Send + Sync + 'static> AthenaRouter<S> {
    pub fn new() -> Self {
        Self {
            inner: axum::Router::new(),
            paths: Vec::new(),
        }
    }

    pub fn route(mut self, path: &str, method_router: MethodRouter<S>) -> Self {
        self.paths.push(path.to_owned());
        self.inner = self.inner.route(path, method_router);

        self
    }

    pub fn merge(mut self, router: Self) -> Self {
        self.paths.extend_from_slice(&router.paths);
        self.inner = self.inner.merge(router.inner);

        self
    }
}
