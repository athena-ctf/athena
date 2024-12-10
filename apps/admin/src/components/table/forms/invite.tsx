import { z } from "zod";

const schema = z.object({
  remaining: z.number(),
  expires_at: z.string().datetime(),
  team_id: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;
