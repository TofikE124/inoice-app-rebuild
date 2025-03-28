import { PaymentTerms, Status } from "@prisma/client";
import { z } from "zod";
import { itemSchema } from "./itemSchema";

const paymentTermsEnum = Object.values(PaymentTerms) as [string, ...string[]];
const statusEnum = Object.values(Status) as [string, ...string[]];

const requiredMessage = "This Field Is Required";

export const invoiceSchema = z.object({
  streetAdressFrom: z.string().min(1, requiredMessage).max(100),
  cityFrom: z.string().min(1, requiredMessage).max(100),
  postCodeFrom: z.string().min(1, requiredMessage).max(100),
  countryFrom: z.string().min(1, requiredMessage).max(100),

  clientNameTo: z.string().min(1, requiredMessage).max(100),
  clientEmailTo: z.string().min(1, requiredMessage).max(100).email(),
  streetAdressTo: z.string().min(1, requiredMessage).max(100),
  cityTo: z.string().min(1, requiredMessage).max(100),
  postCodeTo: z.string().min(1, requiredMessage).max(100),
  countryTo: z.string().min(1, requiredMessage).max(100),

  date: z.string().datetime({ precision: 3 }),
  paymentTerms: z
    .enum(paymentTermsEnum, {
      required_error: requiredMessage,
    })
    .nullable()
    .refine((val) => val !== null, {
      message: requiredMessage,
    }),
  projectDescription: z.string().min(1, requiredMessage).max(255),
  items: z.array(itemSchema),
  status: z.enum(statusEnum, { required_error: requiredMessage }).optional(),
});
