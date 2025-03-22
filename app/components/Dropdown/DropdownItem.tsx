import React from "react";
import { useDropdown } from "./useDropdown";

type DropdownItemProps = {
  value: string | null;
  children: string;
};

const DropdownItem = ({ children, value }: DropdownItemProps) => {
  const { setValue, setOpen } = useDropdown();

  const handleClick = () => {
    setValue(value);
    setOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      className="text-rich-black heading-s-variant pl-6 cursor-pointer pt-4 pb-4 not-last:border-b border-b-pale-lavender dark:border-b-slate-navy dark:text-white hover:text-deep-purple dark:hover:text-soft-purple"
    >
      {children}
    </div>
  );
};

export default DropdownItem;
