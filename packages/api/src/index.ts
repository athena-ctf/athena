import { configSchema } from "@repo/config/schema";
import { readFileSync } from "fs";
import createFetchClient from "openapi-fetch";
import createQueryClient from "openapi-react-query";

import * as toml from "smol-toml";

import type { paths } from "./openapi.d";

const config = configSchema.parse(
    toml.parse(readFileSync("/data/config.toml", { encoding: "utf-8" }))
);

export const fetchClient = createFetchClient<paths>({
    baseUrl: `${config.services.api_server_host}:${config.services.api_server_port}`,
});

export const apiQueryClient = createQueryClient(fetchClient);

export * from "./openapi.d";
