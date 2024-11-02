// auth-store.ts
import createFetch, { type Middleware } from "openapi-fetch";
import type { paths } from "./openapi";

let accessToken: string | null = localStorage.getItem("access_token");
let refreshToken: string | null = localStorage.getItem("refresh_token");

const baseClient = createFetch<paths>({
  baseUrl: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  refreshToken = refresh;
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

const authMiddleware: Middleware = {
  async onResponse({ request, response, options }) {
    if (response.status === 401 && refreshToken && accessToken) {
      try {
        const response = await baseClient.POST("/auth/player/token/refresh", {
          body: { access_token: accessToken, refresh_token: refreshToken },
        });

        if (response.data) {
          setTokens(response.data.access_token, response.data.refresh_token);
          return await options.fetch(request, {
            headers: {
              ...request.headers,
              Authorization: `Bearer ${accessToken}`,
            },
          });
        }
      } catch (refreshError) {
        clearTokens();
        throw new Error("Token refresh failed");
      }
    }

    return response;
  },

  async onRequest({ request }) {
    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    request.headers.set("Authorization", `Bearer ${accessToken}`);
    return request;
  },
};

const authenticatedFetchClient = createFetch<paths>({
  baseUrl: "https://api.example.com",
});

authenticatedFetchClient.use(authMiddleware);

const login = async (username: string, password: string) => {
  const response = await baseClient.POST("/auth/player/login", {
    body: { username, password },
  });

  if (!response.data) {
    throw new Error("Login failed");
  }

  setTokens(response.data.access_token, response.data.refresh_token);
  return response.data;
};

const logout = () => {
  clearTokens();
};
