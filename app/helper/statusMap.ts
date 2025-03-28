import { Status } from "@prisma/client";

export const statusMap: Record<Status, { label: string }> = {
  PENDING: { label: "Pending" },
  DRAFT: { label: "Draft" },
  PAID: { label: "Paid" },
};
