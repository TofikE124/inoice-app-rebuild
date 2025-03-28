import { z } from "zod";

const requiredMessage = "This Field Is Required";

export const itemSchema = z.object({
  name: z.string().min(1, { message: requiredMessage }).max(100),
  quantity: z.number().gt(0, { message: "Quantity can't be 0" }),
  price: z.number().gt(0, { message: "Price can't be 0" }),
});
