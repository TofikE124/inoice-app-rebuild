import React from "react";

type DropdownLabelProps = {
  children: string;
};

const DropdownLabel = ({ children }: DropdownLabelProps) => {
  return (
    <p className="text-steel-blue dark:text-pale-lavender body-variant tracking-[-0.1px] mb-2">
      {children}
    </p>
  );
};

export default DropdownLabel;
