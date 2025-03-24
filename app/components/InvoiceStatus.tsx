import { Status } from "@prisma/client";
import React from "react";

type StatusProps = {
  label: string;
  color: string;
};

const statusMap: Record<Status, StatusProps> = {
  PAID: {
    label: "Paid",
    color: "#33D69F",
  },
  PENDING: {
    label: "Pending",
    color: "#FF8F00",
  },
  DRAFT: {
    label: "Draft",
    color: "#373B53",
  },
};

type InvoiceStatusProps = {
  status: Status;
};

const InvoiceStatus = ({ status }: InvoiceStatusProps) => {
  const { label, color } = statusMap[status];

  return (
    <div className="relative py-4 px-[30px] rounded-md w-fit overflow-hidden">
      <div
        className="absolute inset-0 opacity-[6%]"
        style={{ backgroundColor: color }}
      ></div>
      <div className="flex items-center gap-2">
        <div
          className="size-2 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <h3 className="heading-s-variant" style={{ color: color }}>
          {label}
        </h3>
      </div>
    </div>
  );
};

export default InvoiceStatus;
