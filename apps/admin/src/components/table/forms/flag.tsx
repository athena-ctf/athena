import { z } from "zod";

const schema = z.object({
  value: z.string(),
  challenge_id: z.string().uuid(),
  player_id: z.string().uuid().optional(),
  ignore_case: z.boolean(),
});

type Schema = z.infer<typeof schema>;
