import createFetchClient from "openapi-fetch";

import type { paths } from "./openapi.d";

export const fetchClient = createFetchClient<paths>({
  baseUrl: "http://localhost:3000",
});

export * from "./openapi.d";
