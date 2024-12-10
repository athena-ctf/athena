import { z } from "zod";

const schema = z.object({
  title: z.string(),
  content: z.string(),
  player_id: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;
