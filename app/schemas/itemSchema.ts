import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(0).max(100),
  quantity: z.number(),
  price: z.number(),
});
