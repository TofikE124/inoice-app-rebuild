import React from "react";
import { useDropdown } from "./useDropdown";

type DropdownLabelProps = {
  children: string;
};

const DropdownLabel = ({ children }: DropdownLabelProps) => {
  const { errorMessage, required } = useDropdown();

  return (
    <p
      className={`${
        errorMessage
          ? "text-red-500"
          : "text-steel-blue dark:text-pale-lavender"
      } body-variant tracking-[-0.1px] mb-2`}
    >
      {required ? <span className="text-red-500">*</span> : null}
      {children}
    </p>
  );
};

export default DropdownLabel;
