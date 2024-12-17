export interface paths {
  "/admin/admin": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List admins */
    get: operations["list_admins"];
    put?: never;
    /** Create admin */
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
    /** Export admins */
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
    /** List admin ids */
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
    /** Import admins */
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
    /** Retrieve admin by id */
    get: operations["retrieve_admin_by_id"];
    /** Update admin by id */
    put: operations["update_admin_by_id"];
    post?: never;
    /** Delete admin by id */
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
    /** Retrieve admin relations by id */
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
    /** List awards */
    get: operations["list_awards"];
    put?: never;
    /** Create award */
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
    /** Export awards */
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
    /** List award ids */
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
    /** Import awards */
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
    /** Retrieve award by id */
    get: operations["retrieve_award_by_id"];
    /** Update award by id */
    put: operations["update_award_by_id"];
    post?: never;
    /** Delete award by id */
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
    /** Retrieve award relations by id */
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
    /** List bans */
    get: operations["list_bans"];
    put?: never;
    /** Create ban */
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
    /** Export bans */
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
    /** List ban ids */
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
    /** Import bans */
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
    /** Ban player by id */
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
    /** Retrieve ban by id */
    get: operations["retrieve_ban_by_id"];
    /** Update ban by id */
    put: operations["update_ban_by_id"];
    post?: never;
    /** Delete ban by id */
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
    /** Retrieve ban relations by id */
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
    /** List challenges */
    get: operations["list_challenges"];
    put?: never;
    /** Create challenge */
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
    /** Export challenges */
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
    /** List challenge ids */
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
    /** Import challenges */
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
    /** Retrieve challenge by id */
    get: operations["retrieve_challenge_by_id"];
    /** Update challenge by id */
    put: operations["update_challenge_by_id"];
    post?: never;
    /** Delete challenge by id */
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
    /** Retrieve challenge relations by id */
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
    /** List challenge_files */
    get: operations["list_challenge_files"];
    put?: never;
    /** Create challenge_file */
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
    /** Export challenge_files */
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
    /** Import challenge_files */
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
    /** Retrieve challenge_file by id */
    get: operations["retrieve_challenge_file_by_id"];
    /** Update challenge_file by id */
    put: operations["update_challenge_file_by_id"];
    post?: never;
    /** Delete challenge_file by id */
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
    /** Retrieve challenge_file relations by id */
    get: operations["retrieve_challenge_file_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge_tag": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List challenge_tags */
    get: operations["list_challenge_tags"];
    put?: never;
    /** Create challenge_tag */
    post: operations["create_challenge_tag"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge_tag/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Export challenge_tags */
    get: operations["export_challenge_tags"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge_tag/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Import challenge_tags */
    post: operations["import_challenge_tags"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge_tag/{challenge_id}-{tag_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve challenge_tag by id */
    get: operations["retrieve_challenge_tag_by_id"];
    /** Update challenge_tag by id */
    put: operations["update_challenge_tag_by_id"];
    post?: never;
    /** Delete challenge_tag by id */
    delete: operations["delete_challenge_tag_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/challenge_tag/{challenge_id}-{tag_id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve challenge_tag relations by id */
    get: operations["retrieve_challenge_tag_relations_by_id"];
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
    /** List containers */
    get: operations["list_containers"];
    put?: never;
    /** Create container */
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
    /** Export containers */
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
    /** List container ids */
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
    /** Import containers */
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
    /** Retrieve container by id */
    get: operations["retrieve_container_by_id"];
    /** Update container by id */
    put: operations["update_container_by_id"];
    post?: never;
    /** Delete container by id */
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
    /** Retrieve container relations by id */
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
    /** Return currently authenticated admin */
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
    /** List deployments */
    get: operations["list_deployments"];
    put?: never;
    /** Create deployment */
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
    /** Export deployments */
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
    /** List deployment ids */
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
    /** Import deployments */
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
    /** Retrieve deployment by id */
    get: operations["retrieve_deployment_by_id"];
    /** Update deployment by id */
    put: operations["update_deployment_by_id"];
    post?: never;
    /** Delete deployment by id */
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
    /** Retrieve deployment relations by id */
    get: operations["retrieve_deployment_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
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
    /** List files */
    get: operations["list_files"];
    put?: never;
    /** Create file */
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
    /** Export files */
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
    /** List file ids */
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
    /** Import files */
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
    /** Retrieve file by id */
    get: operations["retrieve_file_by_id"];
    /** Update file by id */
    put: operations["update_file_by_id"];
    post?: never;
    /** Delete file by id */
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
    /** Retrieve file relations by id */
    get: operations["retrieve_file_relations_by_id"];
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
    /** List flags */
    get: operations["list_flags"];
    put?: never;
    /** Create flag */
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
    /** Export flags */
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
    /** List flag ids */
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
    /** Import flags */
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
    /** Retrieve flag by id */
    get: operations["retrieve_flag_by_id"];
    /** Update flag by id */
    put: operations["update_flag_by_id"];
    post?: never;
    /** Delete flag by id */
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
    /** Retrieve flag relations by id */
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
    /** List hints */
    get: operations["list_hints"];
    put?: never;
    /** Create hint */
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
    /** Export hints */
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
    /** List hint ids */
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
    /** Import hints */
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
    /** Retrieve hint by id */
    get: operations["retrieve_hint_by_id"];
    /** Update hint by id */
    put: operations["update_hint_by_id"];
    post?: never;
    /** Delete hint by id */
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
    /** Retrieve hint relations by id */
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
    /** List instances */
    get: operations["list_instances"];
    put?: never;
    /** Create instance */
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
    /** Export instances */
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
    /** List instance ids */
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
    /** Import instances */
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
    /** Retrieve instance by id */
    get: operations["retrieve_instance_by_id"];
    /** Update instance by id */
    put: operations["update_instance_by_id"];
    post?: never;
    /** Delete instance by id */
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
    /** Retrieve instance relations by id */
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
    /** List invites */
    get: operations["list_invites"];
    put?: never;
    /** Create invite */
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
    /** Export invites */
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
    /** List invite ids */
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
    /** Import invites */
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
    /** Retrieve invite by id */
    get: operations["retrieve_invite_by_id"];
    /** Update invite by id */
    put: operations["update_invite_by_id"];
    post?: never;
    /** Delete invite by id */
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
    /** Retrieve invite relations by id */
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
    /** List notifications */
    get: operations["list_notifications"];
    put?: never;
    /** Create notification */
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
    /** Export notifications */
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
    /** List notification ids */
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
    /** Import notifications */
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
    /** Retrieve notification by id */
    get: operations["retrieve_notification_by_id"];
    /** Update notification by id */
    put: operations["update_notification_by_id"];
    post?: never;
    /** Delete notification by id */
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
    /** Retrieve notification relations by id */
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
    /** List players */
    get: operations["list_players"];
    put?: never;
    /** Create player */
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
    /** Export players */
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
    /** List player ids */
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
    /** Import players */
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
    /** Retrieve player by id */
    get: operations["retrieve_player_by_id"];
    /** Update player by id */
    put: operations["update_player_by_id"];
    post?: never;
    /** Delete player by id */
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
    /** Retrieve player relations by id */
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
    /** List player_awards */
    get: operations["list_player_awards"];
    put?: never;
    /** Create player_award */
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
    /** Export player_awards */
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
    /** Import player_awards */
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
    /** Retrieve player_award by id */
    get: operations["retrieve_player_award_by_id"];
    /** Update player_award by id */
    put: operations["update_player_award_by_id"];
    post?: never;
    /** Delete player_award by id */
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
    /** Retrieve player_award relations by id */
    get: operations["retrieve_player_award_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/settings/{*path}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve settings at path */
    get: operations["settings_retrieve"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /** Retrieve settings at path */
    patch: operations["settings_update"];
    trace?: never;
  };
  "/admin/stats": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve stats of all tables */
    get: operations["retrieve"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/submission": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List submissions */
    get: operations["list_submissions"];
    put?: never;
    /** Create submission */
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
    /** Export submissions */
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
    /** Import submissions */
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
    /** Retrieve submission by id */
    get: operations["retrieve_submission_by_id"];
    /** Update submission by id */
    put: operations["update_submission_by_id"];
    post?: never;
    /** Delete submission by id */
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
    /** Retrieve submission relations by id */
    get: operations["retrieve_submission_relations_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/tag": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List tags */
    get: operations["list_tags"];
    put?: never;
    /** Create tag */
    post: operations["create_tag"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/tag/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Export tags */
    get: operations["export_tags"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/tag/ids": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List tag ids */
    get: operations["list_tag_ids"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/tag/import": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Import tags */
    post: operations["import_tags"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/tag/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve tag by id */
    get: operations["retrieve_tag_by_id"];
    /** Update tag by id */
    put: operations["update_tag_by_id"];
    post?: never;
    /** Delete tag by id */
    delete: operations["delete_tag_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/admin/tag/{id}/relations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve tag relations by id */
    get: operations["retrieve_tag_relations_by_id"];
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
    /** List teams */
    get: operations["list_teams"];
    put?: never;
    /** Create team */
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
    /** Export teams */
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
    /** List team ids */
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
    /** Import teams */
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
    /** Retrieve team by id */
    get: operations["retrieve_team_by_id"];
    /** Update team by id */
    put: operations["update_team_by_id"];
    post?: never;
    /** Delete team by id */
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
    /** Retrieve team relations by id */
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
    /** List tickets */
    get: operations["list_tickets"];
    put?: never;
    /** Create ticket */
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
    /** Export tickets */
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
    /** List ticket ids */
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
    /** Import tickets */
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
    /** Retrieve ticket by id */
    get: operations["retrieve_ticket_by_id"];
    /** Update ticket by id */
    put: operations["update_ticket_by_id"];
    post?: never;
    /** Delete ticket by id */
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
    /** Retrieve ticket relations by id */
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
    /** Unban player by id */
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
    /** List unlocks */
    get: operations["list_unlocks"];
    put?: never;
    /** Create unlock */
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
    /** Export unlocks */
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
    /** Import unlocks */
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
    /** Retrieve unlock by id */
    get: operations["retrieve_unlock_by_id"];
    /** Update unlock by id */
    put: operations["update_unlock_by_id"];
    post?: never;
    /** Delete unlock by id */
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
    /** Retrieve unlock relations by id */
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
    /** Get admin access token */
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
    /** Refresh admin token */
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
    /** Register player */
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
    /** Send verification token to email */
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
    /** Verify player exists */
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
    /** Verify invite */
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
    /** Auth reset password */
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
    /** Send reset token to email */
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
    /** Get player access token */
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
    /** Refresh player token */
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
    /** Retrieve challenge details by id */
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
    /** Start challenge containers by id */
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
    /** Stop challenge containers by id */
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
    /** List challenge summary by id */
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
    /** Return currently authenticated player */
    get: operations["player_get_current"];
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
    /** Verify flag */
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
    /** Unlock hint by id */
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
    /** Restart instance by id */
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
    /** Destroy invite */
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
    /** Create new invite */
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
    /** Update invite */
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
    get?: never;
    put?: never;
    /** List leaderboard rankings of players with offset and count */
    post: operations["player_rankings"];
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
    get?: never;
    put?: never;
    /** List leaderboard rankings of teams with offset and count */
    post: operations["team_rankings"];
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
    get?: never;
    put?: never;
    /** List top 10 teams of leaderboard */
    post: operations["team_top_10"];
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
    get?: never;
    put?: never;
    /** List top 10 players of leaderboard */
    post: operations["player_top_10"];
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
    /** List player notifications */
    get: operations["player_list"];
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
    /** Retrieve player summary */
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
    /** Retrieve team summary */
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
    /** Retrieve team details by teamname */
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
    /** Retrieve team details by teamname */
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
    /** Update player profile by id */
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
    /** Retrieve player profile by username */
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
      role: components["schemas"]["RoleEnum"];
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
    /** @enum {string} */
    BackendEnum: "azure" | "gcp" | "local" | "s3";
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
      /** Format: uuid */
      id: string;
      kind: components["schemas"]["ChallengeKindEnum"];
      /** Format: int32 */
      level: number;
      /** Format: int32 */
      points: number;
      title: string;
      /** Format: date-time */
      updated_at: string;
    };
    ChallengeRelations: {
      challenge_files: components["schemas"]["ChallengeFileIdSchema"][];
      challenge_tags: components["schemas"]["ChallengeTagIdSchema"][];
      containers: components["schemas"]["ContainerIdSchema"][];
      deployments: components["schemas"]["DeploymentIdSchema"][];
      files: components["schemas"]["FileIdSchema"][];
      flags: components["schemas"]["FlagIdSchema"][];
      hints: components["schemas"]["HintIdSchema"][];
      players: components["schemas"]["PlayerIdSchema"][];
      submissions: components["schemas"]["SubmissionIdSchema"][];
      tags: components["schemas"]["TagIdSchema"][];
    };
    ChallengeSummary: {
      challenge: components["schemas"]["ChallengeModel"];
      deployment?: null | components["schemas"]["DeploymentModel"];
      /** Format: int64 */
      solves: number;
      state: components["schemas"]["PlayerChallengeState"];
      tags: components["schemas"]["TagModel"][];
    };
    ChallengeTagIdSchema: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: uuid */
      tag_id: string;
    };
    ChallengeTagModel: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: date-time */
      created_at: string;
      /** Format: uuid */
      tag_id: string;
      /** Format: date-time */
      updated_at: string;
    };
    ChallengeTagRelations: {
      challenge: components["schemas"]["ChallengeIdSchema"];
      tag: components["schemas"]["TagIdSchema"];
    };
    ContainerIdSchema: {
      /** Format: uuid */
      id: string;
      name: string;
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
    ContainerRelations: {
      challenge: components["schemas"]["ChallengeIdSchema"];
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
    CreateAdminSchema: {
      password: string;
      role: components["schemas"]["RoleEnum"];
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
      kind: components["schemas"]["ChallengeKindEnum"];
      /** Format: int32 */
      level: number;
      /** Format: int32 */
      points: number;
      title: string;
    };
    CreateChallengeTagSchema: {
      /** Format: uuid */
      challenge_id: string;
      /** Format: uuid */
      tag_id: string;
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
      backend: components["schemas"]["BackendEnum"];
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
    CreateTagSchema: {
      value: string;
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
    };
    /** @enum {string} */
    ExportFormat: "csv" | "xml" | "json";
    FileIdSchema: {
      /** Format: uuid */
      id: string;
      name: string;
    };
    FileModel: {
      backend: components["schemas"]["BackendEnum"];
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
    JsonResponse: {
      message: string;
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
        role: components["schemas"]["RoleEnum"];
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
    /** @enum {string} */
    PlayerChallengeState: "solved" | "unsolved" | "challenge_limit_reached";
    PlayerChallenges: {
      summaries: components["schemas"]["ChallengeSummary"][];
      tags: components["schemas"]["TagModel"][];
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
    Ranking: {
      member: string;
      /** Format: double */
      score: number;
    };
    RegisterPlayer: {
      avatar_url: string;
      email: string;
      password: string;
      team: components["schemas"]["TeamRegister"];
      token: string;
      username: string;
    };
    ResetPasswordSchema: {
      email: string;
      new_password: string;
      token: string;
    };
    /** @enum {string} */
    RoleEnum: "analyst" | "editor" | "judge" | "manager" | "moderator";
    SendTokenSchema: {
      email: string;
    };
    StatSchema: {
      /** Format: int64 */
      admin: number;
      /** Format: int64 */
      award: number;
      /** Format: int64 */
      ban: number;
      /** Format: int64 */
      challenge: number;
      /** Format: int64 */
      challenge_tag: number;
      /** Format: int64 */
      container: number;
      /** Format: int64 */
      deployment: number;
      /** Format: int64 */
      file: number;
      /** Format: int64 */
      flag: number;
      /** Format: int64 */
      hint: number;
      /** Format: int64 */
      instance: number;
      /** Format: int64 */
      invite: number;
      /** Format: int64 */
      notification: number;
      /** Format: int64 */
      player: number;
      /** Format: int64 */
      submission: number;
      /** Format: int64 */
      tag: number;
      /** Format: int64 */
      team: number;
      /** Format: int64 */
      ticket: number;
      /** Format: int64 */
      unlocks: number;
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
    TagIdSchema: {
      /** Format: uuid */
      id: string;
      value: string;
    };
    TagModel: {
      /** Format: date-time */
      created_at: string;
      /** Format: uuid */
      id: string;
      /** Format: date-time */
      updated_at: string;
      value: string;
    };
    TagRelations: {
      challenge_tags: components["schemas"]["ChallengeTagIdSchema"][];
      challenges: components["schemas"]["ChallengeIdSchema"][];
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
    UpdateChallengeTagSchema: Record<string, never>;
    UpdateInviteSchema: {
      /** Format: date-time */
      expires_at?: string | null;
      /** Format: int32 */
      remaining?: number | null;
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
      /** @description Listed admins successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created admin successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No admin found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported admins successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed admin ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported admins successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved admin by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No admin found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated admin by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No admin found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted admin by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No admin found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved admin relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No admin found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed awards successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AwardModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created award successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AwardModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No award found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported awards successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed award ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AwardIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported awards successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved award by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AwardModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No award found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated award by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AwardModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No award found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted award by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No award found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved award relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AwardRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No award found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed bans successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created ban successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No ban found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported bans successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed ban ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported bans successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Banned player by id successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No ban found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved ban by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No ban found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated ban by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No ban found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted ban by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No ban found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved ban relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["BanRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No ban found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed challenges successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created challenge successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported challenges successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed challenge ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported challenges successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved challenge by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated challenge by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted challenge by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved challenge relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed challenge_files successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeFileModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created challenge_file successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeFileModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge_file found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported challenge_files successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported challenge_files successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        challenge_id: string;
        /** @description Id of entity */
        file_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved challenge_file by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeFileModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge_file found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        challenge_id: string;
        /** @description Id of entity */
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
      /** @description Updated challenge_file by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeFileModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge_file found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        challenge_id: string;
        /** @description Id of entity */
        file_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted challenge_file by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge_file found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        challenge_id: string;
        /** @description Id of entity */
        file_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved challenge_file relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeFileRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge_file found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  list_challenge_tags: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Listed challenge_tags successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeTagModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  create_challenge_tag: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateChallengeTagSchema"];
      };
    };
    responses: {
      /** @description Created challenge_tag successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeTagModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge_tag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  export_challenge_tags: {
    parameters: {
      query: {
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported challenge_tags successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  import_challenge_tags: {
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
      /** @description Imported challenge_tags successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  retrieve_challenge_tag_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Id of entity */
        challenge_id: string;
        /** @description Id of entity */
        tag_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved challenge_tag by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeTagModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge_tag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  update_challenge_tag_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Id of entity */
        challenge_id: string;
        /** @description Id of entity */
        tag_id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateChallengeTagSchema"];
      };
    };
    responses: {
      /** @description Updated challenge_tag by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeTagModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge_tag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  delete_challenge_tag_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Id of entity */
        challenge_id: string;
        /** @description Id of entity */
        tag_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted challenge_tag by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge_tag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  retrieve_challenge_tag_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Id of entity */
        challenge_id: string;
        /** @description Id of entity */
        tag_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved challenge_tag relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ChallengeTagRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge_tag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed containers successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created container successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No container found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported containers successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed container ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported containers successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved container by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No container found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated container by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No container found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted container by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No container found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved container relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No container found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Password reset email sent successful */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AdminModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed deployments successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created deployment successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No deployment found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported deployments successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed deployment ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported deployments successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved deployment by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No deployment found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated deployment by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No deployment found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted deployment by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No deployment found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved deployment relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No deployment found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed files successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created file successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No file found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported files successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed file ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported files successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved file by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No file found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated file by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No file found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted file by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No file found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved file relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No file found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed flags successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created flag successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No flag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported flags successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed flag ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported flags successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved flag by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No flag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated flag by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No flag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted flag by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No flag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved flag relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No flag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed hints successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created hint successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No hint found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported hints successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed hint ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported hints successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved hint by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No hint found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated hint by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No hint found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted hint by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No hint found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved hint relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No hint found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed instances successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InstanceModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created instance successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InstanceModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No instance found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported instances successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed instance ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InstanceIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported instances successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved instance by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InstanceModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No instance found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated instance by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InstanceModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No instance found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted instance by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No instance found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved instance relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InstanceRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No instance found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed invites successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created invite successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No invite found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported invites successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed invite ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported invites successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved invite by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No invite found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated invite by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No invite found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted invite by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No invite found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved invite relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No invite found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed notifications successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created notification successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No notification found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported notifications successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed notification ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported notifications successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved notification by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No notification found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated notification by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No notification found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted notification by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No notification found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved notification relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No notification found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed players successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created player successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported players successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed player ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported players successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved player by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated player by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted player by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved player relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed player_awards successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerAwardModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created player_award successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerAwardModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player_award found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported player_awards successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported player_awards successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        player_id: string;
        /** @description Id of entity */
        award_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved player_award by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerAwardModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player_award found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        player_id: string;
        /** @description Id of entity */
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
      /** @description Updated player_award by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerAwardModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player_award found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        player_id: string;
        /** @description Id of entity */
        award_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted player_award by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player_award found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        player_id: string;
        /** @description Id of entity */
        award_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved player_award relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerAwardRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player_award found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description The path to the resource */
        path: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved settings successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": unknown;
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description The path to the resource */
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
      /** @description Retrieved settings successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  retrieve: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved stats successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["StatSchema"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed submissions successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SubmissionModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created submission successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SubmissionModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No submission found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported submissions successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported submissions successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        challenge_id: string;
        /** @description Id of entity */
        player_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved submission by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SubmissionModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No submission found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        challenge_id: string;
        /** @description Id of entity */
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
      /** @description Updated submission by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SubmissionModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No submission found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        challenge_id: string;
        /** @description Id of entity */
        player_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted submission by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No submission found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        challenge_id: string;
        /** @description Id of entity */
        player_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved submission relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SubmissionRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No submission found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  list_tags: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Listed tags successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TagModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  create_tag: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateTagSchema"];
      };
    };
    responses: {
      /** @description Created tag successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TagModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No tag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  export_tags: {
    parameters: {
      query: {
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported tags successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  list_tag_ids: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Listed tag ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TagIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  import_tags: {
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
      /** @description Imported tags successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  retrieve_tag_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved tag by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TagModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No tag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  update_tag_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateTagSchema"];
      };
    };
    responses: {
      /** @description Updated tag by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TagModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No tag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  delete_tag_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted tag by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No tag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
  retrieve_tag_relations_by_id: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved tag relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TagRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No tag found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed teams successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created team successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No team found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported teams successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed team ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported teams successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved team by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No team found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated team by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No team found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted team by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No team found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved team relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No team found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed tickets successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TicketModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created ticket successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TicketModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No ticket found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported tickets successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed ticket ids successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TicketIdSchema"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported tickets successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved ticket by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TicketModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No ticket found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Updated ticket by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TicketModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No ticket found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted ticket by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No ticket found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved ticket relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TicketRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No ticket found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Unbanned player by id successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No ban found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed unlocks successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UnlockModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created unlock successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UnlockModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No unlock found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Format to export table */
        format: components["schemas"]["ExportFormat"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Exported unlocks successfully */
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
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Imported unlocks successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        player_id: string;
        /** @description Id of entity */
        hint_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved unlock by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UnlockModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No unlock found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        player_id: string;
        /** @description Id of entity */
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
      /** @description Updated unlock by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UnlockModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No unlock found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        player_id: string;
        /** @description Id of entity */
        hint_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Deleted unlock by id successfully */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No unlock found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        player_id: string;
        /** @description Id of entity */
        hint_id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved unlock relations by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UnlockRelations"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No unlock found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Admin logged in successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["LoginResponse_AdminModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Admin logged in successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Registered player successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Token sent successful */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Player not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Email of player to check */
        email: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Player existence check successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Player not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Team name to check */
        team_name: string;
        /** @description Invite code to verify */
        invite_code: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Verified invite successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteVerificationResult"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Reset password successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Token sent successful */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Player not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Player logged in successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["LoginResponse_PlayerModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Player not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Player logged in successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Player not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description The id of the challenge */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved player challenge details successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DetailedChallenge"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description The id of the challenge */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Started challenge containers successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DeploymentModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description The id of the challenge */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Stopped challenge containers successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed player challenges successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerChallenges"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No challenge found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Retrieved current logged in player successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Player not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Verified flag successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FlagVerificationResult"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Unlocked hint by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HintModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No hint found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of instance */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Restarted instance by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No hint found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description The id of invite */
        value: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Destroyed invite successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Created new invite successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description The value of invite */
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
      /** @description Updated invite successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InviteModel"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Offset of the rankings */
        offset: number;
        /** @description Number of players to get */
        count: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Listed leaderboard rankings of players with offset and count successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["LeaderboardRankings"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Offset of the rankings */
        offset: number;
        /** @description Number of teams to get */
        count: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Listed leaderboard rankings of teams with offset and count successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["LeaderboardRankings"];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed top 10 teams successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Ranking"][];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed top 10 players successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Ranking"][];
        };
      };
      /** @description Invalid request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Listed notifications successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NotificationModel"][];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No hint found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Retrieved player summary by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerDetails"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Retrieved team summary by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamDetails"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Id of entity */
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
      /** @description Retrieved team details by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamModel"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Team name of team */
        team_name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved team details by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["TeamProfile"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
      /** @description Updated player profile by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerModel"];
        };
      };
      /** @description Invalid parameters/request body format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
        /** @description Username of player */
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Retrieved player profile by id successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PlayerProfile"];
        };
      };
      /** @description Invalid parameters format */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Action is permissible after login */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Admin does not have sufficient permissions */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description No player found with specified id */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["JsonResponse"];
        };
      };
      /** @description Unexpected error */
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
