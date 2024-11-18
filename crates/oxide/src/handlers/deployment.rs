use crate::schemas::{
    Challenge, ChallengeModel, CreateDeploymentSchema, Deployment, DeploymentModel, Instance,
    InstanceModel, JsonResponse, Player, PlayerModel,
};

oxide_macros::crud!(Deployment, single: [Challenge, Player], optional: [], multiple: [Instance]);
