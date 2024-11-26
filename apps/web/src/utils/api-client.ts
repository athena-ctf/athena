import { useAuthStore } from "@/stores/auth";
import { type paths, createFetchClient, type Middleware } from "@repo/api";

const middleware: Middleware = {
  onRequest: ({ request }) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) request.headers.set("Authorization", `Bearer ${accessToken}`);
  },

  onResponse: async ({ request, response, options: { fetch } }) => {
    const { accessToken, setTokens } = useAuthStore.getState();

    if (response.status === 401 && accessToken) {
      const resp = await fetch("/auth/player/token/refresh");

      if (resp.ok) {
        const accessToken = (await resp.json()).access_token;
        if (accessToken) {
          setTokens(accessToken);
          request.headers.set("Authorization", `Bearer ${accessToken}`);
          return await fetch(request);
        }
      }
    } else return response;
  },
};

export const apiClient = createFetchClient<paths>({
  baseUrl: "",
});

apiClient.use(middleware);
