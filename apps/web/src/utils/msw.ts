import type { paths } from "@repo/api";
import { createOpenApiHttp } from "openapi-msw";
import { ctf } from "./ctf-data";

export const openapiHttp = createOpenApiHttp<paths>({
  baseUrl: `https://api.${ctf.domain}`,
});
