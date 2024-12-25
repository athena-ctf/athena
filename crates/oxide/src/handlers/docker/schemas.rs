use std::collections::HashMap;

#[oxide_macros::docker_wrapper(path = "bollard::models::Volume")]
pub struct Volume {
    pub created_at: Option<chrono::DateTime<chrono::Utc>>,
    pub name: String,
    pub driver: String,
    pub mountpoint: String,
    pub status: Option<HashMap<String, HashMap<(), ()>>>,
    pub labels: HashMap<String, String>,
    pub scope: Option<VolumeScopeEnum>,
    pub cluster_volume: Option<ClusterVolume>,
    pub options: HashMap<String, String>,
    pub usage_data: Option<VolumeUsageData>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::VolumeUsageData")]
pub struct VolumeUsageData {
    pub size: i64,
    pub ref_count: i64,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::VolumeScopeEnum")]
pub enum VolumeScopeEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "local")]
    LOCAL,
    #[serde(rename = "global")]
    GLOBAL,
}

#[oxide_macros::docker_wrapper(path = "bollard::volume::CreateVolumeOptions<String>")]
pub struct CreateVolumeBody {
    pub name: String,
    pub driver: String,
    pub driver_opts: HashMap<String, String>,
    pub labels: HashMap<String, String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::VolumePruneResponse")]
pub struct VolumePruneResponse {
    pub volumes_deleted: Option<Vec<String>>,
    pub space_reclaimed: Option<i64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::volume::RemoveVolumeOptions")]
pub struct RemoveVolumeQuery {
    pub force: bool,
}

#[oxide_macros::docker_wrapper(path = "bollard::volume::PruneVolumesOptions<String>")]
pub struct PruneVolumesQuery {
    pub filters: HashMap<String, Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::volume::ListVolumesOptions<String>")]
pub struct ListVolumesQuery {
    pub filters: HashMap<String, Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ClusterVolume")]
pub struct ClusterVolume {
    pub id: Option<String>,
    pub version: Option<ObjectVersion>,
    pub created_at: Option<chrono::DateTime<chrono::Utc>>,
    pub updated_at: Option<chrono::DateTime<chrono::Utc>>,
    pub spec: Option<ClusterVolumeSpec>,
    pub info: Option<ClusterVolumeInfo>,
    pub publish_status: Option<Vec<ClusterVolumePublishStatus>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ClusterVolumeInfo")]
pub struct ClusterVolumeInfo {
    pub capacity_bytes: Option<i64>,
    pub volume_context: Option<HashMap<String, String>>,
    pub volume_id: Option<String>,
    pub accessible_topology: Option<Vec<HashMap<String, Option<Vec<PortBinding>>>>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ClusterVolumePublishStatus")]
pub struct ClusterVolumePublishStatus {
    pub node_id: Option<String>,
    pub state: Option<ClusterVolumePublishStatusStateEnum>,
    pub publish_context: Option<HashMap<String, String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ClusterVolumePublishStatusStateEnum")]
pub enum ClusterVolumePublishStatusStateEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "pending-publish")]
    PENDING_PUBLISH,
    #[serde(rename = "published")]
    PUBLISHED,
    #[serde(rename = "pending-node-unpublish")]
    PENDING_NODE_UNPUBLISH,
    #[serde(rename = "pending-controller-unpublish")]
    PENDING_CONTROLLER_UNPUBLISH,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ClusterVolumeSpec")]
pub struct ClusterVolumeSpec {
    pub group: Option<String>,
    pub access_mode: Option<ClusterVolumeSpecAccessMode>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ClusterVolumeSpecAccessMode")]
pub struct ClusterVolumeSpecAccessMode {
    pub scope: Option<ClusterVolumeSpecAccessModeScopeEnum>,
    pub sharing: Option<ClusterVolumeSpecAccessModeSharingEnum>,
    pub mount_volume: Option<HashMap<(), ()>>,
    pub secrets: Option<Vec<ClusterVolumeSpecAccessModeSecrets>>,
    pub accessibility_requirements: Option<ClusterVolumeSpecAccessModeAccessibilityRequirements>,
    pub capacity_range: Option<ClusterVolumeSpecAccessModeCapacityRange>,
    pub availability: Option<ClusterVolumeSpecAccessModeAvailabilityEnum>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ClusterVolumeSpecAccessModeScopeEnum")]
pub enum ClusterVolumeSpecAccessModeScopeEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "single")]
    SINGLE,
    #[serde(rename = "multi")]
    MULTI,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ClusterVolumeSpecAccessModeSharingEnum")]
pub enum ClusterVolumeSpecAccessModeSharingEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "none")]
    NONE,
    #[serde(rename = "readonly")]
    READONLY,
    #[serde(rename = "onewriter")]
    ONEWRITER,
    #[serde(rename = "all")]
    ALL,
}

#[oxide_macros::docker_wrapper(
    path = "bollard::models::ClusterVolumeSpecAccessModeAvailabilityEnum"
)]
pub enum ClusterVolumeSpecAccessModeAvailabilityEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "active")]
    ACTIVE,
    #[serde(rename = "pause")]
    PAUSE,
    #[serde(rename = "drain")]
    DRAIN,
}

