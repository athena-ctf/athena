import { client } from "@repo/api";
import { getConfig } from "@repo/config";
import * as jose from "jose";
import { type NextRequest, NextResponse } from "next/server";

interface TokenPayload {
  user_id: string;
  role: number;
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(
      new URL(`/auth/login?next=${req.nextUrl.pathname}`, req.url),
    );
  }

  try {
    const claims = await jose.jwtVerify<TokenPayload>(
      accessToken,
      new TextEncoder().encode(atob((await getConfig()).jwt.secret)),
    );

    if (claims.payload.role === 0) {
      return NextResponse.redirect(
        new URL("/auth/login?error=forbidden", req.url),
      );
    }
  } catch {
    const { data, error } = await client.POST("/auth/token/refresh", {
      body: {
        access_token: "",
        refresh_token: refreshToken,
      },
    });

    if (error) {
      return NextResponse.redirect(
        new URL(`/auth/login?next=${req.nextUrl.pathname}`, req.url),
      );
    }

    const response = NextResponse.next();

    response.cookies.set("access_token", data.access_token);
    response.cookies.set("refresh_token", data.refresh_token);

    return response;
  }
}

export const config = {
  matcher: [
    "/table",
    "/table/achievement",
    "/table/ban",
    "/table/challenge",
    "/table/file",
    "/table/flag",
    "/table/hint",
    "/table/instance",
    "/table/invite",
    "/table/notification",
    "/table/player",
    "/table/submissions",
    "/table/tag",
    "/table/team",
    "/table/user",
  ],
};
