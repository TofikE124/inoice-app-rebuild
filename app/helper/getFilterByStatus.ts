import { Status } from "@prisma/client";

export const getFilterByStatus = (status: string | null) => {
  return Object.values(Status).includes(status as Status) ? status : null;
};
