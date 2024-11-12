import { z } from "zod";

export const achievementSchema = z.object({
  challenge_id: z.string().uuid(),
  player_id: z.string().uuid().optional().optional(),
  team_id: z.string().uuid().optional().optional(),
  value: z.string(),
});

export const banSchema = z.object({
  duration: z.coerce.number(),
  reason: z.string(),
});

export const challengeSchema = z.object({
  author_name: z.string(),
  description: z.string(),
  difficulty: z.union([
    z.literal("easy"),
    z.literal("extreme"),
    z.literal("hard"),
    z.literal("medium"),
  ]),
  max_points: z.number(),
  min_points: z.number(),
  status: z.union([z.literal("active"), z.literal("maintenance"), z.literal("scheduled")]),
  flag_type: z.union([z.literal("static"), z.literal("regex"), z.literal("peruser")]),
  title: z.string(),
  tags: z.array(z.string()),
  container_build_context: z.custom<File>((file) => file instanceof File, {
    message: "File is required",
  }),
});

export const fileUploadSchema = z.object({
  backend: z.union([z.literal("s3bucket"), z.literal("server")]),
  challenge_id: z.string().uuid(),
  file: z.custom<File>((file) => file instanceof File, {
    message: "File is required",
  }),
});

export const flagSchema = z.object({
  challenge_id: z.string().uuid(),
  player_id: z.string().uuid().optional().optional(),
  value: z.string(),
});

export const hintSchema = z.object({
  challenge_id: z.string().uuid(),
  cost: z.coerce.number(),
  description: z.string(),
});

export const instanceSchema = z.object({
  challenge_id: z.string().uuid(),
  player_id: z.string().uuid(),
});

export const inviteSchema = z.object({
  remaining: z.coerce.number(),
  team_id: z.string().uuid(),
  usages: z.coerce.number(),
});

export const notificationSchema = z.object({
  content: z.string(),
  player_id: z.string().uuid(),
  title: z.string(),
});

export const playerSchema = z.object({
  ban_id: z.string().uuid().optional(),
  display_name: z.string(),
  team_id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  verified: z.boolean(),
});

export const submissionSchema = z.object({
  challenge_id: z.string().uuid(),
  flag: z.string(),
  player_id: z.string().uuid(),
  result: z.union([z.literal("fail"), z.literal("pass")]),
});

export const tagSchema = z.object({
  value: z.string(),
});

export const teamSchema = z.object({
  email: z.string(),
  name: z.string(),
});

export const userSchema = z.object({
  email: z.string(),
  password: z.string(),
  role: z.union([z.literal("player"), z.literal("manager")]),
  username: z.string(),
});

export interface DialogProps<T> {
  values?: T;
  action: "Create" | "Update";
  closeDialog: () => void;
}
