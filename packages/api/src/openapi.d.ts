export interface paths {
  "/admin/admin": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_admins"];
    put?: never;
    post: operations["create_admin"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/admin/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_admins"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/admin/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_admin_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/admin/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_admins"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/admin/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_admin_by_id"];
    put: operations["update_admin_by_id"];
    post?: never;
    delete: operations["delete_admin_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/admin/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_admin_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/award": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_awards"];
    put?: never;
    post: operations["create_award"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/award/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_awards"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/award/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_award_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/award/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_awards"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/award/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_award_by_id"];
    put: operations["update_award_by_id"];
    post?: never;
    delete: operations["delete_award_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/award/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_award_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ban": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_bans"];
    put?: never;
    post: operations["create_ban"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ban/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_bans"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ban/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_ban_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ban/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_bans"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ban/player/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["add_player_by_id"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ban/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_ban_by_id"];
    put: operations["update_ban_by_id"];
    post?: never;
    delete: operations["delete_ban_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ban/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_ban_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_challenges"];
    put?: never;
    post: operations["create_challenge"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_challenges"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_challenge_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_challenges"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_challenge_by_id"];
    put: operations["update_challenge_by_id"];
    post?: never;
    delete: operations["delete_challenge_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_challenge_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge_file": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_challenge_files"];
    put?: never;
    post: operations["create_challenge_file"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge_file/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_challenge_files"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge_file/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_challenge_files"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge_file/{challenge_id}-{file_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_challenge_file_by_id"];
    put: operations["update_challenge_file_by_id"];
    post?: never;
    delete: operations["delete_challenge_file_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge_file/{challenge_id}-{file_id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_challenge_file_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/container": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_containers"];
    put?: never;
    post: operations["create_container"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/container/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_containers"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/container/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_container_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/container/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_containers"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/container/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_container_by_id"];
    put: operations["update_container_by_id"];
    post?: never;
    delete: operations["delete_container_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/container/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_container_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/current": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["admin_get_current"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/deployment": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_deployments"];
    put?: never;
    post: operations["create_deployment"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/deployment/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_deployments"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/deployment/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_deployment_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/deployment/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_deployments"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/deployment/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_deployment_by_id"];
    put: operations["update_deployment_by_id"];
    post?: never;
    delete: operations["delete_deployment_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/deployment/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_deployment_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_container_list"];
    put?: never;
    post: operations["docker_container_create"];
    delete: operations["docker_container_prune"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container/{name}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_container_inspect"];
    put?: never;
    post?: never;
    delete: operations["docker_container_remove"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container/{name}/changes": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_container_changes"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container/{name}/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_container_export"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container/{name}/kill": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["docker_container_kill"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container/{name}/logs": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_container_logs"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container/{name}/pause": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["docker_container_pause"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container/{name}/restart": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["docker_container_restart"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container/{name}/start": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["docker_container_start"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container/{name}/stats": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_container_stats"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container/{name}/stop": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["docker_container_stop"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container/{name}/top": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_container_top"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/container/{name}/unpause": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["docker_container_unpause"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/image": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_image_list"];
    put?: never;
    post: operations["docker_image_create"];
    delete: operations["docker_image_prune"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/image/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_image_search"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/image/{name}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_image_inspect"];
    put?: never;
    post?: never;
    delete: operations["docker_image_remove"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/image/{name}/history": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_image_history"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/image/{name}/tag": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations["docker_image_tag"];
    trace?: never;
  };
  "/admin/docker/network": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_network_list"];
    put?: never;
    post: operations["docker_network_create"];
    delete: operations["docker_network_prune"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/network/{name}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_network_inspect"];
    put?: never;
    post?: never;
    delete: operations["docker_network_remove"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/network/{name}/connect": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["docker_network_connect"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/network/{name}/disconnect": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["docker_network_disconnect"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/volume": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_volume_list"];
    put?: never;
    post: operations["docker_volume_create"];
    delete: operations["docker_volume_prune"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/docker/volume/{name}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["docker_volume_inspect"];
    put?: never;
    post?: never;
    delete: operations["docker_volume_remove"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/file": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_files"];
    put?: never;
    post: operations["create_file"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/file/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_files"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/file/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_file_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/file/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_files"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/file/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_file_by_id"];
    put: operations["update_file_by_id"];
    post?: never;
    delete: operations["delete_file_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/file/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_file_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/fileserver": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["fileserver_upload"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/fileserver/sync": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["fileserver_sync"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/fileserver/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["fileserver_meta"];
    put?: never;
    post?: never;
    delete: operations["fileserver_delete"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/fileserver/{id}/download": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["fileserver_download"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/flag": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_flags"];
    put?: never;
    post: operations["create_flag"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/flag/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_flags"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/flag/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_flag_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/flag/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_flags"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/flag/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_flag_by_id"];
    put: operations["update_flag_by_id"];
    post?: never;
    delete: operations["delete_flag_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/flag/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_flag_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/hint": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_hints"];
    put?: never;
    post: operations["create_hint"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/hint/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_hints"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/hint/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_hint_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/hint/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_hints"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/hint/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_hint_by_id"];
    put: operations["update_hint_by_id"];
    post?: never;
    delete: operations["delete_hint_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/hint/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_hint_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/instance": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_instances"];
    put?: never;
    post: operations["create_instance"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/instance/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_instances"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/instance/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_instance_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/instance/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_instances"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/instance/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_instance_by_id"];
    put: operations["update_instance_by_id"];
    post?: never;
    delete: operations["delete_instance_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/instance/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_instance_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/invite": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_invites"];
    put?: never;
    post: operations["create_invite"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/invite/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_invites"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/invite/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_invite_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/invite/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_invites"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/invite/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_invite_by_id"];
    put: operations["update_invite_by_id"];
    post?: never;
    delete: operations["delete_invite_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/invite/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_invite_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/notification": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_notifications"];
    put?: never;
    post: operations["create_notification"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/notification/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_notifications"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/notification/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_notification_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/notification/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_notifications"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/notification/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_notification_by_id"];
    put: operations["update_notification_by_id"];
    post?: never;
    delete: operations["delete_notification_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/notification/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_notification_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/player": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_players"];
    put?: never;
    post: operations["create_player"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/player/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_players"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/player/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_player_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/player/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_players"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/player/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_player_by_id"];
    put: operations["update_player_by_id"];
    post?: never;
    delete: operations["delete_player_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/player/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_player_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/player_award": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_player_awards"];
    put?: never;
    post: operations["create_player_award"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/player_award/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_player_awards"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/player_award/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_player_awards"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/player_award/{player_id}-{award_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_player_award_by_id"];
    put: operations["update_player_award_by_id"];
    post?: never;
    delete: operations["delete_player_award_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/player_award/{player_id}-{award_id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_player_award_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/rbac/override": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_overrides"];
    put?: never;
    post: operations["create_override"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/rbac/override/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete: operations["remove_override"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/rbac/override/{override}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations["update_override"];
    trace?: never;
  };
  "/admin/rbac/role": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_roles"];
    put?: never;
    post: operations["create_role"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/rbac/role/{name}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete: operations["remove_role"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/rbac/role/{role}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations["update_role"];
    trace?: never;
  };
  "/admin/settings/{*path}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["settings_retrieve"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations["settings_update"];
    trace?: never;
  };
  "/admin/submission": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_submissions"];
    put?: never;
    post: operations["create_submission"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/submission/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_submissions"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/submission/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_submissions"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/submission/{challenge_id}-{player_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_submission_by_id"];
    put: operations["update_submission_by_id"];
    post?: never;
    delete: operations["delete_submission_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/submission/{challenge_id}-{player_id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_submission_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/team": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_teams"];
    put?: never;
    post: operations["create_team"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/team/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_teams"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/team/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_team_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/team/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_teams"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/team/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_team_by_id"];
    put: operations["update_team_by_id"];
    post?: never;
    delete: operations["delete_team_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/team/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_team_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ticket": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_tickets"];
    put?: never;
    post: operations["create_ticket"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ticket/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_tickets"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ticket/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_ticket_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ticket/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_tickets"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ticket/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_ticket_by_id"];
    put: operations["update_ticket_by_id"];
    post?: never;
    delete: operations["delete_ticket_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/ticket/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_ticket_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/unban/player/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["remove_player_by_id"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/unlock": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["list_unlocks"];
    put?: never;
    post: operations["create_unlock"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/unlock/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["export_unlocks"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/unlock/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["import_unlocks"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/unlock/{player_id}-{hint_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_unlock_by_id"];
    put: operations["update_unlock_by_id"];
    post?: never;
    delete: operations["delete_unlock_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/unlock/{player_id}-{hint_id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_unlock_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/admin/token": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["admin_token"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/admin/token/refresh": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["admin_token_refresh"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/player/register": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["player_register"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/player/register/send-token": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["player_register_send_token"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/player/register/verify/email": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["player_register_verify_email"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/player/register/verify/invite": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["player_register_verify_invite"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/player/reset-password": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["player_reset_password"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/player/reset-password/send-token": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["player_reset_password_send_token"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/player/token": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["player_token"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/player/token/refresh": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["player_token_refresh"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/challenge/details/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["detailed_challenge"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/challenge/start/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["start_challenge"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/challenge/stop/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["stop_challenge"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/challenges": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["player_challenges"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/current": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["player_get_current"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/file/upload": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["player_file_upload"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/file/{id}/download": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["player_file_download"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/flag/verify": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["verify_flag"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/hint/unlock/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["unlock_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/instance/restart/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put: operations["restart"];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/invite/destroy/{value}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete: operations["destroy_invite"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/invite/new": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["create_new_invite"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/invite/update/{value}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations["update_invite"];
    trace?: never;
  };
  "/player/leaderboard/rankings": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["player_rankings"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/leaderboard/team/rankings": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["team_rankings"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/leaderboard/team/top10": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["team_top_10"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/leaderboard/top10": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["player_top_10"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/notifications": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["player_list"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/notifications/unread": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["player_list_unread"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/summary": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_player_summary"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/team/summary": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_team_summary"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/team/update-profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations["update_team_profile"];
    trace?: never;
  };
  "/player/team/{team_name}/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_team_by_teamname"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/player/update-profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations["update_player_profile"];
    trace?: never;
  };
  "/player/{username}/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["retrieve_profile_by_username"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    Address: {
      addr?: string | null;
      /** Format: int64 */
      prefix_len?: number | null;
    };
    AdminIdSchema: {
      /** Format: uuid */
      id: string;
      username: string;
    };
    AdminModel: {
      /** Format: date-time */
      created_at: string;
      /** Format: uuid */
      id: string;
      role: string;
      /** Format: date-time */
      updated_at: string;
      username: string;
    };
    AdminRelations: {
      tickets: components["schemas"]["TicketIdSchema"][];
    };
    AwardIdSchema: {
      /** Format: uuid */
      id: string;
      value: string;
    };
    AwardModel: {
      /** Format: date-time */
      created_at: string;
      /** Format: uuid */
      id: string;
      logo_url: string;
      /** Format: int32 */
      prize: number;
      /** Format: date-time */
      updated_at: string;
      value: string;
    };
    AwardRelations: {
      player: components["schemas"]["PlayerIdSchema"];
      player_award: components["schemas"]["PlayerAwardIdSchema"];
    };
    AwardsReceived: {
      /** Format: int32 */
      count: number;
      /** Format: date-time */
      created_at: string;
      /** Format: uuid */
      id: string;
      logo_url: string;
      /** Format: int32 */
      prize: number;
      /** Format: date-time */
      updated_at: string;
      value: string;
    };
    BanIdSchema: {
      /** Format: uuid */
      id: string;
      reason: string;
    };
    BanModel: {
      /** Format: date-time */
      created_at: string;
      /** Format: int32 */
      duration: number;
      /** Format: uuid */
      id: string;
      reason: string;
      /** Format: date-time */
      updated_at: string;
    };
    BanRelations: {
      player: components["schemas"]["PlayerIdSchema"];
    };
    BlkioStats: {
      io_merged_recursive?: components["schemas"]["BlkioStatsEntry"][] | null;
      io_queue_recursive?: components["schemas"]["BlkioStatsEntry"][] | null;
      io_service_bytes_recursive?: components["schemas"]["BlkioStatsEntry"][] | null;
      io_service_time_recursive?: components["schemas"]["BlkioStatsEntry"][] | null;
      io_serviced_recursive?: components["schemas"]["BlkioStatsEntry"][] | null;
      io_time_recursive?: components["schemas"]["BlkioStatsEntry"][] | null;
      io_wait_time_recursive?: components["schemas"]["BlkioStatsEntry"][] | null;
      sectors_recursive?: components["schemas"]["BlkioStatsEntry"][] | null;
    };
    BlkioStatsEntry: {
      /** Format: int64 */
      major: number;
      /** Format: int64 */
      minor: number;
      op: string;
      /** Format: int64 */
      value: number;
    };
    BuildImageBody: {
      /** Format: binary */
      file: string;
      image_name: string;
      tag: string;
    };
    CPUStats: {
      cpu_usage: components["schemas"]["CPUUsage"];
      /** Format: int64 */
      online_cpus?: number | null;
      /** Format: int64 */
      system_cpu_usage?: number | null;
      throttling_data: components["schemas"]["ThrottlingData"];
    };
    CPUUsage: {
      percpu_usage?: number[] | null;
      /** Format: int64 */
      total_usage: number;
      /** Format: int64 */
      usage_in_kernelmode: number;
      /** Format: int64 */
      usage_in_usermode: number;
    };
    ChallengeFileIdSchema: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: uuid */
      file_id: string;
    };
    ChallengeFileModel: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: date-time */
      created_at: string;
      /** Format: uuid */
      file_id: string;
      /** Format: date-time */
      updated_at: string;
    };
    ChallengeFileRelations: {
      challenge: components["schemas"]["ChallengeIdSchema"];
      file: components["schemas"]["FileIdSchema"];
    };
    ChallengeIdSchema: {
      /** Format: uuid */
      id: string;
      title: string;
    };
    ChallengeInstance: {
      instance_model: components["schemas"]["InstanceModel"];
      state: components["schemas"]["ContainerStateEnum"];
    };
    /** @enum {string} */
    ChallengeKindEnum:
      | "dynamic_containerized"
      | "regex_flag"
      | "static_containerized"
      | "static_flag";
    ChallengeModel: {
      author_name: string;
      /** Format: date-time */
      created_at: string;
      description: string;
      grouping?: null | components["schemas"]["Grouping"];
      /** Format: uuid */
      id: string;
      kind: components["schemas"]["ChallengeKindEnum"];
      /** Format: int32 */
      level: number;
      /** Format: int32 */
      max_attempts?: number | null;
      /** Format: int32 */
      points: number;
      requirements?: null | components["schemas"]["Requirements"];
      state: components["schemas"]["StateEnum"];
      tags: string[];
      title: string;
      /** Format: date-time */
      updated_at: string;
    };
    ChallengeRelations: {
      challenge_files: components["schemas"]["ChallengeFileIdSchema"][];
      containers: components["schemas"]["ContainerIdSchema"][];
      deployments: components["schemas"]["DeploymentIdSchema"][];
      files: components["schemas"]["FileIdSchema"][];
      flags: components["schemas"]["FlagIdSchema"][];
      hints: components["schemas"]["HintIdSchema"][];
      players: components["schemas"]["PlayerIdSchema"][];
      submissions: components["schemas"]["SubmissionIdSchema"][];
    };
    ChallengeSummary: {
      attempts: number;
      challenge: components["schemas"]["ChallengeModel"];
      deployment?: null | components["schemas"]["DeploymentModel"];
      state: components["schemas"]["PlayerChallengeState"];
    };
    /** @enum {string} */
    ChangeType: "Modified" | "Added" | "Deleted";
    ClusterVolume: {
      /** Format: date-time */
      created_at?: string | null;
      id?: string | null;
      info?: null | components["schemas"]["ClusterVolumeInfo"];
      publish_status?: components["schemas"]["ClusterVolumePublishStatus"][] | null;
      spec?: null | components["schemas"]["ClusterVolumeSpec"];
      /** Format: date-time */
      updated_at?: string | null;
      version?: null | components["schemas"]["ObjectVersion"];
    };
    ClusterVolumeInfo: {
      accessible_topology?:
        | {
            [key: string]: components["schemas"]["PortBinding"][] | null;
          }[]
        | null;
      /** Format: int64 */
      capacity_bytes?: number | null;
      volume_context?: {
        [key: string]: string;
      } | null;
      volume_id?: string | null;
    };
    ClusterVolumePublishStatus: {
      node_id?: string | null;
      publish_context?: {
        [key: string]: string;
      } | null;
      state?: null | components["schemas"]["ClusterVolumePublishStatusStateEnum"];
    };
    /** @enum {string} */
    ClusterVolumePublishStatusStateEnum:
      | "EMPTY"
      | "pending-publish"
      | "published"
      | "pending-node-unpublish"
      | "pending-controller-unpublish";
    ClusterVolumeSpec: {
      access_mode?: null | components["schemas"]["ClusterVolumeSpecAccessMode"];
      group?: string | null;
    };
    ClusterVolumeSpecAccessMode: {
      accessibility_requirements?:
        | null
        | components["schemas"]["ClusterVolumeSpecAccessModeAccessibilityRequirements"];
      availability?: null | components["schemas"]["ClusterVolumeSpecAccessModeAvailabilityEnum"];
      capacity_range?: null | components["schemas"]["ClusterVolumeSpecAccessModeCapacityRange"];
      mount_volume?: {
        [key: string]: unknown;
      } | null;
      scope?: null | components["schemas"]["ClusterVolumeSpecAccessModeScopeEnum"];
      secrets?: components["schemas"]["ClusterVolumeSpecAccessModeSecrets"][] | null;
      sharing?: null | components["schemas"]["ClusterVolumeSpecAccessModeSharingEnum"];
    };
    ClusterVolumeSpecAccessModeAccessibilityRequirements: {
      preferred?:
        | {
            [key: string]: components["schemas"]["PortBinding"][] | null;
          }[]
        | null;
      requisite?:
        | {
            [key: string]: components["schemas"]["PortBinding"][] | null;
          }[]
        | null;
    };
    /** @enum {string} */
    ClusterVolumeSpecAccessModeAvailabilityEnum: "EMPTY" | "active" | "pause" | "drain";
    ClusterVolumeSpecAccessModeCapacityRange: {
      /** Format: int64 */
      limit_bytes?: number | null;
      /** Format: int64 */
      required_bytes?: number | null;
    };
    /** @enum {string} */
    ClusterVolumeSpecAccessModeScopeEnum: "EMPTY" | "single" | "multi";
    ClusterVolumeSpecAccessModeSecrets: {
      key?: string | null;
      secret?: string | null;
    };
    /** @enum {string} */
    ClusterVolumeSpecAccessModeSharingEnum: "EMPTY" | "none" | "readonly" | "onewriter" | "all";
    ConfigReference: {
      network?: string | null;
    };
    ConnectNetworkBody: {
      container: string;
      endpoint_config: components["schemas"]["EndpointSettings"];
    };
    ContainerConfig: {
      args_escaped?: boolean | null;
      attach_stderr?: boolean | null;
      attach_stdin?: boolean | null;
      attach_stdout?: boolean | null;
      cmd?: string[] | null;
      domainname?: string | null;
      entrypoint?: string[] | null;
      env?: string[] | null;
      exposed_ports?: {
        [key: string]: {
          [key: string]: unknown;
        };
      } | null;
      healthcheck?: null | components["schemas"]["HealthConfig"];
      hostname?: string | null;
      image?: string | null;
      labels?: {
        [key: string]: string;
      } | null;
      mac_address?: string | null;
      network_disabled?: boolean | null;
      on_build?: string[] | null;
      open_stdin?: boolean | null;
      shell?: string[] | null;
      stdin_once?: boolean | null;
      stop_signal?: string | null;
      /** Format: int64 */
      stop_timeout?: number | null;
      tty?: boolean | null;
      user?: string | null;
      volumes?: {
        [key: string]: {
          [key: string]: unknown;
        };
      } | null;
      working_dir?: string | null;
    };
    ContainerIdSchema: {
      /** Format: uuid */
      id: string;
      name: string;
    };
    ContainerInspectResponse: {
      app_armor_profile?: string | null;
      args?: string[] | null;
      config?: null | components["schemas"]["ContainerConfig"];
      created?: string | null;
      driver?: string | null;
      exec_ids?: string[] | null;
      graph_driver?: null | components["schemas"]["DriverData"];
      host_config?: null | components["schemas"]["HostConfig"];
      hostname_path?: string | null;
      hosts_path?: string | null;
      id?: string | null;
      image?: string | null;
      log_path?: string | null;
      mount_label?: string | null;
      mounts?: components["schemas"]["MountPoint"][] | null;
      name?: string | null;
      network_settings?: null | components["schemas"]["NetworkSettings"];
      path?: string | null;
      platform?: string | null;
      process_label?: string | null;
      resolv_conf_path?: string | null;
      /** Format: int64 */
      restart_count?: number | null;
      /** Format: int64 */
      size_root_fs?: number | null;
      /** Format: int64 */
      size_rw?: number | null;
      state?: null | components["schemas"]["ContainerState"];
    };
    ContainerModel: {
      /** Format: uuid */
      challenge_id: string;
      command: string;
      /** Format: date-time */
      created_at: string;
      depends_on: string[];
      environment: string[];
      /** Format: uuid */
      id: string;
      image: string;
      internal: boolean;
      /** Format: int32 */
      memory_limit: number;
      name: string;
      networks: string[];
      ports: number[];
      /** Format: date-time */
      updated_at: string;
    };
    ContainerPruneResponse: {
      containers_deleted?: string[] | null;
      /** Format: int64 */
      space_reclaimed?: number | null;
    };
    ContainerRelations: {
      challenge: components["schemas"]["ChallengeIdSchema"];
    };
    ContainerState: {
      dead?: boolean | null;
      error?: string | null;
      /** Format: int64 */
      exit_code?: number | null;
      finished_at?: string | null;
      health?: null | components["schemas"]["Health"];
      oom_killed?: boolean | null;
      paused?: boolean | null;
      /** Format: int64 */
      pid?: number | null;
      restarting?: boolean | null;
      running?: boolean | null;
      started_at?: string | null;
      status?: null | components["schemas"]["ContainerStateStatusEnum"];
    };
    /** @enum {string} */
    ContainerStateEnum:
      | "Created"
      | "Running"
      | "Paused"
      | "Restarting"
      | "Removing"
      | "Exited"
      | "Dead";
    /** @enum {string} */
    ContainerStateStatusEnum:
      | "EMPTY"
      | "created"
      | "running"
      | "paused"
      | "restarting"
      | "removing"
      | "exited"
      | "dead";
    ContainerSummary: {
      command?: string | null;
      /** Format: int64 */
      created?: number | null;
      host_config?: null | components["schemas"]["ContainerSummaryHostConfig"];
      id?: string | null;
      image?: string | null;
      image_id?: string | null;
      labels?: {
        [key: string]: string;
      } | null;
      mounts?: components["schemas"]["MountPoint"][] | null;
      names?: string[] | null;
      network_settings?: null | components["schemas"]["ContainerSummaryNetworkSettings"];
      ports?: components["schemas"]["Port"][] | null;
      /** Format: int64 */
      size_root_fs?: number | null;
      /** Format: int64 */
      size_rw?: number | null;
      state?: string | null;
      status?: string | null;
    };
    ContainerSummaryHostConfig: {
      annotations?: {
        [key: string]: string;
      } | null;
      network_mode?: string | null;
    };
    ContainerSummaryNetworkSettings: {
      networks?: {
        [key: string]: components["schemas"]["EndpointSettings"];
      } | null;
    };
    ContainerTopResponse: {
      processes?: string[][] | null;
      titles?: string[] | null;
    };
    CreateAdminSchema: {
      password: string;
      role: string;
      username: string;
    };
    CreateAwardSchema: {
      logo_url: string;
      /** Format: int32 */
      prize: number;
      value: string;
    };
    CreateBanSchema: {
      /** Format: int32 */
      duration: number;
      reason: string;
    };
    CreateChallengeFileSchema: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: uuid */
      file_id: string;
    };
    CreateChallengeSchema: {
      author_name: string;
      description: string;
      grouping?: null | components["schemas"]["Grouping"];
      kind: components["schemas"]["ChallengeKindEnum"];
      /** Format: int32 */
      level: number;
      /** Format: int32 */
      max_attempts?: number | null;
      /** Format: int32 */
      points: number;
      requirements?: null | components["schemas"]["Requirements"];
      state: components["schemas"]["StateEnum"];
      tags: string[];
      title: string;
    };
    CreateContainerBody: {
      config: components["schemas"]["ContainerConfig"];
      options: components["schemas"]["CreateContainerOptions"];
    };
    CreateContainerOptions: {
      name: string;
      platform?: string | null;
    };
    CreateContainerResponse: {
      id: string;
      warnings: string[];
    };
    CreateContainerSchema: {
      /** Format: uuid */
      challenge_id: string;
      command: string;
      depends_on: string[];
      environment: string[];
      image: string;
      internal: boolean;
      /** Format: int32 */
      memory_limit: number;
      name: string;
      networks: string[];
      ports: number[];
    };
    CreateDeploymentSchema: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: date-time */
      expires_at: string;
      /** Format: uuid */
      player_id?: string | null;
    };
    CreateFileSchema: {
      name: string;
    };
    CreateFlagSchema: {
      /** Format: uuid */
      challenge_id: string;
      ignore_case: boolean;
      /** Format: uuid */
      player_id?: string | null;
      value: string;
    };
    CreateHintSchema: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: int32 */
      cost: number;
      description: string;
    };
    CreateInstanceSchema: {
      container_id: string;
      container_name: string;
      /** Format: uuid */
      deployment_id: string;
      port_mapping: string[];
    };
    CreateInviteSchema: {
      /** Format: date-time */
      expires_at: string;
      /** Format: int32 */
      remaining: number;
      /** Format: uuid */
      team_id: string;
    };
    CreateNetworkBody: {
      attachable: boolean;
      check_duplicate: boolean;
      driver: string;
      enable_ipv6: boolean;
      ingress: boolean;
      internal: boolean;
      ipam: components["schemas"]["Ipam"];
      labels: {
        [key: string]: string;
      };
      name: string;
      options: {
        [key: string]: string;
      };
    };
    CreateNetworkResponse: {
      id: string;
      warning: string;
    };
    CreateNotificationSchema: {
      content: string;
      /** Format: uuid */
      player_id: string;
      /** Format: date-time */
      read_at?: string | null;
      title: string;
    };
    CreatePlayerAwardSchema: {
      /** Format: uuid */
      award_id: string;
      /** Format: int32 */
      count: number;
      /** Format: uuid */
      player_id: string;
    };
    CreatePlayerSchema: {
      avatar_url: string;
      /** Format: uuid */
      ban_id?: string | null;
      discord_id?: string | null;
      email: string;
      password: string;
      /** Format: uuid */
      team_id: string;
      username: string;
    };
    CreateSubmissionSchema: {
      /** Format: uuid */
      challenge_id: string;
      flags: string[];
      is_correct: boolean;
      /** Format: uuid */
      player_id: string;
    };
    CreateTeamSchema: {
      email: string;
      name: string;
    };
    CreateTicketSchema: {
      /** Format: uuid */
      assigned_to?: string | null;
      description: string;
      /** Format: uuid */
      opened_by: string;
      status: components["schemas"]["TicketStatusEnum"];
      title: string;
    };
    CreateUnlockSchema: {
      /** Format: uuid */
      hint_id: string;
      /** Format: uuid */
      player_id: string;
    };
    CreateVolumeBody: {
      driver: string;
      driver_opts: {
        [key: string]: string;
      };
      labels: {
        [key: string]: string;
      };
      name: string;
    };
    DeploymentIdSchema: {
      /** Format: uuid */
      id: string;
    };
    DeploymentModel: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      expires_at: string;
      /** Format: uuid */
      id: string;
      /** Format: uuid */
      player_id?: string | null;
      /** Format: date-time */
      updated_at: string;
    };
    DeploymentRelations: {
      challenge: components["schemas"]["ChallengeIdSchema"];
      instances: components["schemas"]["InstanceIdSchema"][];
      player: components["schemas"]["PlayerIdSchema"];
    };
    DetailedChallenge: {
      files: components["schemas"]["FileModel"][];
      hints: components["schemas"]["HintSummary"][];
      instances?: components["schemas"]["ChallengeInstance"][] | null;
      /** Format: int64 */
      solves: number;
    };
    DeviceMapping: {
      cgroup_permissions?: string | null;
      path_in_container?: string | null;
      path_on_host?: string | null;
    };
    DeviceRequest: {
      capabilities?: string[][] | null;
      /** Format: int64 */
      count?: number | null;
      device_ids?: string[] | null;
      driver?: string | null;
      options?: {
        [key: string]: string;
      } | null;
    };
    DisconnectNetworkBody: {
      container: string;
      force: boolean;
    };
    DriverData: {
      data: {
        [key: string]: string;
      };
      name: string;
    };
    EndpointIpamConfig: {
      ipv4_address?: string | null;
      ipv6_address?: string | null;
      link_local_ips?: string[] | null;
    };
    EndpointSettings: {
      aliases?: string[] | null;
      dns_names?: string[] | null;
      driver_opts?: {
        [key: string]: string;
      } | null;
      endpoint_id?: string | null;
      gateway?: string | null;
      global_ipv6_address?: string | null;
      /** Format: int64 */
      global_ipv6_prefix_len?: number | null;
      ip_address?: string | null;
      /** Format: int64 */
      ip_prefix_len?: number | null;
      ipam_config?: null | components["schemas"]["EndpointIpamConfig"];
      ipv6_gateway?: string | null;
      links?: string[] | null;
      mac_address?: string | null;
      network_id?: string | null;
    };
    /** @enum {string} */
    ExportFormat: "csv" | "xml" | "json";
    FileIdSchema: {
      /** Format: uuid */
      id: string;
      name: string;
    };
    FileModel: {
      /** Format: date-time */
      created_at: string;
      /** Format: uuid */
      id: string;
      name: string;
      /** Format: date-time */
      updated_at: string;
    };
    FileRelations: {
      challenge: components["schemas"]["ChallengeIdSchema"];
    };
    FilesystemChange: {
      kind: components["schemas"]["ChangeType"];
      path: string;
    };
    FlagIdSchema: {
      /** Format: uuid */
      id: string;
      value: string;
    };
    FlagModel: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: date-time */
      created_at: string;
      /** Format: uuid */
      id: string;
      ignore_case: boolean;
      /** Format: uuid */
      player_id?: string | null;
      /** Format: date-time */
      updated_at: string;
      value: string;
    };
    FlagRelations: {
      challenge: components["schemas"]["ChallengeIdSchema"];
      player?: null | components["schemas"]["PlayerIdSchema"];
    };
    FlagVerificationResult: {
      is_correct: boolean;
    };
    Grouping: {
      description: string;
      kind: components["schemas"]["GroupingKind"];
      name: string;
    };
    GroupingKind:
      | {
          data: {
            description: string;
            name: string;
            sequence: string[];
            skipable: boolean;
          };
          /** @enum {string} */
          type: "linear";
        }
      | {
          data: {
            description: string;
            name: string;
          };
          /** @enum {string} */
          type: "simultaneous";
        };
    Health: {
      /** Format: int64 */
      failing_streak?: number | null;
      log?: components["schemas"]["HealthcheckResult"][] | null;
      status?: null | components["schemas"]["HealthStatusEnum"];
    };
    HealthConfig: {
      /** Format: int64 */
      interval?: number | null;
      /** Format: int64 */
      retries?: number | null;
      /** Format: int64 */
      start_interval?: number | null;
      /** Format: int64 */
      start_period?: number | null;
      test?: string[] | null;
      /** Format: int64 */
      timeout?: number | null;
    };
    /** @enum {string} */
    HealthStatusEnum: "EMPTY" | "none" | "starting" | "healthy" | "unhealthy";
    HealthcheckResult: {
      /** Format: date-time */
      end?: string | null;
      /** Format: int64 */
      exit_code?: number | null;
      output?: string | null;
      /** Format: date-time */
      start?: string | null;
    };
    HintIdSchema: {
      description: string;
      /** Format: uuid */
      id: string;
    };
    HintModel: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: int32 */
      cost: number;
      /** Format: date-time */
      created_at: string;
      description: string;
      /** Format: uuid */
      id: string;
      /** Format: date-time */
      updated_at: string;
    };
    HintRelations: {
      challenge: components["schemas"]["ChallengeIdSchema"];
      players: components["schemas"]["PlayerIdSchema"][];
      unlocks: components["schemas"]["UnlockIdSchema"][];
    };
    HintSummary: {
      /** Format: int32 */
      cost: number;
      /** Format: uuid */
      id: string;
      status: components["schemas"]["UnlockStatus"];
    };
    HistoryResponseItem: {
      comment: string;
      /** Format: int64 */
      created: number;
      created_by: string;
      id: string;
      /** Format: int64 */
      size: number;
      tags: string[];
    };
    HostConfig: {
      annotations?: {
        [key: string]: string;
      } | null;
      auto_remove?: boolean | null;
      binds?: string[] | null;
      blkio_device_read_bps?: components["schemas"]["ThrottleDevice"][] | null;
      blkio_device_read_iops?: components["schemas"]["ThrottleDevice"][] | null;
      blkio_device_write_bps?: components["schemas"]["ThrottleDevice"][] | null;
      blkio_device_write_iops?: components["schemas"]["ThrottleDevice"][] | null;
      /** Format: int32 */
      blkio_weight?: number | null;
      blkio_weight_device?: components["schemas"]["ResourcesBlkioWeightDevice"][] | null;
      cap_add?: string[] | null;
      cap_drop?: string[] | null;
      cgroup?: string | null;
      cgroup_parent?: string | null;
      cgroupns_mode?: null | components["schemas"]["HostConfigCgroupnsModeEnum"];
      console_size?: number[] | null;
      container_id_file?: string | null;
      /** Format: int64 */
      cpu_count?: number | null;
      /** Format: int64 */
      cpu_percent?: number | null;
      /** Format: int64 */
      cpu_period?: number | null;
      /** Format: int64 */
      cpu_quota?: number | null;
      /** Format: int64 */
      cpu_realtime_period?: number | null;
      /** Format: int64 */
      cpu_realtime_runtime?: number | null;
      /** Format: int64 */
      cpu_shares?: number | null;
      cpuset_cpus?: string | null;
      cpuset_mems?: string | null;
      device_cgroup_rules?: string[] | null;
      device_requests?: components["schemas"]["DeviceRequest"][] | null;
      devices?: components["schemas"]["DeviceMapping"][] | null;
      dns?: string[] | null;
      dns_options?: string[] | null;
      dns_search?: string[] | null;
      extra_hosts?: string[] | null;
      group_add?: string[] | null;
      init?: boolean | null;
      /** Format: int64 */
      io_maximum_bandwidth?: number | null;
      /** Format: int64 */
      io_maximum_iops?: number | null;
      ipc_mode?: string | null;
      isolation?: null | components["schemas"]["HostConfigIsolationEnum"];
      /** Format: int64 */
      kernel_memory_tcp?: number | null;
      links?: string[] | null;
      log_config?: null | components["schemas"]["HostConfigLogConfig"];
      masked_paths?: string[] | null;
      /** Format: int64 */
      memory?: number | null;
      /** Format: int64 */
      memory_reservation?: number | null;
      /** Format: int64 */
      memory_swap?: number | null;
      /** Format: int64 */
      memory_swappiness?: number | null;
      mounts?: components["schemas"]["Mount"][] | null;
      /** Format: int64 */
      nano_cpus?: number | null;
      network_mode?: string | null;
      oom_kill_disable?: boolean | null;
      /** Format: int64 */
      oom_score_adj?: number | null;
      pid_mode?: string | null;
      /** Format: int64 */
      pids_limit?: number | null;
      port_bindings?: {
        [key: string]: components["schemas"]["PortBinding"][] | null;
      } | null;
      privileged?: boolean | null;
      publish_all_ports?: boolean | null;
      readonly_paths?: string[] | null;
      readonly_rootfs?: boolean | null;
      restart_policy?: null | components["schemas"]["RestartPolicy"];
      runtime?: string | null;
      security_opt?: string[] | null;
      /** Format: int64 */
      shm_size?: number | null;
      storage_opt?: {
        [key: string]: string;
      } | null;
      sysctls?: {
        [key: string]: string;
      } | null;
      tmpfs?: {
        [key: string]: string;
      } | null;
      ulimits?: components["schemas"]["ResourcesUlimits"][] | null;
      userns_mode?: string | null;
      uts_mode?: string | null;
      volume_driver?: string | null;
      volumes_from?: string[] | null;
    };
    /** @enum {string} */
    HostConfigCgroupnsModeEnum: "EMPTY" | "private" | "host";
    /** @enum {string} */
    HostConfigIsolationEnum: "EMPTY" | "default" | "process" | "hyperv";
    HostConfigLogConfig: {
      config?: {
        [key: string]: string;
      } | null;
      type?: string | null;
    };
    ImageConfig: {
      args_escaped?: boolean | null;
      attach_stderr?: boolean | null;
      attach_stdin?: boolean | null;
      attach_stdout?: boolean | null;
      cmd?: string[] | null;
      domainname?: string | null;
      entrypoint?: string[] | null;
      env?: string[] | null;
      exposed_ports?: {
        [key: string]: {
          [key: string]: unknown;
        };
      } | null;
      healthcheck?: null | components["schemas"]["HealthConfig"];
      hostname?: string | null;
      image?: string | null;
      labels?: {
        [key: string]: string;
      } | null;
      mac_address?: string | null;
      network_disabled?: boolean | null;
      on_build?: string[] | null;
      open_stdin?: boolean | null;
      shell?: string[] | null;
      stdin_once?: boolean | null;
      stop_signal?: string | null;
      /** Format: int64 */
      stop_timeout?: number | null;
      tty?: boolean | null;
      user?: string | null;
      volumes?: {
        [key: string]: {
          [key: string]: unknown;
        };
      } | null;
      working_dir?: string | null;
    };
    ImageDeleteResponseItem: {
      deleted?: string | null;
      untagged?: string | null;
    };
    ImageInspect: {
      architecture?: string | null;
      author?: string | null;
      comment?: string | null;
      config?: null | components["schemas"]["ImageConfig"];
      /** Format: date-time */
      created?: string | null;
      docker_version?: string | null;
      graph_driver?: null | components["schemas"]["DriverData"];
      id?: string | null;
      metadata?: null | components["schemas"]["ImageInspectMetadata"];
      os?: string | null;
      os_version?: string | null;
      parent?: string | null;
      repo_digests?: string[] | null;
      repo_tags?: string[] | null;
      root_fs?: null | components["schemas"]["ImageInspectRootFs"];
      /** Format: int64 */
      size?: number | null;
      variant?: string | null;
      /** Format: int64 */
      virtual_size?: number | null;
    };
    ImageInspectMetadata: {
      /** Format: date-time */
      last_tag_time?: string | null;
    };
    ImageInspectRootFs: {
      layers?: string[] | null;
      typ: string;
    };
    ImageManifestSummary: {
      attestation_data?: null | components["schemas"]["ImageManifestSummaryAttestationData"];
      available: boolean;
      descriptor: components["schemas"]["OciDescriptor"];
      id: string;
      image_data?: null | components["schemas"]["ImageManifestSummaryImageData"];
      kind?: null | components["schemas"]["ImageManifestSummaryKindEnum"];
      size: components["schemas"]["ImageManifestSummarySize"];
    };
    ImageManifestSummaryAttestationData: {
      for: string;
    };
    ImageManifestSummaryImageData: {
      containers: string[];
      platform: components["schemas"]["OciPlatform"];
      size: components["schemas"]["ImageManifestSummaryImageDataSize"];
    };
    ImageManifestSummaryImageDataSize: {
      /** Format: int64 */
      unpacked: number;
    };
    /** @enum {string} */
    ImageManifestSummaryKindEnum: "EMPTY" | "image" | "attestation" | "unknown";
    ImageManifestSummarySize: {
      /** Format: int64 */
      content: number;
      /** Format: int64 */
      total: number;
    };
    ImagePruneResponse: {
      images_deleted?: components["schemas"]["ImageDeleteResponseItem"][] | null;
      /** Format: int64 */
      space_reclaimed?: number | null;
    };
    ImageSearchResponseItem: {
      description?: string | null;
      is_automated?: boolean | null;
      is_official?: boolean | null;
      name?: string | null;
      /** Format: int64 */
      star_count?: number | null;
    };
    ImageSummary: {
      /** Format: int64 */
      containers: number;
      /** Format: int64 */
      created: number;
      id: string;
      labels: {
        [key: string]: string;
      };
      manifests?: components["schemas"]["ImageManifestSummary"][] | null;
      parent_id: string;
      repo_digests: string[];
      repo_tags: string[];
      /** Format: int64 */
      shared_size: number;
      /** Format: int64 */
      size: number;
      /** Format: int64 */
      virtual_size?: number | null;
    };
    InstanceIdSchema: {
      container_id: string;
      /** Format: uuid */
      id: string;
    };
    InstanceModel: {
      container_id: string;
      container_name: string;
      /** Format: date-time */
      created_at: string;
      /** Format: uuid */
      deployment_id: string;
      /** Format: uuid */
      id: string;
      port_mapping: string[];
      /** Format: date-time */
      updated_at: string;
    };
    InstanceRelations: {
      deployment: components["schemas"]["DeploymentIdSchema"];
    };
    /** @enum {string} */
    InvalidAction: "hide" | "disable";
    InviteIdSchema: {
      /** Format: uuid */
      id: string;
    };
    InviteModel: {
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      expires_at: string;
      /** Format: uuid */
      id: string;
      /** Format: int32 */
      remaining: number;
      /** Format: uuid */
      team_id: string;
      /** Format: date-time */
      updated_at: string;
    };
    InviteRelations: {
      team: components["schemas"]["TeamIdSchema"];
    };
    InviteVerificationResult: {
      /** Format: uuid */
      invite_id: string;
      /** Format: uuid */
      team_id: string;
    };
    Ipam: {
      config?: components["schemas"]["IpamConfig"][] | null;
      driver?: string | null;
      options?: {
        [key: string]: string;
      } | null;
    };
    IpamConfig: {
      auxiliary_addresses?: {
        [key: string]: string;
      } | null;
      gateway?: string | null;
      ip_range?: string | null;
      subnet?: string | null;
    };
    JsonResponse: {
      message: string;
    };
    KillContainerBody: {
      signal: string;
    };
    LeaderboardRankings: {
      /** Format: int64 */
      count: number;
      /** Format: int64 */
      offset: number;
      rankings: components["schemas"]["Ranking"][];
      /** Format: int64 */
      total: number;
    };
    LogOutput:
      | {
          message: string;
          /** @enum {string} */
          type: "StdErr";
        }
      | {
          message: string;
          /** @enum {string} */
          type: "StdOut";
        }
      | {
          message: string;
          /** @enum {string} */
          type: "StdIn";
        }
      | {
          message: string;
          /** @enum {string} */
          type: "Console";
        };
    LoginRequest: {
      password: string;
      username: string;
    };
    LoginResponse_AdminModel: {
      access_token: string;
      model: {
        /** Format: date-time */
        created_at: string;
        /** Format: uuid */
        id: string;
        role: string;
        /** Format: date-time */
        updated_at: string;
        username: string;
      };
    };
    LoginResponse_PlayerModel: {
      access_token: string;
      model: {
        avatar_url: string;
        /** Format: uuid */
        ban_id?: string | null;
        /** Format: date-time */
        created_at: string;
        discord_id?: string | null;
        email: string;
        /** Format: uuid */
        id: string;
        /** Format: uuid */
        team_id: string;
        /** Format: date-time */
        updated_at: string;
        username: string;
      };
    };
    MemoryStats: {
      /** Format: int64 */
      commit?: number | null;
      /** Format: int64 */
      commit_peak?: number | null;
      /** Format: int64 */
      commitbytes?: number | null;
      /** Format: int64 */
      commitpeakbytes?: number | null;
      /** Format: int64 */
      failcnt?: number | null;
      /** Format: int64 */
      limit?: number | null;
      /** Format: int64 */
      max_usage?: number | null;
      /** Format: int64 */
      privateworkingset?: number | null;
      stats?: null | components["schemas"]["MemoryStatsStats"];
      /** Format: int64 */
      usage?: number | null;
    };
    MemoryStatsStats:
      | {
          V1: components["schemas"]["MemoryStatsStatsV1"];
        }
      | {
          V2: components["schemas"]["MemoryStatsStatsV2"];
        };
    MemoryStatsStatsV1: {
      /** Format: int64 */
      active_anon: number;
      /** Format: int64 */
      active_file: number;
      /** Format: int64 */
      cache: number;
      /** Format: int64 */
      dirty: number;
      /** Format: int64 */
      hierarchical_memory_limit: number;
      /** Format: int64 */
      hierarchical_memsw_limit?: number | null;
      /** Format: int64 */
      inactive_anon: number;
      /** Format: int64 */
      inactive_file: number;
      /** Format: int64 */
      mapped_file: number;
      /** Format: int64 */
      pgfault: number;
      /** Format: int64 */
      pgmajfault: number;
      /** Format: int64 */
      pgpgin: number;
      /** Format: int64 */
      pgpgout: number;
      /** Format: int64 */
      rss: number;
      /** Format: int64 */
      rss_huge: number;
      /** Format: int64 */
      shmem?: number | null;
      /** Format: int64 */
      total_active_anon: number;
      /** Format: int64 */
      total_active_file: number;
      /** Format: int64 */
      total_cache: number;
      /** Format: int64 */
      total_dirty: number;
      /** Format: int64 */
      total_inactive_anon: number;
      /** Format: int64 */
      total_inactive_file: number;
      /** Format: int64 */
      total_mapped_file: number;
      /** Format: int64 */
      total_pgfault: number;
      /** Format: int64 */
      total_pgmajfault: number;
      /** Format: int64 */
      total_pgpgin: number;
      /** Format: int64 */
      total_pgpgout: number;
      /** Format: int64 */
      total_rss: number;
      /** Format: int64 */
      total_rss_huge: number;
      /** Format: int64 */
      total_shmem?: number | null;
      /** Format: int64 */
      total_unevictable: number;
      /** Format: int64 */
      total_writeback: number;
      /** Format: int64 */
      unevictable: number;
      /** Format: int64 */
      writeback: number;
    };
    MemoryStatsStatsV2: {
      /** Format: int64 */
      active_anon: number;
      /** Format: int64 */
      active_file: number;
      /** Format: int64 */
      anon: number;
      /** Format: int64 */
      anon_thp: number;
      /** Format: int64 */
      file: number;
      /** Format: int64 */
      file_dirty: number;
      /** Format: int64 */
      file_mapped: number;
      /** Format: int64 */
      file_writeback: number;
      /** Format: int64 */
      inactive_anon: number;
      /** Format: int64 */
      inactive_file: number;
      /** Format: int64 */
      kernel_stack: number;
      /** Format: int64 */
      pgactivate: number;
      /** Format: int64 */
      pgdeactivate: number;
      /** Format: int64 */
      pgfault: number;
      /** Format: int64 */
      pglazyfree: number;
      /** Format: int64 */
      pglazyfreed: number;
      /** Format: int64 */
      pgmajfault: number;
      /** Format: int64 */
      pgrefill: number;
      /** Format: int64 */
      pgscan: number;
      /** Format: int64 */
      pgsteal: number;
      /** Format: int64 */
      shmem: number;
      /** Format: int64 */
      slab: number;
      /** Format: int64 */
      slab_reclaimable: number;
      /** Format: int64 */
      slab_unreclaimable: number;
      /** Format: int64 */
      sock: number;
      /** Format: int64 */
      thp_collapse_alloc: number;
      /** Format: int64 */
      thp_fault_alloc: number;
      /** Format: int64 */
      unevictable: number;
      /** Format: int64 */
      workingset_activate: number;
      /** Format: int64 */
      workingset_nodereclaim: number;
      /** Format: int64 */
      workingset_refault: number;
    };
    Mount: {
      bind_options?: null | components["schemas"]["MountBindOptions"];
      consistency?: string | null;
      read_only?: boolean | null;
      source?: string | null;
      target?: string | null;
      tmpfs_options?: null | components["schemas"]["MountTmpfsOptions"];
      typ?: null | components["schemas"]["MountTypeEnum"];
      volume_options?: null | components["schemas"]["MountVolumeOptions"];
    };
    MountBindOptions: {
      create_mountpoint?: boolean | null;
      non_recursive?: boolean | null;
      propagation?: null | components["schemas"]["MountBindOptionsPropagationEnum"];
      read_only_force_recursive?: boolean | null;
      read_only_non_recursive?: boolean | null;
    };
    /** @enum {string} */
    MountBindOptionsPropagationEnum:
      | "EMPTY"
      | "private"
      | "rprivate"
      | "shared"
      | "rshared"
      | "slave"
      | "rslave";
    MountPoint: {
      destination?: string | null;
      driver?: string | null;
      mode?: string | null;
      name?: string | null;
      propagation?: string | null;
      rw?: boolean | null;
      source?: string | null;
      typ?: null | components["schemas"]["MountPointTypeEnum"];
    };
    /** @enum {string} */
    MountPointTypeEnum: "EMPTY" | "bind" | "volume" | "tmpfs" | "npipe" | "cluster";
    MountTmpfsOptions: {
      /** Format: int64 */
      mode?: number | null;
      options?: string[][] | null;
      /** Format: int64 */
      size_bytes?: number | null;
    };
    /** @enum {string} */
    MountTypeEnum: "EMPTY" | "bind" | "volume" | "tmpfs" | "npipe" | "cluster";
    MountVolumeOptions: {
      driver_config?: null | components["schemas"]["MountVolumeOptionsDriverConfig"];
      labels?: {
        [key: string]: string;
      } | null;
      no_copy?: boolean | null;
      subpath?: string | null;
    };
    MountVolumeOptionsDriverConfig: {
      name?: string | null;
      options?: {
        [key: string]: string;
      } | null;
    };
    Network: {
      attachable?: boolean | null;
      config_from?: null | components["schemas"]["ConfigReference"];
      config_only?: boolean | null;
      containers?: {
        [key: string]: components["schemas"]["NetworkContainer"];
      } | null;
      /** Format: date-time */
      created?: string | null;
      driver?: string | null;
      enable_ipv4?: boolean | null;
      enable_ipv6?: boolean | null;
      id?: string | null;
      ingress?: boolean | null;
      internal?: boolean | null;
      ipam?: null | components["schemas"]["Ipam"];
      labels?: {
        [key: string]: string;
      } | null;
      name?: string | null;
      options?: {
        [key: string]: string;
      } | null;
      peers?: components["schemas"]["PeerInfo"][] | null;
      scope?: string | null;
    };
    NetworkContainer: {
      endpoint_id?: string | null;
      ipv4_address?: string | null;
      ipv6_address?: string | null;
      mac_address?: string | null;
      name?: string | null;
    };
    NetworkPruneResponse: {
      networks_deleted?: string[] | null;
    };
    NetworkSettings: {
      bridge?: string | null;
      endpoint_id?: string | null;
      gateway?: string | null;
      global_ipv6_address?: string | null;
      /** Format: int64 */
      global_ipv6_prefix_len?: number | null;
      hairpin_mode?: boolean | null;
      ip_address?: string | null;
      /** Format: int64 */
      ip_prefix_len?: number | null;
      ipv6_gateway?: string | null;
      link_local_ipv6_address?: string | null;
      /** Format: int64 */
      link_local_ipv6_prefix_len?: number | null;
      mac_address?: string | null;
      networks?: {
        [key: string]: components["schemas"]["EndpointSettings"];
      } | null;
      ports?: {
        [key: string]: components["schemas"]["PortBinding"][] | null;
      } | null;
      sandbox_id?: string | null;
      sandbox_key?: string | null;
      secondary_ip_addresses?: components["schemas"]["Address"][] | null;
      secondary_ipv6_addresses?: components["schemas"]["Address"][] | null;
    };
    NetworkStats: {
      /** Format: int64 */
      rx_bytes: number;
      /** Format: int64 */
      rx_dropped: number;
      /** Format: int64 */
      rx_errors: number;
      /** Format: int64 */
      rx_packets: number;
      /** Format: int64 */
      tx_bytes: number;
      /** Format: int64 */
      tx_dropped: number;
      /** Format: int64 */
      tx_errors: number;
      /** Format: int64 */
      tx_packets: number;
    };
    NotificationIdSchema: {
      /** Format: uuid */
      id: string;
      title: string;
    };
    NotificationModel: {
      content: string;
      /** Format: date-time */
      created_at: string;
      /** Format: uuid */
      id: string;
      /** Format: uuid */
      player_id: string;
      /** Format: date-time */
      read_at?: string | null;
      title: string;
      /** Format: date-time */
      updated_at: string;
    };
    NotificationRelations: {
      player?: null | components["schemas"]["PlayerIdSchema"];
    };
    ObjectVersion: {
      /** Format: int64 */
      index?: number | null;
    };
    OciDescriptor: {
      digest?: string | null;
      media_type?: string | null;
      /** Format: int64 */
      size?: number | null;
    };
    OciPlatform: {
      architecture?: string | null;
      os?: string | null;
      os_features?: string[] | null;
      os_version?: string | null;
      variant?: string | null;
    };
    OverrideModel: {
      /** Format: uuid */
      id: string;
      permissions: string[];
    };
    PeerInfo: {
      ip?: string | null;
      name?: string | null;
    };
    PidsStats: {
      /** Format: int64 */
      current?: number | null;
      /** Format: int64 */
      limit?: number | null;
    };
    PlayerAwardIdSchema: {
      /** Format: uuid */
      award_id: string;
      /** Format: uuid */
      player_id: string;
    };
    PlayerAwardModel: {
      /** Format: uuid */
      award_id: string;
      /** Format: int32 */
      count: number;
      /** Format: date-time */
      created_at: string;
      /** Format: uuid */
      player_id: string;
      /** Format: date-time */
      updated_at: string;
    };
    PlayerAwardRelations: {
      award: components["schemas"]["AwardIdSchema"];
      player: components["schemas"]["PlayerIdSchema"];
    };
    PlayerChallenge:
      | {
          data: {
            summary: components["schemas"]["ChallengeSummary"];
          };
          /** @enum {string} */
          type: "single";
        }
      | {
          data: {
            group: components["schemas"]["Grouping"];
            summaries: components["schemas"]["ChallengeSummary"][];
          };
          /** @enum {string} */
          type: "group";
        };
    /** @enum {string} */
    PlayerChallengeState: "solved" | "unsolved" | "challenge_limit_reached" | "disabled";
    PlayerChallenges: {
      challenges: components["schemas"]["PlayerChallenge"][];
    };
    PlayerDetails: {
      profile: components["schemas"]["PlayerProfile"];
      submissions: components["schemas"]["SubmissionModel"][];
      unlocks: components["schemas"]["UnlockModel"][];
    };
    PlayerIdSchema: {
      /** Format: uuid */
      id: string;
      username: string;
    };
    PlayerModel: {
      avatar_url: string;
      /** Format: uuid */
      ban_id?: string | null;
      /** Format: date-time */
      created_at: string;
      discord_id?: string | null;
      email: string;
      /** Format: uuid */
      id: string;
      /** Format: uuid */
      team_id: string;
      /** Format: date-time */
      updated_at: string;
      username: string;
    };
    PlayerProfile: {
      awards: components["schemas"]["AwardsReceived"][];
      history: components["schemas"]["PointsHistory"][];
      player: components["schemas"]["PlayerModel"];
      /** Format: int64 */
      rank: number;
      /** Format: int32 */
      score: number;
      solved_challenges: components["schemas"]["ChallengeModel"][];
      tag_solves: components["schemas"]["TagSolves"][];
    };
    PlayerRelations: {
      awards: components["schemas"]["AwardIdSchema"][];
      ban?: null | components["schemas"]["BanIdSchema"];
      challenges: components["schemas"]["ChallengeIdSchema"][];
      deployment?: null | components["schemas"]["DeploymentIdSchema"];
      flags: components["schemas"]["FlagIdSchema"][];
      hints: components["schemas"]["HintIdSchema"][];
      notifications: components["schemas"]["NotificationIdSchema"][];
      player_awards: components["schemas"]["PlayerAwardIdSchema"][];
      submissions: components["schemas"]["SubmissionIdSchema"][];
      team: components["schemas"]["TeamIdSchema"];
      tickets: components["schemas"]["TicketIdSchema"][];
      unlocks: components["schemas"]["UnlockIdSchema"][];
    };
    PointsHistory: {
      /** Format: int64 */
      points: number;
      /** Format: int64 */
      timestamp: number;
    };
    Port: {
      ip?: string | null;
      /** Format: int32 */
      private_port: number;
      /** Format: int32 */
      public_port?: number | null;
      typ?: null | components["schemas"]["PortTypeEnum"];
    };
    PortBinding: {
      host_ip?: string | null;
      host_port?: string | null;
    };
    /** @enum {string} */
    PortTypeEnum: "EMPTY" | "tcp" | "udp" | "sctp";
    Ranking: {
      member: string;
      /** Format: double */
      score: number;
    };
    /** @enum {string} */
    RbacUpdateAction: "add" | "remove";
    RegisterPlayer: {
      avatar_url: string;
      email: string;
      password: string;
      team: components["schemas"]["TeamRegister"];
      token: string;
      username: string;
    };
    RequirementKind:
      | {
          data: {
            /** Format: int64 */
            score: number;
          };
          /** @enum {string} */
          type: "min_score";
        }
      | {
          data: {
            /** Format: int64 */
            score: number;
          };
          /** @enum {string} */
          type: "max_score";
        }
      | {
          data: {
            /** Format: int64 */
            rank: number;
          };
          /** @enum {string} */
          type: "min_rank";
        }
      | {
          data: {
            /** Format: date-time */
            time: string;
          };
          /** @enum {string} */
          type: "after_time";
        }
      | {
          data: {
            /** Format: date-time */
            time: string;
          };
          /** @enum {string} */
          type: "before_time";
        }
      | {
          data: {
            /** Format: date-time */
            end: string;
            /** Format: date-time */
            start: string;
          };
          /** @enum {string} */
          type: "during_time";
        };
    Requirements: {
      invalid_action: components["schemas"]["InvalidAction"];
      kind: components["schemas"]["RequirementKind"];
    };
    ResetPasswordSchema: {
      email: string;
      new_password: string;
      token: string;
    };
    ResourcesBlkioWeightDevice: {
      path?: string | null;
      weight?: number | null;
    };
    ResourcesUlimits: {
      /** Format: int64 */
      hard?: number | null;
      name?: string | null;
      /** Format: int64 */
      soft?: number | null;
    };
    RestartContainerBody: {
      t: number;
    };
    RestartPolicy: {
      /** Format: int64 */
      maximum_retry_count?: number | null;
      name?: null | components["schemas"]["RestartPolicyNameEnum"];
    };
    /** @enum {string} */
    RestartPolicyNameEnum: "EMPTY" | "no" | "always" | "unless-stopped" | "on-failure";
    RoleModel: {
      permissions: string[];
      role: string;
    };
    SendTokenSchema: {
      email: string;
    };
    StartContainerBody: {
      detach_keys: string;
    };
    /** @enum {string} */
    StateEnum: "disabled" | "hidden" | "visible";
    Stats: {
      blkio_stats: components["schemas"]["BlkioStats"];
      cpu_stats: components["schemas"]["CPUStats"];
      id: string;
      memory_stats: components["schemas"]["MemoryStats"];
      name: string;
      network?: null | components["schemas"]["NetworkStats"];
      networks?: {
        [key: string]: components["schemas"]["NetworkStats"];
      } | null;
      /** Format: int32 */
      num_procs: number;
      pids_stats: components["schemas"]["PidsStats"];
      precpu_stats: components["schemas"]["CPUStats"];
      /** Format: date-time */
      preread: string;
      /** Format: date-time */
      read: string;
      storage_stats: components["schemas"]["StorageStats"];
    };
    StopContainerBody: {
      /** Format: int64 */
      t: number;
    };
    StorageStats: {
      /** Format: int64 */
      read_count_normalized?: number | null;
      /** Format: int64 */
      read_size_bytes?: number | null;
      /** Format: int64 */
      write_count_normalized?: number | null;
      /** Format: int64 */
      write_size_bytes?: number | null;
    };
    StoredFile: {
      /** Format: uuid */
      id: string;
      /** Format: date-time */
      last_modified: string;
      location: string;
      name: string;
      size: number;
    };
    SubmissionIdSchema: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: uuid */
      player_id: string;
    };
    SubmissionModel: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: date-time */
      created_at: string;
      flags: string[];
      is_correct: boolean;
      /** Format: uuid */
      player_id: string;
      /** Format: date-time */
      updated_at: string;
    };
    SubmissionRelations: {
      challenge: components["schemas"]["ChallengeIdSchema"];
      player: components["schemas"]["PlayerIdSchema"];
    };
    TagImageBody: {
      repo: string;
      tag: string;
    };
    TagSolves: {
      solves: number;
      tag_value: string;
    };
    TeamDetails: {
      invites: components["schemas"]["InviteModel"][];
      profile: components["schemas"]["TeamProfile"];
      submissions: components["schemas"]["SubmissionModel"][];
      unlocks: components["schemas"]["UnlockModel"][];
    };
    TeamIdSchema: {
      /** Format: uuid */
      id: string;
      name: string;
    };
    TeamMember: {
      /** Format: uuid */
      player_id: string;
      player_username: string;
      /** Format: int64 */
      rank: number;
      /** Format: int32 */
      score: number;
    };
    TeamModel: {
      /** Format: date-time */
      created_at: string;
      email: string;
      /** Format: uuid */
      id: string;
      name: string;
      /** Format: date-time */
      updated_at: string;
    };
    TeamProfile: {
      awards: components["schemas"]["AwardsReceived"][];
      history: components["schemas"]["PointsHistory"][];
      members: components["schemas"]["TeamMember"][];
      /** Format: int64 */
      rank: number;
      /** Format: int32 */
      score: number;
      solved_challenges: components["schemas"]["ChallengeModel"][];
      tag_solves: components["schemas"]["TagSolves"][];
      team: components["schemas"]["TeamModel"];
    };
    TeamRegister:
      | {
          invite_id: string;
          /** @enum {string} */
          kind: "join";
          /** Format: uuid */
          team_id: string;
        }
      | {
          /** @enum {string} */
          kind: "create";
          team_name: string;
        };
    TeamRelations: {
      invites: components["schemas"]["InviteIdSchema"][];
      players: components["schemas"]["PlayerIdSchema"][];
    };
    ThrottleDevice: {
      path?: string | null;
      /** Format: int64 */
      rate?: number | null;
    };
    ThrottlingData: {
      /** Format: int64 */
      periods: number;
      /** Format: int64 */
      throttled_periods: number;
      /** Format: int64 */
      throttled_time: number;
    };
    TicketIdSchema: {
      /** Format: uuid */
      id: string;
      title: string;
    };
    TicketModel: {
      /** Format: uuid */
      assigned_to?: string | null;
      /** Format: date-time */
      created_at: string;
      description: string;
      /** Format: uuid */
      id: string;
      /** Format: uuid */
      opened_by: string;
      status: components["schemas"]["TicketStatusEnum"];
      title: string;
      /** Format: date-time */
      updated_at: string;
    };
    TicketRelations: {
      admin: components["schemas"]["AdminIdSchema"];
      player: components["schemas"]["PlayerIdSchema"];
    };
    /** @enum {string} */
    TicketStatusEnum: "closed" | "open" | "resolved";
    UnlockIdSchema: {
      /** Format: uuid */
      hint_id: string;
      /** Format: uuid */
      player_id: string;
    };
    UnlockModel: {
      /** Format: date-time */
      created_at: string;
      /** Format: uuid */
      hint_id: string;
      /** Format: uuid */
      player_id: string;
      /** Format: date-time */
      updated_at: string;
    };
    UnlockRelations: {
      hint: components["schemas"]["HintIdSchema"];
      player: components["schemas"]["PlayerIdSchema"];
    };
    UnlockStatus:
      | {
          /** @enum {string} */
          kind: "locked";
        }
      | {
          /** @enum {string} */
          kind: "unlocked";
          value: string;
        };
    UpdateChallengeFileSchema: Record<string, never>;
    UpdateInviteSchema: {
      /** Format: date-time */
      expires_at?: string | null;
      /** Format: int32 */
      remaining?: number | null;
    };
    UpdateOverrideSchema: {
      action: components["schemas"]["RbacUpdateAction"];
      permissions: string[];
    };
    UpdatePlayerAwardSchema: {
      /** Format: int32 */
      count: number;
    };
    UpdateProfileSchema: {
      discord_id?: string | null;
      email: string;
      username: string;
    };
    UpdateRoleSchema: {
      action: components["schemas"]["RbacUpdateAction"];
      permissions: string[];
    };
    UpdateSubmissionSchema: {
      flags: string[];
      is_correct: boolean;
    };
    UpdateUnlockSchema: Record<string, never>;
    VerifyFlagSchema: {
      /** Format: uuid */
      challenge_id: string;
      flag: string;
    };
    Volume: {
      cluster_volume?: null | components["schemas"]["ClusterVolume"];
      /** Format: date-time */
      created_at?: string | null;
      driver: string;
      labels: {
        [key: string]: string;
      };
      mountpoint: string;
      name: string;
      options: {
        [key: string]: string;
      };
      scope?: null | components["schemas"]["VolumeScopeEnum"];
      status?: {
        [key: string]: {
          [key: string]: unknown;
        };
      } | null;
      usage_data?: null | components["schemas"]["VolumeUsageData"];
    };
    VolumePruneResponse: {
      /** Format: int64 */
      space_reclaimed?: number | null;
      volumes_deleted?: string[] | null;
    };
    /** @enum {string} */
    VolumeScopeEnum: "EMPTY" | "local" | "global";
    VolumeUsageData: {
      /** Format: int64 */
      ref_count: number;
      /** Format: int64 */
      size: number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  list_admins: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_admin: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateAdminSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_admins: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_admin_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_admins: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_admin_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_admin_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateAdminSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_admin_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_admin_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_awards: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AwardModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_award: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateAwardSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AwardModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_awards: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_award_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AwardIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_awards: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_award_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AwardModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_award_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateAwardSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AwardModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_award_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_award_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AwardRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_bans: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_ban: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateBanSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_bans: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_ban_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_bans: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  add_player_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateBanSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_ban_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_ban_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateBanSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_ban_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_ban_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_challenges: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_challenge: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateChallengeSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_challenges: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_challenge_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_challenges: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_challenge_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_challenge_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateChallengeSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_challenge_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_challenge_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_challenge_files: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeFileModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_challenge_file: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateChallengeFileSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeFileModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_challenge_files: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_challenge_files: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_challenge_file_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        challenge_id: string;
        file_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeFileModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_challenge_file_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        challenge_id: string;
        file_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateChallengeFileSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeFileModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_challenge_file_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        challenge_id: string;
        file_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_challenge_file_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        challenge_id: string;
        file_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeFileRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_containers: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_container: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateContainerSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_containers: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_container_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_containers: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_container_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_container_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateContainerSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_container_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_container_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  admin_get_current: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminModel"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_deployments: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_deployment: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateDeploymentSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_deployments: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_deployment_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_deployments: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_deployment_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_deployment_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateDeploymentSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_deployment_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_deployment_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_list: {
    parameters: {
      query: {
        all: boolean;
        limit?: number;
        size: boolean;
        filters: {
          [key: string]: string[];
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerSummary"][];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_create: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateContainerBody"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["CreateContainerResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_prune: {
    parameters: {
      query: {
        filters: {
          [key: string]: string[];
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerPruneResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_inspect: {
    parameters: {
      query: {
        size: boolean;
      };
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerInspectResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_remove: {
    parameters: {
      query: {
        v: boolean;
        force: boolean;
        link: boolean;
      };
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_changes: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FilesystemChange"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_export: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_kill: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["KillContainerBody"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_logs: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["LogOutput"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_pause: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_restart: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["RestartContainerBody"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_start: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["StartContainerBody"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_stats: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Stats"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_stop: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["StopContainerBody"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_top: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerTopResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_container_unpause: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_image_list: {
    parameters: {
      query: {
        all: boolean;
        digests: boolean;
        filters: {
          [key: string]: string[];
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ImageSummary"][];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_image_create: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["BuildImageBody"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_image_prune: {
    parameters: {
      query: {
        filters: {
          [key: string]: string[];
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ImagePruneResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_image_search: {
    parameters: {
      query: {
        term: string;
        limit?: number;
        filters: {
          [key: string]: string[];
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ImageSearchResponseItem"][];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_image_inspect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ImageInspect"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_image_remove: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_image_history: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HistoryResponseItem"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_image_tag: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["TagImageBody"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_network_list: {
    parameters: {
      query: {
        filters: {
          [key: string]: string[];
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Network"][];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_network_create: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateNetworkBody"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["CreateNetworkResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_network_prune: {
    parameters: {
      query: {
        filters: {
          [key: string]: string[];
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NetworkPruneResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_network_inspect: {
    parameters: {
      query: {
        verbose: boolean;
        scope: string;
      };
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Network"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_network_remove: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_network_connect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ConnectNetworkBody"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_network_disconnect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["DisconnectNetworkBody"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_volume_list: {
    parameters: {
      query: {
        filters: {
          [key: string]: string[];
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Volume"][];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_volume_create: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateVolumeBody"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Volume"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_volume_prune: {
    parameters: {
      query: {
        filters: {
          [key: string]: string[];
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["VolumePruneResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_volume_inspect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Volume"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  docker_volume_remove: {
    parameters: {
      query: {
        force: boolean;
      };
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_files: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_file: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateFileSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_files: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_file_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_files: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_file_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_file_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateFileSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_file_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_file_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  fileserver_upload: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  fileserver_sync: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  fileserver_meta: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["StoredFile"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  fileserver_delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  fileserver_download: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_flags: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_flag: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateFlagSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_flags: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_flag_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_flags: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_flag_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_flag_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateFlagSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_flag_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_flag_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_hints: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_hint: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateHintSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_hints: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_hint_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_hints: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_hint_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_hint_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateHintSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_hint_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_hint_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_instances: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InstanceModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_instance: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateInstanceSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InstanceModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_instances: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_instance_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InstanceIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_instances: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_instance_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InstanceModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_instance_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateInstanceSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InstanceModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_instance_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_instance_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InstanceRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_invites: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_invite: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateInviteSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_invites: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_invite_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_invites: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_invite_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_invite_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateInviteSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_invite_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_invite_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_notifications: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_notification: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateNotificationSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_notifications: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_notification_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_notifications: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_notification_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_notification_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateNotificationSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_notification_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_notification_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_players: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_player: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreatePlayerSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_players: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_player_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_players: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_player_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_player_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreatePlayerSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_player_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_player_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_player_awards: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerAwardModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_player_award: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreatePlayerAwardSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerAwardModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_player_awards: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_player_awards: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_player_award_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        player_id: string;
        award_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerAwardModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_player_award_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        player_id: string;
        award_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdatePlayerAwardSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerAwardModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_player_award_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        player_id: string;
        award_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_player_award_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        player_id: string;
        award_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerAwardRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_overrides: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_override: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OverrideModel"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  remove_override: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_override: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        override: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateOverrideSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_roles: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_role: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["RoleModel"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  remove_role: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_role: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        role: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateRoleSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  settings_retrieve: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        path: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": unknown;
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  settings_update: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        path: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": unknown;
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_submissions: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SubmissionModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_submission: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateSubmissionSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SubmissionModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_submissions: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_submissions: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_submission_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        challenge_id: string;
        player_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SubmissionModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_submission_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        challenge_id: string;
        player_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateSubmissionSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SubmissionModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_submission_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        challenge_id: string;
        player_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_submission_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        challenge_id: string;
        player_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SubmissionRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_teams: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_team: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateTeamSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_teams: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_team_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_teams: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_team_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_team_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateTeamSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_team_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_team_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_tickets: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TicketModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_ticket: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateTicketSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TicketModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_tickets: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_ticket_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TicketIdSchema"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_tickets: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_ticket_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TicketModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_ticket_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateTicketSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TicketModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_ticket_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_ticket_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TicketRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  remove_player_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  list_unlocks: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UnlockModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_unlock: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateUnlockSchema"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UnlockModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  export_unlocks: {
    parameters: {
      query: {
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  import_unlocks: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_unlock_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        player_id: string;
        hint_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UnlockModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_unlock_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        player_id: string;
        hint_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateUnlockSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UnlockModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  delete_unlock_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        player_id: string;
        hint_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_unlock_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        player_id: string;
        hint_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UnlockRelations"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  admin_token: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginRequest"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["LoginResponse_AdminModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  admin_token_refresh: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_register: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["RegisterPlayer"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_register_send_token: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SendTokenSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_register_verify_email: {
    parameters: {
      query: {
        email: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_register_verify_invite: {
    parameters: {
      query: {
        team_name: string;
        invite_code: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteVerificationResult"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_reset_password: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ResetPasswordSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_reset_password_send_token: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SendTokenSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_token: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginRequest"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["LoginResponse_PlayerModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_token_refresh: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  detailed_challenge: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DetailedChallenge"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  start_challenge: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  stop_challenge: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_challenges: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerChallenges"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_get_current: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerModel"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_file_upload: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file: File;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_file_download: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": {
            /** Format: binary */
            file: Blob;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  verify_flag: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["VerifyFlagSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagVerificationResult"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  unlock_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  restart: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  destroy_invite: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        value: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  create_new_invite: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateInviteSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_invite: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        value: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateInviteSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_rankings: {
    parameters: {
      query: {
        offset: number;
        count: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["LeaderboardRankings"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  team_rankings: {
    parameters: {
      query: {
        offset: number;
        count: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["LeaderboardRankings"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  team_top_10: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Ranking"][];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_top_10: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Ranking"][];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_list: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  player_list_unread: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationModel"][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_player_summary: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerDetails"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_team_summary: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamDetails"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_team_profile: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateTeamSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_team_by_teamname: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        team_name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamProfile"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  update_player_profile: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateProfileSchema"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerModel"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
  retrieve_profile_by_username: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerProfile"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
    };
  };
}
