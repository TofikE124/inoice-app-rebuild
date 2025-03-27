import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type TextFieldProps = {
  label: string;
  containerClassname?: string;
} & ComponentProps<"input">;

const TextField = ({
  label,
  containerClassname,
  className,
  ...props
}: TextFieldProps) => {
  return (
    <div className={twMerge("space-y-2", containerClassname)}>
      <p className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
        {label}
      </p>
      <input
        {...props}
        className={twMerge(
          "w-full border bg-white text-rich-black dark:bg-slate-navy dark:text-white border-pale-lavender dark:border-midnight-slate focus:border-soft-purple hover:border-soft-purple dark-transition rounded-sm px-5 py-4 outline-hidden",
          className
        )}
      />
    </div>
  );
};

export default TextField;
