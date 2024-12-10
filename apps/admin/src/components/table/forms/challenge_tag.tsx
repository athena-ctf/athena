import { z } from "zod";

const createSchema = z.object({
  challenge_id: z.string().uuid(),
  tag_id: z.string().uuid(),
});

type CreateSchema = z.infer<typeof createSchema>;
