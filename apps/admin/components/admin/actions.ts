"use server";

import { client, type components } from "@repo/api";
import { cookies } from "next/headers";

export async function createAchievement(
  values: components["schemas"]["AchievementDetails"],
) {
  const { data, error } = await client.POST("/achievement", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function createBan(values: components["schemas"]["BanDetails"]) {
  const { data, error } = await client.POST("/ban", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function createChallenge(
  values: components["schemas"]["CreateChallengeSchema"],
) {
  const { data, error } = await client.POST("/challenge", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
    bodySerializer: (body) => {
      const formData = new FormData();

      formData.set("author_name", body.author_name);
      formData.set("container_build_context", body.container_build_context);
      formData.set("description", body.description);
      formData.set("difficulty", body.difficulty);
      formData.set("max_points", body.max_points.toString());
      formData.set("min_points", body.min_points.toString());
      formData.set("status", body.status);

      for (const tag of body.tags) {
        formData.set("tags[]", tag);
      }

      formData.set("title", body.title);

      return formData;
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function uploadFile(
  values: components["schemas"]["UploadedFile"],
) {
  const { data, error } = await client.POST("/file/upload", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
    bodySerializer: (body) => {
      const formData = new FormData();

      formData.set("file", body.file);
      formData.set("backend", body.backend);
      formData.set("challenge_id", body.challenge_id);

      return formData;
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function createFlag(values: components["schemas"]["FlagDetails"]) {
  const { data, error } = await client.POST("/flag", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function createHint(values: components["schemas"]["HintDetails"]) {
  const { data, error } = await client.POST("/hint", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function createInstance(
  values: components["schemas"]["InstanceDetails"],
) {
  const { data, error } = await client.POST("/instance", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function createInvite(
  values: components["schemas"]["InviteDetails"],
) {
  const { data, error } = await client.POST("/invite", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function createNotification(
  values: components["schemas"]["NotificationDetails"],
) {
  const { data, error } = await client.POST("/notification", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function createPlayer(
  values: components["schemas"]["PlayerDetails"],
) {
  const { data, error } = await client.POST("/player", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function createSubmission(
  values: components["schemas"]["SubmissionDetails"],
) {
  const { data, error } = await client.POST("/submission", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function createTag(values: components["schemas"]["TagDetails"]) {
  const { data, error } = await client.POST("/tag", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function createTeam(values: components["schemas"]["TeamDetails"]) {
  const { data, error } = await client.POST("/team", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function createUser(values: components["schemas"]["UserDetails"]) {
  const { data, error } = await client.POST("/user", {
    body: values,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function deleteAchievement(id: string) {
  await client.DELETE("/achievement/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deleteBan(id: string) {
  await client.DELETE("/ban/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deleteChallenge(id: string) {
  await client.DELETE("/challenge/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deleteFile(id: string) {
  await client.DELETE("/file/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deleteFlag(id: string) {
  await client.DELETE("/flag/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deleteHint(id: string) {
  await client.DELETE("/hint/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deleteInstance(id: string) {
  await client.DELETE("/instance/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deleteInvite(id: string) {
  await client.DELETE("/invite/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deleteNotification(id: string) {
  await client.DELETE("/notification/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deletePlayer(id: string) {
  await client.DELETE("/player/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deleteSubmission(id: string) {
  await client.DELETE("/submission/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deleteTag(id: string) {
  await client.DELETE("/tag/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deleteTeam(id: string) {
  await client.DELETE("/team/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}

export async function deleteUser(id: string) {
  await client.DELETE("/user/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });
}
