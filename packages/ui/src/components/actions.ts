"use server";

import { client } from "@repo/api";
import { cookies } from "next/headers";

export async function verifyFlag(flag: string, challenge_id: string) {
  const { data, error } = await client.POST("/flag/verify", {
    body: {
      challenge_id,
      flag,
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function updateProfile(
  id: string,
  team_id: string,
  display_name: string,
) {
  const { data, error } = await client.PATCH("/player/{id}/update-profile", {
    params: {
      path: {
        id,
      },
    },
    body: {
      display_name,
      team_id,
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value ?? ""}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}
