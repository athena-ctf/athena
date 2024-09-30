import { z } from "zod";

const ctfSchema = z.object({
  name: z.string(),
  duration: z.number(),
  start_time: z.string().datetime(),
  freeze_duration: z.number(),
});

const databaseSchema = z.object({
  host: z.string(),
  port: z.number(),
  username: z.string(),
  password: z.string(),
});

const awsSchema = z.object({
  region: z.string().default("ap-south-1"),
  access_key_id: z.string(),
  secret_access_key: z.string(),
  s3_bucket: z.string(),
});

const jwtSchema = z.object({
  secret: z.string(),
  access_token_timeout: z.number(),
  refresh_token_timeout: z.number(),
});

const staticFileSchema = z.object({
  compress: z.boolean(),
  path: z.string(),
});

const smtpSchema = z.object({
  from: z.string(),
  reply_to: z.string(),
  username: z.string(),
  password: z.string(),
  smtp_server_url: z.string(),
  timeout: z.number(),
});

const instanceSchema = z.object({
  duration: z.number(),
});

const servicesSchema = z.object({
  api_server_port: z.number(),
  grpc_server_port: z.number(),
  api_server_host: z.string(),
  grpc_server_host: z.string(),
});

export const configSchema = z.object({
  ctf: ctfSchema,
  database: databaseSchema,
  services: servicesSchema,
  aws: awsSchema.optional(),
  jwt: jwtSchema,
  static_file: staticFileSchema.optional(),
  smtp: smtpSchema,
  instance: instanceSchema,
});

export type CtfConfig = z.infer<typeof configSchema>;
