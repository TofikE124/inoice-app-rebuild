import { ReactNode } from "react";
import { useDropdown } from "./useDropdown";

type DropdownContentProps = {
  children: ReactNode;
};

const DropdownContent = ({ children }: DropdownContentProps) => {
  const { open } = useDropdown();

  return (
    <div
      className={`${
        open
          ? "translate-0 opacity-100 visible"
          : "translate-y-[-15px] md:translate-y-[-20px] lg:translate-y-[-25px] opacity-0 invisible"
      } transition-all duration-300 absolute w-full top-full left-0 mt-2 md:mt-4 lg:mt-6 select-none bg-white dark:bg-midnight-slate rounded-lg shadow-primary`}
    >
      {children}
    </div>
  );
};

export default DropdownContent;
