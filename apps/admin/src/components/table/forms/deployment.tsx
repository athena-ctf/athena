import { z } from "zod";

const schema = z.object({
  expires_at: z.string().datetime(),
  challenge_id: z.string().uuid(),
  player_id: z.string().uuid().optional(),
});

type Schema = z.infer<typeof schema>;
