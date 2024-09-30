"use server";

import { readFileSync } from "fs";
import * as toml from "smol-toml";

import { configSchema } from "./schema";

const athenaConfig = configSchema.parse(
  toml.parse(readFileSync("/data/config.toml", { encoding: "utf-8" })),
);

export async function getConfig() {
  return athenaConfig;
}
