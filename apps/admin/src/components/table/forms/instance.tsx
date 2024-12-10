import { z } from "zod";

const schema = z.object({
  container_id: z.string(),
  container_name: z.string(),
  port_mapping: z.array(z.string()),
  deployment_id: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;
