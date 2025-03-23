import Image from "next/image";
import React from "react";
import { useDropdown } from "./useDropdown";
import CheveronIcon from "/assets/chevron.svg";

type DropdownTriggerProps = {
  placeholder: string;
};

const DropdownTrigger = ({ placeholder }: DropdownTriggerProps) => {
  const { setOpen, open, value } = useDropdown();

  return (
    <div
      onClick={() => {
        setOpen(!open);
      }}
      className="px-5 py-4 select-none dark-transition w-[240px] md:w-[300px] rounded-sm border border-pale-lavender hover:border-deep-purple bg-white dark:bg-slate-navy dark:border-midnight-slate cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <p className="text-rich-black dark:text-white heading-s-variant">
          {value || placeholder}
        </p>
        <div
          className={`${
            open ? "rotate-180" : "rotate-0"
          } transition-transform duration-200 `}
        >
          <Image src={CheveronIcon} alt="Chevron" width={8.4} height={4.2} />
        </div>
      </div>
    </div>
  );
};

export default DropdownTrigger;
