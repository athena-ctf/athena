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

export async function verify(otp: string) {
  const { data, error } = await client.POST("/auth/verify", {
    body: {
      token,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function verifyResetToken(token: string, new_password: string) {
  const { data, error } = await client.POST("/auth/reset-password/verify", {
    body: {
      token,
      new_password,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function resetPassword(email: string) {
  const { data, error } = await client.POST("/auth/reset-password", {
    body: {
      email,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export async function getPlayerProfile() {
  const { data, error } = await client.GET("/auth/me", {
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  if (error) {
    console.error(error);
  }

  return data;
}

export async function logout() {
  cookies().delete("access_token");
  cookies().delete("refresh_token");
}
