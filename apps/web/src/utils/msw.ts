import { createOpenApiHttp } from "openapi-msw";
import type { paths } from "@repo/api";
import { ctf } from "./ctf-data";

export const openapiHttp = createOpenApiHttp<paths>({
  baseUrl: `https://api.${ctf.domain}`,
});
