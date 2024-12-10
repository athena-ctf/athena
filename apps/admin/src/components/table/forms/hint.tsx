import { z } from "zod";

const schema = z.object({
  description: z.string(),
  cost: z.number(),
  challenge_id: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;
