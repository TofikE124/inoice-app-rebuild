"use client";
import { Dropdown } from "./components/Dropdown";

interface FilterByStatusProps {
  disabled?: boolean;
}

const FilterByStatus = ({ disabled = false }: FilterByStatusProps) => {
  return (
    <Dropdown.Root size="sm">
      <Dropdown.Trigger
        className="hidden md:block"
        placeholder="Filter by status"
        disabled={disabled}
      />
      <Dropdown.Trigger className="md:hidden" placeholder="Filter" />
      <Dropdown.Content>
        <Dropdown.Item value="1">1</Dropdown.Item>
        <Dropdown.Item value="2">2</Dropdown.Item>
        <Dropdown.Item value="3">3</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default FilterByStatus;