#[oxide_macros::docker_wrapper(
    path = "bollard::models::ClusterVolumeSpecAccessModeAccessibilityRequirements"
)]
pub struct ClusterVolumeSpecAccessModeAccessibilityRequirements {
    pub requisite: Option<Vec<HashMap<String, Option<Vec<PortBinding>>>>>,
    pub preferred: Option<Vec<HashMap<String, Option<Vec<PortBinding>>>>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ClusterVolumeSpecAccessModeCapacityRange")]
pub struct ClusterVolumeSpecAccessModeCapacityRange {
    pub required_bytes: Option<i64>,
    pub limit_bytes: Option<i64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ClusterVolumeSpecAccessModeSecrets")]
pub struct ClusterVolumeSpecAccessModeSecrets {
    pub key: Option<String>,
    pub secret: Option<String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ObjectVersion")]
pub struct ObjectVersion {
    pub index: Option<u64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::PortBinding")]
pub struct PortBinding {
    pub host_ip: Option<String>,
    pub host_port: Option<String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::network::PruneNetworksOptions<String>")]
pub struct PruneNetworksQuery {
    filters: HashMap<String, Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::network::ListNetworksOptions<String>")]
pub struct ListNetworksQuery {
    filters: HashMap<String, Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::network::InspectNetworkOptions<String>")]
pub struct InspectNetworkQuery {
    pub verbose: bool,
    pub scope: String,
}

#[oxide_macros::docker_wrapper(path = "bollard::network::ConnectNetworkOptions<String>")]
pub struct ConnectNetworkBody {
    pub container: String,
    pub endpoint_config: EndpointSettings,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::EndpointSettings")]
pub struct EndpointSettings {
    pub ipam_config: Option<EndpointIpamConfig>,
    pub links: Option<Vec<String>>,
    pub mac_address: Option<String>,
    pub aliases: Option<Vec<String>>,
    pub driver_opts: Option<HashMap<String, String>>,
    pub network_id: Option<String>,
    pub endpoint_id: Option<String>,
    pub gateway: Option<String>,
    pub ip_address: Option<String>,
    pub ip_prefix_len: Option<i64>,
    pub ipv6_gateway: Option<String>,
    pub global_ipv6_address: Option<String>,
    pub global_ipv6_prefix_len: Option<i64>,
    pub dns_names: Option<Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::EndpointIpamConfig")]
pub struct EndpointIpamConfig {
    pub ipv4_address: Option<String>,
    pub ipv6_address: Option<String>,
    pub link_local_ips: Option<Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::network::CreateNetworkOptions<String>")]
pub struct CreateNetworkBody {
    pub name: String,
    pub check_duplicate: bool,
    pub driver: String,
    pub internal: bool,
    pub attachable: bool,
    pub ingress: bool,
    pub ipam: Ipam,
    pub enable_ipv6: bool,
    pub options: HashMap<String, String>,
    pub labels: HashMap<String, String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::network::DisconnectNetworkOptions<String>")]
pub struct DisconnectNetworkBody {
    pub container: String,
    pub force: bool,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::NetworkPruneResponse")]
pub struct NetworkPruneResponse {
    pub networks_deleted: Option<Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::NetworkCreateResponse")]
pub struct CreateNetworkResponse {
    pub id: String,
    pub warning: String,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::Network")]
pub struct Network {
    pub name: Option<String>,
    pub id: Option<String>,
    pub created: Option<chrono::DateTime<chrono::Utc>>,
    pub scope: Option<String>,
    pub driver: Option<String>,
    pub enable_ipv4: Option<bool>,
    pub enable_ipv6: Option<bool>,
    pub ipam: Option<Ipam>,
    pub internal: Option<bool>,
    pub attachable: Option<bool>,
    pub ingress: Option<bool>,
    pub config_from: Option<ConfigReference>,
    pub config_only: Option<bool>,
    pub containers: Option<HashMap<String, NetworkContainer>>,
    pub options: Option<HashMap<String, String>>,
    pub labels: Option<HashMap<String, String>>,
    pub peers: Option<Vec<PeerInfo>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::Ipam")]
pub struct Ipam {
    pub driver: Option<String>,
    pub options: Option<HashMap<String, String>>,
    pub config: Option<Vec<IpamConfig>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::IpamConfig")]
pub struct IpamConfig {
    pub subnet: Option<String>,
    pub ip_range: Option<String>,
    pub gateway: Option<String>,
    pub auxiliary_addresses: Option<HashMap<String, String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ConfigReference")]
pub struct ConfigReference {
    pub network: Option<String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::PeerInfo")]
pub struct PeerInfo {
    pub name: Option<String>,
    pub ip: Option<String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::NetworkContainer")]
pub struct NetworkContainer {
    pub name: Option<String>,
    pub endpoint_id: Option<String>,
    pub mac_address: Option<String>,
    pub ipv4_address: Option<String>,
    pub ipv6_address: Option<String>,
}

use axum_typed_multipart::TryFromMultipart;

#[oxide_macros::docker_wrapper(path = "bollard::image::ListImagesOptions<String>")]
pub struct ListImagesQuery {
    pub all: bool,
    pub digests: bool,
    pub filters: HashMap<String, Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::image::PruneImagesOptions<String>")]
pub struct PruneImagesQuery {
    pub filters: HashMap<String, Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::image::RemoveImageOptions")]
pub struct RemoveImageQuery {
    pub force: bool,
    pub noprune: bool,
}

#[oxide_macros::docker_wrapper(path = "bollard::image::TagImageOptions<String>")]
pub struct TagImageBody {
    pub repo: String,
    pub tag: String,
}

#[oxide_macros::docker_wrapper(path = "bollard::image::SearchImagesOptions<String>")]
pub struct SearchImageQuery {
    pub term: String,
    pub limit: Option<u64>,
    pub filters: HashMap<String, Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImagePruneResponse")]
pub struct ImagePruneResponse {
    pub images_deleted: Option<Vec<ImageDeleteResponseItem>>,
    pub space_reclaimed: Option<i64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageDeleteResponseItem")]
pub struct ImageDeleteResponseItem {
    pub untagged: Option<String>,
    pub deleted: Option<String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageInspect")]
pub struct ImageInspect {
    pub id: Option<String>,
    pub repo_tags: Option<Vec<String>>,
    pub repo_digests: Option<Vec<String>>,
    pub parent: Option<String>,
    pub comment: Option<String>,
    pub created: Option<chrono::DateTime<chrono::Utc>>,
    pub docker_version: Option<String>,
    pub author: Option<String>,
    pub config: Option<ImageConfig>,
    pub architecture: Option<String>,
    pub variant: Option<String>,
    pub os: Option<String>,
    pub os_version: Option<String>,
    pub size: Option<i64>,
    pub virtual_size: Option<i64>,
    pub graph_driver: Option<DriverData>,
    pub root_fs: Option<ImageInspectRootFs>,
    pub metadata: Option<ImageInspectMetadata>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::DriverData")]
pub struct DriverData {
    pub name: String,
    pub data: HashMap<String, String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageInspectMetadata")]
pub struct ImageInspectMetadata {
    pub last_tag_time: Option<chrono::DateTime<chrono::Utc>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageInspectRootFs")]
pub struct ImageInspectRootFs {
    pub typ: String,
    pub layers: Option<Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageConfig")]
pub struct ImageConfig {
    pub hostname: Option<String>,
    pub domainname: Option<String>,
    pub user: Option<String>,
    pub attach_stdin: Option<bool>,
    pub attach_stdout: Option<bool>,
    pub attach_stderr: Option<bool>,
    pub exposed_ports: Option<HashMap<String, HashMap<(), ()>>>,
    pub tty: Option<bool>,
    pub open_stdin: Option<bool>,
    pub stdin_once: Option<bool>,
    pub env: Option<Vec<String>>,
    pub cmd: Option<Vec<String>>,
    pub healthcheck: Option<HealthConfig>,
    pub args_escaped: Option<bool>,
    pub image: Option<String>,
    pub volumes: Option<HashMap<String, HashMap<(), ()>>>,
    pub working_dir: Option<String>,
    pub entrypoint: Option<Vec<String>>,
    pub network_disabled: Option<bool>,
    pub mac_address: Option<String>,
    pub on_build: Option<Vec<String>>,
    pub labels: Option<HashMap<String, String>>,
    pub stop_signal: Option<String>,
    pub stop_timeout: Option<i64>,
    pub shell: Option<Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::HealthConfig")]
pub struct HealthConfig {
    pub test: Option<Vec<String>>,
    pub interval: Option<i64>,
    pub timeout: Option<i64>,
    pub retries: Option<i64>,
    pub start_period: Option<i64>,
    pub start_interval: Option<i64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageSummary")]
pub struct ImageSummary {
    pub id: String,
    pub parent_id: String,
    pub repo_tags: Vec<String>,
    pub repo_digests: Vec<String>,
    pub created: i64,
    pub size: i64,
    pub shared_size: i64,
    pub virtual_size: Option<i64>,
    pub labels: HashMap<String, String>,
    pub containers: i64,
    pub manifests: Option<Vec<ImageManifestSummary>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageManifestSummary")]
pub struct ImageManifestSummary {
    pub id: String,
    pub descriptor: OciDescriptor,
    pub available: bool,
    pub size: ImageManifestSummarySize,
    pub kind: Option<ImageManifestSummaryKindEnum>,
    pub image_data: Option<ImageManifestSummaryImageData>,
    pub attestation_data: Option<ImageManifestSummaryAttestationData>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::OciDescriptor")]
pub struct OciDescriptor {
    pub media_type: Option<String>,
    pub digest: Option<String>,
    pub size: Option<i64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageManifestSummaryKindEnum")]
pub enum ImageManifestSummaryKindEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "image")]
    IMAGE,
    #[serde(rename = "attestation")]
    ATTESTATION,
    #[serde(rename = "unknown")]
    UNKNOWN,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageManifestSummaryAttestationData")]
pub struct ImageManifestSummaryAttestationData {
    #[serde(rename = "for")]
    pub _for: String,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageManifestSummaryImageData")]
pub struct ImageManifestSummaryImageData {
    pub platform: OciPlatform,
    pub containers: Vec<String>,
    pub size: ImageManifestSummaryImageDataSize,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageManifestSummaryImageDataSize")]
pub struct ImageManifestSummaryImageDataSize {
    pub unpacked: i64,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageManifestSummarySize")]
pub struct ImageManifestSummarySize {
    pub total: i64,
    pub content: i64,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::OciPlatform")]
pub struct OciPlatform {
    pub architecture: Option<String>,
    pub os: Option<String>,
    pub os_version: Option<String>,
    pub os_features: Option<Vec<String>>,
    pub variant: Option<String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::HistoryResponseItem")]
pub struct HistoryResponseItem {
    pub id: String,
    pub created: i64,
    pub created_by: String,
    pub tags: Vec<String>,
    pub size: i64,
    pub comment: String,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ImageSearchResponseItem")]
pub struct ImageSearchResponseItem {
    pub description: Option<String>,
    pub is_official: Option<bool>,
    pub is_automated: Option<bool>,
    pub name: Option<String>,
    pub star_count: Option<i64>,
}

#[derive(Clone, serde::Serialize, serde::Deserialize, utoipa::ToSchema, TryFromMultipart)]
pub struct BuildImageBody {
    pub tag: String,
    pub image_name: String,
    #[schema(value_type = String, format = Binary)]
    pub file: Vec<u8>,
}

impl BuildImageBody {
    pub fn to_push_options(&self) -> bollard::image::PushImageOptions<String> {
        bollard::image::PushImageOptions {
            tag: self.tag.clone(),
        }
    }

