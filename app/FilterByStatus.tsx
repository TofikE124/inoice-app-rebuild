"use client";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Dropdown } from "./components/Dropdown";
import { getFilterByStatus } from "./helper/getFilterByStatus";

interface FilterByStatusProps {
  disabled?: boolean;
}

const FilterByStatus = ({ disabled = false }: FilterByStatusProps) => {
  const statusArr = Object.values(Status);
  const statusMap: Record<Status, { label: string }> = {
    PENDING: { label: "Pending" },
    DRAFT: { label: "Draft" },
    PAID: { label: "Paid" },
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterByStatus = getFilterByStatus(searchParams.get("filterByStatus"));
  const handleValueChange = (status: Status | null) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    if (status) urlSearchParams.set("filterByStatus", status);
    else urlSearchParams.delete("filterByStatus");

    router.push(`/?${urlSearchParams.toString()}`);
  };

  return (
    <Dropdown.Root
      onValueChange={(value: any) => handleValueChange(value)}
      defaultValue={filterByStatus}
      size="sm"
    >
      <Dropdown.Trigger
        className="hidden md:block"
        placeholder="Filter by status"
        disabled={disabled}
      />
      <Dropdown.Trigger className="md:hidden" placeholder="Filter" />
      <Dropdown.Content>
        <Dropdown.Item value={null}>All</Dropdown.Item>
        {statusArr.map((status) => (
          <Dropdown.Item key={status} value={status}>
            {statusMap[status].label}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default FilterByStatus;
