import { z } from "zod";

export const jobFilterSchema = z.object({
  q: z.string().min(3),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValue = z.infer<typeof jobFilterSchema>;
