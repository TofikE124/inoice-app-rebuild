import React from "react";
import { useDropdown } from "./useDropdown";

type DropdownItemProps = {
  value: string | null;
  children: string;
};

const DropdownItem = ({ children, value }: DropdownItemProps) => {
  const { setValue, setOpen, value: selectedValue } = useDropdown();

  const handleClick = () => {
    setValue(value);
    setOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        selectedValue == value
          ? "text-deep-purple dark:text-soft-purple"
          : "text-rich-black dark:text-white hover:text-deep-purple dark:hover:text-soft-purple"
      }  heading-s-variant pl-6 cursor-pointer pt-4 pb-4 not-last:border-b border-b-pale-lavender dark:border-b-slate-navy`}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
