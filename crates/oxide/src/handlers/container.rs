use crate::schemas::{
    Challenge, ChallengeModel, Container, ContainerModel, CreateContainerSchema, JsonResponse,
};

oxide_macros::crud!(Container, single: [Challenge], optional: [], multiple: [], id_descriptor: name);
