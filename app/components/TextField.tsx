import React, { ComponentProps } from "react";

type TextFieldProps = {
  label: string;
} & ComponentProps<"input">;

const TextField = ({ label, ...props }: TextFieldProps) => {
  return (
    <div className="max-w-[240px] flex flex-col gap-2">
      <p className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
        {label}
      </p>
      <input
        {...props}
        className="border bg-white text-rich-black dark:bg-slate-navy dark:text-white border-pale-lavender dark:border-midnight-slate focus:border-soft-purple hover:border-soft-purple rounded-sm px-5 py-4 outline-hidden"
      />
    </div>
  );
};

export default TextField;
