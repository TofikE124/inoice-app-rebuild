import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  [
    "px-6",
    "py-4",
    "rounded-3xl",
    "transition-all",
    "duration-200",
    "heading-s",
    "cursor-pointer",
    "disabled:cursor-not-allowed",
    "disabled:opacity-60",
  ],
  {
    variants: {
      variant: {},
      color: {
        primary: [
          "bg-frost-white",
          "text-steel-blue",
          "hover:bg-pale-lavender",
          "dark:bg-midnight-slate",
          "dark:text-pale-lavender",
          "dark:hover:bg-white",
        ],
        secondary: [
          "bg-charcoal-slate",
          "text-cool-gray",
          "hover:bg-rich-black",
          "dark:text-pale-lavender",
          "dark:hover:bg-slate-navy",
        ],
        deepPurple: ["bg-deep-purple", "text-white", "hover:bg-soft-purple"],
        red: ["bg-vibrant-red", "text-white", "hover:bg-soft-red"],
        forstWhite: [
          "bg-frost-white",
          "text-steel-blue",
          "hover:bg-pale-lavender",
        ],
      },
    },
  }
);

export type ButtonProps = VariantProps<typeof buttonStyles> &
  ComponentProps<"button">;

const Button = ({ variant, color, className, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge(buttonStyles({ variant, color }), className)}
      {...props}
    ></button>
  );
};

export default Button;
