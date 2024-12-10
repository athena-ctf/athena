import { z } from "zod";

const schema = z.object({
  role: z.enum(["analyst", "editor", "judge", "manager", "moderator"]),
  username: z.string(),
});

type Schema = z.infer<typeof schema>;
