import { client } from "@repo/api";
import { getConfig } from "@repo/config";
import * as jose from "jose";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(
      new URL(`/auth/login?next=${req.nextUrl.pathname}`, req.url),
    );
  }

  try {
    await jose.jwtVerify(
      accessToken,
      new TextEncoder().encode(atob((await getConfig()).jwt.secret)),
    );
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
  matcher: ["/challenges", "/profile", "/scoreboard", "/teams"],
};
