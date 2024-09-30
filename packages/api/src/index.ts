import { configSchema } from "@repo/config/schema";
import { readFileSync } from "fs";
import createClient from "openapi-fetch";
import * as toml from "smol-toml";

import type { paths } from "./openapi.d";

const config = configSchema.parse(
  toml.parse(readFileSync("/data/config.toml", { encoding: "utf-8" })),
);

export const client = createClient<paths>({
  baseUrl: `${config.services.api_server_host}:${config.services.api_server_port}`,
});

export * from "./openapi.d";
