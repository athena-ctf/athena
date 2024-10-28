import createFetchClient from "openapi-fetch";
import createQueryClient from "openapi-react-query";

import type { paths } from "./openapi.d";

export const fetchClient = createFetchClient<paths>({
  baseUrl: "http://localhost:3000",
});

export const apiQueryClient = createQueryClient(fetchClient);

export * from "./openapi.d";
