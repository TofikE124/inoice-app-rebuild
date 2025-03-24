import { Prisma } from "@prisma/client";

export type FullInvoice = Prisma.InvoiceGetPayload<{
  include: {
    billFrom: true;
    billTo: true;
    items: true;
  };
}>;
