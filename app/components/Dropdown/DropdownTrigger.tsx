import Image from "next/image";
import React from "react";
import { useDropdown } from "./useDropdown";
import CheveronIcon from "../../../public/assets/chevron.svg";
import { twMerge } from "tailwind-merge";

type DropdownTriggerProps = {
  placeholder: string;
  disabled?: boolean;
  className?: string;
};

const DropdownTrigger = ({
  placeholder,
  disabled = false,
  className,
}: DropdownTriggerProps) => {
  const { setOpen, open, value } = useDropdown();

  return (
    <button
      onClick={() => {
        setOpen(!open);
      }}
      disabled={disabled}
      className={twMerge(
        "px-5 py-4 select-none dark-transition w-full rounded-sm border border-pale-lavender hover:border-deep-purple bg-white dark:bg-slate-navy dark:border-midnight-slate cursor-pointer",
        className
      )}
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
    </button>
  );
};

export default DropdownTrigger;
