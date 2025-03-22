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
        open ? "translate-0 opacity-100" : " translate-y-[-25px] opacity-0"
      } transition-all duration-300 absolute top-full left-0 mt-6 select-none bg-white dark:bg-midnight-slate rounded-lg w-[240px] md:w-[300px] shadow-[0px_10px_20px_0px] shadow-[#48549f40] dark:shadow-[#00000040]`}
    >
      {children}
    </div>
  );
};

export default DropdownContent;
