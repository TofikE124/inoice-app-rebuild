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
  const { setOpen, open, value, errorMessage } = useDropdown();

  return (
    <div className="space-y-2">
      <button
        onClick={() => {
          setOpen(!open);
        }}
        disabled={disabled}
        className={twMerge(
          `${
            errorMessage
              ? "border-red-500"
              : "border-pale-lavender hover:border-deep-purple dark:border-midnight-slate"
          } px-5 py-4 select-none dark-transition w-full rounded-sm border bg-white dark:bg-slate-navy cursor-pointer`,
          className
        )}
        type="button"
      >
        <div className="flex justify-between items-center">
          <p
            className={`${
              errorMessage ? "text-red-500" : "text-rich-black dark:text-white"
            } heading-s-variant`}
          >
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
      {errorMessage ? (
        <p className="body-variant text-red-500">{errorMessage}</p>
      ) : null}
    </div>
  );
};

export default DropdownTrigger;
