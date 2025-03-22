"use client";
import React, { createContext, ReactNode, useState } from "react";

type DropdownContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

type DropdownRootProps = {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
};

const DropdownRoot = ({ children }: DropdownRootProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="relative">
      <DropdownContext.Provider value={{ open, setOpen, value, setValue }}>
        {children}
      </DropdownContext.Provider>
    </div>
  );
};

export default DropdownRoot;
