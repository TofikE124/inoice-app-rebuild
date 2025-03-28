"use client";
import useClickOutside from "@/app/hooks/useClickOutside";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type DropdownContextType = {
  errorMessage?: string;
  required?: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

type Size = "lg" | "md" | "sm";

type DropdownRootProps = {
  errorMessage?: string;
  required?: boolean;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  children?: ReactNode;
  size?: Size;
};

const DropdownRoot = ({
  errorMessage,
  required,
  defaultValue,
  onValueChange = () => {},
  size,
  children,
}: DropdownRootProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(defaultValue || null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [firstTime, setFirstTime] = useState(true);

  const sizesMap: Record<Size, string> = {
    lg: "w-[240px] md:w-[300px]",
    md: "w-[200px] md:w-[240px]",
    sm: "w-[100px] md:w-[150px] lg:w-[200px]",
  };

  useClickOutside(rootRef, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
      return;
    }
    onValueChange(value);
  }, [value]);

  return (
    <div ref={rootRef} className={`relative ${size ? sizesMap[size] : ""}`}>
      <DropdownContext.Provider
        value={{ errorMessage, required, open, setOpen, value, setValue }}
      >
        {children}
      </DropdownContext.Provider>
    </div>
  );
};

export default DropdownRoot;
