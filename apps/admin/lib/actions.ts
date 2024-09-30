"use server";

import { client } from "@repo/api";
import type { loginSchema, registerSchema } from "@repo/ui/schemas";
import { cookies } from "next/headers";
import type { z } from "zod";

export async function login(values: z.infer<typeof loginSchema>) {
  const { data, error } = await client.POST("/auth/token", {
    body: values,
  });

  if (error) {
    throw error.message;
  }

  cookies().set("access_token", data.access_token);
  cookies().set("refresh_token", data.refresh_token);

  return data;
}

export async function register(values: z.infer<typeof registerSchema>) {
  const { data, error } = await client.POST("/auth/register", {
    body: values,
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function verifyEmail(token: string) {
  const { data, error } = await client.POST("/auth/register/verify", {
    body: {
      token,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}
