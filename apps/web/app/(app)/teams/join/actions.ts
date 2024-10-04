"use server";

import { client } from "@repo/api";
import { cookies } from "next/headers";

export async function createTeam(email: string, name: string) {
  const { data, error } = await client.POST("/team", {
    body: { name, email },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  if (error) {
    console.error(error.message);
  }

  return data;
}

export async function joinTeam(team_name: string) {
  const { data, error } = await client.GET("/player/join/{team_name}", {
    params: {
      path: {
        team_name,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  if (error) {
    console.error(error.message);
  }

  return data;
}
