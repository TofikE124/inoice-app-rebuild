"use client";
import React, { createContext, ReactNode, useState } from "react";

type DropdownContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

type Size = "lg" | "md" | "sm";

type DropdownRootProps = {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
  size?: Size;
};

const DropdownRoot = ({ size = "lg", children }: DropdownRootProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const sizesMap: Record<Size, string> = {
    lg: "w-[240px] md:w-[300px]",
    md: "w-[200px] md:w-[240px]",
    sm: "w-[100px] md:w-[150px] lg:w-[200px]",
  };

  return (
    <div className={`relative ${sizesMap[size]}`}>
      <DropdownContext.Provider value={{ open, setOpen, value, setValue }}>
        {children}
      </DropdownContext.Provider>
    </div>
  );
};

export default DropdownRoot;
