use crate::schemas::{
    CreateInstanceSchema, Deployment, DeploymentModel, Instance, InstanceModel, JsonResponse,
};

oxide_macros::crud!(Instance, single: [Deployment], optional: [], multiple: []);
