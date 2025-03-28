import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type TextFieldProps = {
  label: string;
  containerClassname?: string;
  errorMessage?: string;
} & ComponentProps<"input">;

const TextField = ({
  label,
  containerClassname,
  className,
  errorMessage = "",
  required,
  ...props
}: TextFieldProps) => {
  return (
    <div className={twMerge("space-y-2", containerClassname)}>
      <p
        className={`${
          errorMessage
            ? "text-red-500"
            : "text-steel-blue dark:text-pale-lavender"
        } body-variant tracking-[-0.1px] flex items-center`}
      >
        {required ? <div className="heading-s text-red-500 mr-1">*</div> : null}
        {label}
      </p>
      <input
        {...props}
        className={twMerge(
          `${
            errorMessage
              ? "border-red-500"
              : "border-pale-lavender dark:border-midnight-slate focus:border-soft-purple hover:border-soft-purple"
          } w-full border bg-white text-rich-black dark:bg-slate-navy dark:text-white  dark-transition rounded-sm px-5 py-4 outline-hidden`,
          className
        )}
      />
      {errorMessage ? (
        <p className="text-red-500 body-variant tracking-[-0.1px]">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

export default TextField;