    pub fn to_build_options(&self) -> bollard::image::BuildImageOptions<String> {
        bollard::image::BuildImageOptions {
            t: self.tag.clone(),
            rm: true,
            forcerm: true,
            version: bollard::image::BuilderVersion::BuilderBuildKit,
            ..Default::default()
        }
    }
}

#[oxide_macros::docker_wrapper(path = "bollard::container::ListContainersOptions<String>")]
pub struct ListContainersQuery {
    pub all: bool,
    pub limit: Option<isize>,
    pub size: bool,
    pub filters: HashMap<String, Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::PruneContainersOptions<String>")]
pub struct PruneContainersQuery {
    pub filters: HashMap<String, Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ContainerPruneResponse")]
pub struct ContainerPruneResponse {
    pub containers_deleted: Option<Vec<String>>,
    pub space_reclaimed: Option<i64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::CreateContainerOptions<String>")]
pub struct CreateContainerOptions {
    name: String,
    platform: Option<String>,
}

#[derive(serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
pub struct CreateContainerBody {
    pub options: CreateContainerOptions,
    pub config: ContainerConfig,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ContainerCreateResponse")]
pub struct CreateContainerResponse {
    pub id: String,
    pub warnings: Vec<String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::RemoveContainerOptions")]
pub struct RemoveContainerQuery {
    pub v: bool,
    pub force: bool,
    pub link: bool,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::InspectContainerOptions")]
pub struct InspectContainerQuery {
    pub size: bool,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::KillContainerOptions<String>")]
pub struct KillContainerBody {
    pub signal: String,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::StopContainerOptions")]
pub struct StopContainerBody {
    pub t: i64,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::StartContainerOptions<String>")]
pub struct StartContainerBody {
    pub detach_keys: String,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ContainerSummary")]
pub struct ContainerSummary {
    pub id: Option<String>,
    pub names: Option<Vec<String>>,
    pub image: Option<String>,
    pub image_id: Option<String>,
    pub command: Option<String>,
    pub created: Option<i64>,
    pub ports: Option<Vec<Port>>,
    pub size_rw: Option<i64>,
    pub size_root_fs: Option<i64>,
    pub labels: Option<HashMap<String, String>>,
    pub state: Option<String>,
    pub status: Option<String>,
    pub host_config: Option<ContainerSummaryHostConfig>,
    pub network_settings: Option<ContainerSummaryNetworkSettings>,
    pub mounts: Option<Vec<MountPoint>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ContainerSummaryHostConfig")]
pub struct ContainerSummaryHostConfig {
    pub network_mode: Option<String>,
    pub annotations: Option<HashMap<String, String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ContainerSummaryNetworkSettings")]
pub struct ContainerSummaryNetworkSettings {
    pub networks: Option<HashMap<String, EndpointSettings>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::Port")]
pub struct Port {
    pub ip: Option<String>,
    pub private_port: u16,
    pub public_port: Option<u16>,
    pub typ: Option<PortTypeEnum>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::PortTypeEnum")]
pub enum PortTypeEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "tcp")]
    TCP,
    #[serde(rename = "udp")]
    UDP,
    #[serde(rename = "sctp")]
    SCTP,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::MountPoint")]
pub struct MountPoint {
    pub typ: Option<MountPointTypeEnum>,
    pub name: Option<String>,
    pub source: Option<String>,
    pub destination: Option<String>,
    pub driver: Option<String>,
    pub mode: Option<String>,
    pub rw: Option<bool>,
    pub propagation: Option<String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::MountPointTypeEnum")]
pub enum MountPointTypeEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "bind")]
    BIND,
    #[serde(rename = "volume")]
    VOLUME,
    #[serde(rename = "tmpfs")]
    TMPFS,
    #[serde(rename = "npipe")]
    NPIPE,
    #[serde(rename = "cluster")]
    CLUSTER,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ContainerInspectResponse")]
pub struct ContainerInspectResponse {
    pub id: Option<String>,
    pub created: Option<String>,
    pub path: Option<String>,
    pub args: Option<Vec<String>>,
    pub state: Option<ContainerState>,
    pub image: Option<String>,
    pub resolv_conf_path: Option<String>,
    pub hostname_path: Option<String>,
    pub hosts_path: Option<String>,
    pub log_path: Option<String>,
    pub name: Option<String>,
    pub restart_count: Option<i64>,
    pub driver: Option<String>,
    pub platform: Option<String>,
    pub mount_label: Option<String>,
    pub process_label: Option<String>,
    pub app_armor_profile: Option<String>,
    pub exec_ids: Option<Vec<String>>,
    pub host_config: Option<HostConfig>,
    pub graph_driver: Option<DriverData>,
    pub size_rw: Option<i64>,
    pub size_root_fs: Option<i64>,
    pub mounts: Option<Vec<MountPoint>>,
    pub config: Option<ContainerConfig>,
    pub network_settings: Option<NetworkSettings>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ContainerState")]
pub struct ContainerState {
    pub status: Option<ContainerStateStatusEnum>,
    pub running: Option<bool>,
    pub paused: Option<bool>,
    pub restarting: Option<bool>,
    pub oom_killed: Option<bool>,
    pub dead: Option<bool>,
    pub pid: Option<i64>,
    pub exit_code: Option<i64>,
    pub error: Option<String>,
    pub started_at: Option<String>,
    pub finished_at: Option<String>,
    pub health: Option<Health>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ContainerStateStatusEnum")]
pub enum ContainerStateStatusEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "created")]
    CREATED,
    #[serde(rename = "running")]
    RUNNING,
    #[serde(rename = "paused")]
    PAUSED,
    #[serde(rename = "restarting")]
    RESTARTING,
    #[serde(rename = "removing")]
    REMOVING,
    #[serde(rename = "exited")]
    EXITED,
    #[serde(rename = "dead")]
    DEAD,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::HostConfig")]
pub struct HostConfig {
    pub cpu_shares: Option<i64>,
    pub memory: Option<i64>,
    pub cgroup_parent: Option<String>,
    pub blkio_weight: Option<u16>,
    pub blkio_weight_device: Option<Vec<ResourcesBlkioWeightDevice>>,
    pub blkio_device_read_bps: Option<Vec<ThrottleDevice>>,
    pub blkio_device_write_bps: Option<Vec<ThrottleDevice>>,
    pub blkio_device_read_iops: Option<Vec<ThrottleDevice>>,
    pub blkio_device_write_iops: Option<Vec<ThrottleDevice>>,
    pub cpu_period: Option<i64>,
    pub cpu_quota: Option<i64>,
    pub cpu_realtime_period: Option<i64>,
    pub cpu_realtime_runtime: Option<i64>,
    pub cpuset_cpus: Option<String>,
    pub cpuset_mems: Option<String>,
    pub devices: Option<Vec<DeviceMapping>>,
    pub device_cgroup_rules: Option<Vec<String>>,
    pub device_requests: Option<Vec<DeviceRequest>>,
    pub kernel_memory_tcp: Option<i64>,
    pub memory_reservation: Option<i64>,
    pub memory_swap: Option<i64>,
    pub memory_swappiness: Option<i64>,
    pub nano_cpus: Option<i64>,
    pub oom_kill_disable: Option<bool>,
    pub init: Option<bool>,
    pub pids_limit: Option<i64>,
    pub ulimits: Option<Vec<ResourcesUlimits>>,
    pub cpu_count: Option<i64>,
    pub cpu_percent: Option<i64>,
    pub io_maximum_iops: Option<i64>,
    pub io_maximum_bandwidth: Option<i64>,
    pub binds: Option<Vec<String>>,
    pub container_id_file: Option<String>,
    pub log_config: Option<HostConfigLogConfig>,
    pub network_mode: Option<String>,
    pub port_bindings: Option<HashMap<String, Option<Vec<PortBinding>>>>,
    pub restart_policy: Option<RestartPolicy>,
    pub auto_remove: Option<bool>,
    pub volume_driver: Option<String>,
    pub volumes_from: Option<Vec<String>>,
    pub mounts: Option<Vec<Mount>>,
    pub console_size: Option<Vec<i32>>,
    pub annotations: Option<HashMap<String, String>>,
    pub cap_add: Option<Vec<String>>,
    pub cap_drop: Option<Vec<String>>,
    pub cgroupns_mode: Option<HostConfigCgroupnsModeEnum>,
    pub dns: Option<Vec<String>>,
    pub dns_options: Option<Vec<String>>,
    pub dns_search: Option<Vec<String>>,
    pub extra_hosts: Option<Vec<String>>,
    pub group_add: Option<Vec<String>>,
    pub ipc_mode: Option<String>,
    pub cgroup: Option<String>,
    pub links: Option<Vec<String>>,
    pub oom_score_adj: Option<i64>,
    pub pid_mode: Option<String>,
    pub privileged: Option<bool>,
    pub publish_all_ports: Option<bool>,
    pub readonly_rootfs: Option<bool>,
    pub security_opt: Option<Vec<String>>,
    pub storage_opt: Option<HashMap<String, String>>,
    pub tmpfs: Option<HashMap<String, String>>,
    pub uts_mode: Option<String>,
    pub userns_mode: Option<String>,
    pub shm_size: Option<i64>,
    pub sysctls: Option<HashMap<String, String>>,
    pub runtime: Option<String>,
    pub isolation: Option<HostConfigIsolationEnum>,
    pub masked_paths: Option<Vec<String>>,
    pub readonly_paths: Option<Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ContainerConfig")]
pub struct ContainerConfig {
    pub hostname: Option<String>,
    pub domainname: Option<String>,
    pub user: Option<String>,
    pub attach_stdin: Option<bool>,
    pub attach_stdout: Option<bool>,
    pub attach_stderr: Option<bool>,
    pub exposed_ports: Option<HashMap<String, HashMap<(), ()>>>,
    pub tty: Option<bool>,
    pub open_stdin: Option<bool>,
    pub stdin_once: Option<bool>,
    pub env: Option<Vec<String>>,
    pub cmd: Option<Vec<String>>,
    pub healthcheck: Option<HealthConfig>,
    pub args_escaped: Option<bool>,
    pub image: Option<String>,
    pub volumes: Option<HashMap<String, HashMap<(), ()>>>,
    pub working_dir: Option<String>,
    pub entrypoint: Option<Vec<String>>,
    pub network_disabled: Option<bool>,
    pub mac_address: Option<String>,
    pub on_build: Option<Vec<String>>,
    pub labels: Option<HashMap<String, String>>,
    pub stop_signal: Option<String>,
    pub stop_timeout: Option<i64>,
    pub shell: Option<Vec<String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::NetworkSettings")]
pub struct NetworkSettings {
    pub bridge: Option<String>,
    pub sandbox_id: Option<String>,
    pub hairpin_mode: Option<bool>,
    pub link_local_ipv6_address: Option<String>,
    pub link_local_ipv6_prefix_len: Option<i64>,
    pub ports: Option<HashMap<String, Option<Vec<PortBinding>>>>,
    pub sandbox_key: Option<String>,
    pub secondary_ip_addresses: Option<Vec<Address>>,
    pub secondary_ipv6_addresses: Option<Vec<Address>>,
    pub endpoint_id: Option<String>,
    pub gateway: Option<String>,
    pub global_ipv6_address: Option<String>,
    pub global_ipv6_prefix_len: Option<i64>,
    pub ip_address: Option<String>,
    pub ip_prefix_len: Option<i64>,
    pub ipv6_gateway: Option<String>,
    pub mac_address: Option<String>,
    pub networks: Option<HashMap<String, EndpointSettings>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::Health")]
pub struct Health {
    pub status: Option<HealthStatusEnum>,
    pub failing_streak: Option<i64>,
    pub log: Option<Vec<HealthcheckResult>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::HealthStatusEnum")]
pub enum HealthStatusEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "none")]
    NONE,
    #[serde(rename = "starting")]
    STARTING,
    #[serde(rename = "healthy")]
    HEALTHY,
    #[serde(rename = "unhealthy")]
    UNHEALTHY,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::HealthcheckResult")]
pub struct HealthcheckResult {
    pub start: Option<chrono::DateTime<chrono::Utc>>,
    pub end: Option<chrono::DateTime<chrono::Utc>>,
    pub exit_code: Option<i64>,
    pub output: Option<String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::Address")]
pub struct Address {
    pub addr: Option<String>,
    pub prefix_len: Option<i64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ResourcesBlkioWeightDevice")]
pub struct ResourcesBlkioWeightDevice {
    pub path: Option<String>,
    pub weight: Option<usize>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ThrottleDevice")]
pub struct ThrottleDevice {
    pub path: Option<String>,
    pub rate: Option<i64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::DeviceMapping")]
pub struct DeviceMapping {
    pub path_on_host: Option<String>,
    pub path_in_container: Option<String>,
    pub cgroup_permissions: Option<String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::DeviceRequest")]
pub struct DeviceRequest {
    pub driver: Option<String>,
    pub count: Option<i64>,
    pub device_ids: Option<Vec<String>>,
    pub capabilities: Option<Vec<Vec<String>>>,
    pub options: Option<HashMap<String, String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ResourcesUlimits")]
pub struct ResourcesUlimits {
    pub name: Option<String>,
    pub soft: Option<i64>,
    pub hard: Option<i64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::HostConfigLogConfig")]
pub struct HostConfigLogConfig {
    #[serde(rename = "type")]
    pub typ: Option<String>,
    pub config: Option<HashMap<String, String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::RestartPolicy")]
pub struct RestartPolicy {
    pub name: Option<RestartPolicyNameEnum>,
    pub maximum_retry_count: Option<i64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::RestartPolicyNameEnum")]
pub enum RestartPolicyNameEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "no")]
    NO,
    #[serde(rename = "always")]
    ALWAYS,
    #[serde(rename = "unless-stopped")]
    UNLESS_STOPPED,
    #[serde(rename = "on-failure")]
    ON_FAILURE,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::Mount")]
pub struct Mount {
    pub target: Option<String>,
    pub source: Option<String>,
    pub typ: Option<MountTypeEnum>,
    pub read_only: Option<bool>,
    pub consistency: Option<String>,
    pub bind_options: Option<MountBindOptions>,
    pub volume_options: Option<MountVolumeOptions>,
    pub tmpfs_options: Option<MountTmpfsOptions>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::MountTypeEnum")]
pub enum MountTypeEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "bind")]
    BIND,
    #[serde(rename = "volume")]
    VOLUME,
    #[serde(rename = "tmpfs")]
    TMPFS,
    #[serde(rename = "npipe")]
    NPIPE,
    #[serde(rename = "cluster")]
    CLUSTER,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::MountBindOptions")]
pub struct MountBindOptions {
    pub propagation: Option<MountBindOptionsPropagationEnum>,
    pub non_recursive: Option<bool>,
    pub create_mountpoint: Option<bool>,
    pub read_only_non_recursive: Option<bool>,
    pub read_only_force_recursive: Option<bool>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::MountBindOptionsPropagationEnum")]
pub enum MountBindOptionsPropagationEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "private")]
    PRIVATE,
    #[serde(rename = "rprivate")]
    RPRIVATE,
    #[serde(rename = "shared")]
    SHARED,
    #[serde(rename = "rshared")]
    RSHARED,
    #[serde(rename = "slave")]
    SLAVE,
    #[serde(rename = "rslave")]
    RSLAVE,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::MountVolumeOptions")]
pub struct MountVolumeOptions {
    pub no_copy: Option<bool>,
    pub labels: Option<HashMap<String, String>>,
    pub driver_config: Option<MountVolumeOptionsDriverConfig>,
    pub subpath: Option<String>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::MountVolumeOptionsDriverConfig")]
pub struct MountVolumeOptionsDriverConfig {
    pub name: Option<String>,
    pub options: Option<HashMap<String, String>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::MountTmpfsOptions")]
pub struct MountTmpfsOptions {
    pub size_bytes: Option<i64>,
    pub mode: Option<i64>,
    pub options: Option<Vec<Vec<String>>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::HostConfigCgroupnsModeEnum")]
pub enum HostConfigCgroupnsModeEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "private")]
    PRIVATE,
    #[serde(rename = "host")]
    HOST,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::HostConfigIsolationEnum")]
pub enum HostConfigIsolationEnum {
    #[serde(rename = "")]
    EMPTY,
    #[serde(rename = "default")]
    DEFAULT,
    #[serde(rename = "process")]
    PROCESS,
    #[serde(rename = "hyperv")]
    HYPERV,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::FilesystemChange")]
pub struct FilesystemChange {
    pub path: String,
    pub kind: ChangeType,
}

#[derive(serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
pub enum ChangeType {
    Modified,
    Added,
    Deleted,
}

impl From<bollard::models::ChangeType> for ChangeType {
    fn from(value: bollard::models::ChangeType) -> Self {
        match value {
            bollard::models::ChangeType::_0 => Self::Modified,
            bollard::models::ChangeType::_1 => Self::Added,
            bollard::models::ChangeType::_2 => Self::Deleted,
        }
    }
}

impl From<ChangeType> for bollard::models::ChangeType {
    fn from(value: ChangeType) -> Self {
        match value {
            ChangeType::Modified => Self::_0,
            ChangeType::Added => Self::_1,
            ChangeType::Deleted => Self::_2,
        }
    }
}

#[oxide_macros::docker_wrapper(path = "bollard::container::RestartContainerOptions")]
pub struct RestartContainerBody {
    pub t: isize,
}

#[oxide_macros::docker_wrapper(path = "bollard::models::ContainerTopResponse")]
pub struct ContainerTopResponse {
    pub titles: Option<Vec<String>>,
    pub processes: Option<Vec<Vec<String>>>,
}

#[derive(serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
#[serde(tag = "type", content = "message")]
pub enum LogOutput {
    StdErr(String),
    StdOut(String),
    StdIn(String),
    Console(String),
}

impl From<bollard::container::LogOutput> for LogOutput {
    fn from(value: bollard::container::LogOutput) -> Self {
        match value {
            bollard::container::LogOutput::Console { message } => {
                Self::Console(String::from_utf8(message.to_vec()).unwrap())
            }
            bollard::container::LogOutput::StdErr { message } => {
                Self::StdErr(String::from_utf8(message.to_vec()).unwrap())
            }
            bollard::container::LogOutput::StdIn { message } => {
                Self::StdIn(String::from_utf8(message.to_vec()).unwrap())
            }
            bollard::container::LogOutput::StdOut { message } => {
                Self::StdOut(String::from_utf8(message.to_vec()).unwrap())
            }
        }
    }
}

#[oxide_macros::docker_wrapper(path = "bollard::container::Stats")]
pub struct Stats {
    pub read: chrono::DateTime<chrono::Utc>,
    pub preread: chrono::DateTime<chrono::Utc>,
    pub num_procs: u32,
    pub pids_stats: PidsStats,
    pub network: Option<NetworkStats>,
    pub networks: Option<HashMap<String, NetworkStats>>,
    pub memory_stats: MemoryStats,
    pub blkio_stats: BlkioStats,
    pub cpu_stats: CPUStats,
    pub precpu_stats: CPUStats,
    pub storage_stats: StorageStats,
    pub name: String,
    pub id: String,
}

#[derive(serde::Serialize, serde::Deserialize, utoipa::ToSchema)]
pub enum MemoryStatsStats {
    V1(MemoryStatsStatsV1),
    V2(MemoryStatsStatsV2),
}

impl From<bollard::container::MemoryStatsStats> for MemoryStatsStats {
    fn from(value: bollard::container::MemoryStatsStats) -> Self {
        match value {
            bollard::container::MemoryStatsStats::V1(stats) => Self::V1(stats.into()),
            bollard::container::MemoryStatsStats::V2(stats) => Self::V2(stats.into()),
        }
    }
}

impl From<MemoryStatsStats> for bollard::container::MemoryStatsStats {
    fn from(value: MemoryStatsStats) -> Self {
        match value {
            MemoryStatsStats::V1(stats) => Self::V1(stats.into()),
            MemoryStatsStats::V2(stats) => Self::V2(stats.into()),
        }
    }
}

#[oxide_macros::docker_wrapper(path = "bollard::container::MemoryStatsStatsV1")]
pub struct MemoryStatsStatsV1 {
    pub cache: u64,
    pub dirty: u64,
    pub mapped_file: u64,
    pub total_inactive_file: u64,
    pub pgpgout: u64,
    pub rss: u64,
    pub total_mapped_file: u64,
    pub writeback: u64,
    pub unevictable: u64,
    pub pgpgin: u64,
    pub total_unevictable: u64,
    pub pgmajfault: u64,
    pub total_rss: u64,
    pub total_rss_huge: u64,
    pub total_writeback: u64,
    pub total_inactive_anon: u64,
    pub rss_huge: u64,
    pub hierarchical_memory_limit: u64,
    pub total_pgfault: u64,
    pub total_active_file: u64,
    pub active_anon: u64,
    pub total_active_anon: u64,
    pub total_pgpgout: u64,
    pub total_cache: u64,
    pub total_dirty: u64,
    pub inactive_anon: u64,
    pub active_file: u64,
    pub pgfault: u64,
    pub inactive_file: u64,
    pub total_pgmajfault: u64,
    pub total_pgpgin: u64,
    pub hierarchical_memsw_limit: Option<u64>,
    pub shmem: Option<u64>,
    pub total_shmem: Option<u64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::MemoryStatsStatsV2")]
pub struct MemoryStatsStatsV2 {
    pub anon: u64,
    pub file: u64,
    pub kernel_stack: u64,
    pub slab: u64,
    pub sock: u64,
    pub shmem: u64,
    pub file_mapped: u64,
    pub file_dirty: u64,
    pub file_writeback: u64,
    pub anon_thp: u64,
    pub inactive_anon: u64,
    pub active_anon: u64,
    pub inactive_file: u64,
    pub active_file: u64,
    pub unevictable: u64,
    pub slab_reclaimable: u64,
    pub slab_unreclaimable: u64,
    pub pgfault: u64,
    pub pgmajfault: u64,
    pub workingset_refault: u64,
    pub workingset_activate: u64,
    pub workingset_nodereclaim: u64,
    pub pgrefill: u64,
    pub pgscan: u64,
    pub pgsteal: u64,
    pub pgactivate: u64,
    pub pgdeactivate: u64,
    pub pglazyfree: u64,
    pub pglazyfreed: u64,
    pub thp_fault_alloc: u64,
    pub thp_collapse_alloc: u64,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::MemoryStats")]
pub struct MemoryStats {
    pub stats: Option<MemoryStatsStats>,
    pub max_usage: Option<u64>,
    pub usage: Option<u64>,
    pub failcnt: Option<u64>,
    pub limit: Option<u64>,
    pub commit: Option<u64>,
    pub commit_peak: Option<u64>,
    pub commitbytes: Option<u64>,
    pub commitpeakbytes: Option<u64>,
    pub privateworkingset: Option<u64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::PidsStats")]
pub struct PidsStats {
    pub current: Option<u64>,
    pub limit: Option<u64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::BlkioStats")]
pub struct BlkioStats {
    pub io_service_bytes_recursive: Option<Vec<BlkioStatsEntry>>,
    pub io_serviced_recursive: Option<Vec<BlkioStatsEntry>>,
    pub io_queue_recursive: Option<Vec<BlkioStatsEntry>>,
    pub io_service_time_recursive: Option<Vec<BlkioStatsEntry>>,
    pub io_wait_time_recursive: Option<Vec<BlkioStatsEntry>>,
    pub io_merged_recursive: Option<Vec<BlkioStatsEntry>>,
    pub io_time_recursive: Option<Vec<BlkioStatsEntry>>,
    pub sectors_recursive: Option<Vec<BlkioStatsEntry>>,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::StorageStats")]
pub struct StorageStats {
    pub read_count_normalized: Option<u64>,
    pub read_size_bytes: Option<u64>,
    pub write_count_normalized: Option<u64>,
    pub write_size_bytes: Option<u64>,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::NetworkStats")]
pub struct NetworkStats {
    pub rx_dropped: u64,
    pub rx_bytes: u64,
    pub rx_errors: u64,
    pub tx_packets: u64,
    pub tx_dropped: u64,
    pub rx_packets: u64,
    pub tx_errors: u64,
    pub tx_bytes: u64,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::CPUStats")]
pub struct CPUStats {
    pub cpu_usage: CPUUsage,
    pub system_cpu_usage: Option<u64>,
    pub online_cpus: Option<u64>,
    pub throttling_data: ThrottlingData,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::BlkioStatsEntry")]
pub struct BlkioStatsEntry {
    pub major: u64,
    pub minor: u64,
    pub op: String,
    pub value: u64,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::ThrottlingData")]
pub struct ThrottlingData {
    pub periods: u64,
    pub throttled_periods: u64,
    pub throttled_time: u64,
}

#[oxide_macros::docker_wrapper(path = "bollard::container::CPUUsage")]
pub struct CPUUsage {
    pub percpu_usage: Option<Vec<u64>>,
    pub usage_in_usermode: u64,
    pub total_usage: u64,
    pub usage_in_kernelmode: u64,
}
