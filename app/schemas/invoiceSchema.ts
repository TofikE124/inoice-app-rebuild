import { PaymentTerms } from "@prisma/client";
import { z } from "zod";
import { itemSchema } from "./itemSchema";

const statusEnum = Object.values(PaymentTerms) as [string, ...string[]];

export const invoiceSchema = z.object({
  streetAdressFrom: z.string().min(0).max(100),
  cityFrom: z.string().min(0).max(100),
  postCodeFrom: z.string().min(0).max(100),
  countryFrom: z.string().min(0).max(100),

  clientNameTo: z.string().min(0).max(100),
  clientEmailTo: z.string().min(0).max(100).email(),
  streetAdressTo: z.string().min(0).max(100),
  cityTo: z.string().min(0).max(100),
  postCodeTo: z.string().min(0).max(100),
  countryTo: z.string().min(0).max(100),

  date: z.string().datetime({ precision: 3 }),
  paymentTerms: z.enum(statusEnum),
  projectDescription: z.string().min(0).max(255),
  items: z.array(itemSchema),
});
