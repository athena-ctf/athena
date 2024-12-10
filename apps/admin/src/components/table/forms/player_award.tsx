import { z } from "zod";

const createSchema = z.object({
  player_id: z.string().uuid(),
  award_id: z.string().uuid(),
  count: z.number(),
});

const updateSchema = z.object({
  count: z.number(),
});

type CreateSchema = z.infer<typeof createSchema>;
type UpdateSchema = z.infer<typeof updateSchema>;
