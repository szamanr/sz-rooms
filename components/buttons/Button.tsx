import React, { forwardRef } from "react";
import { twClass } from "@/utils/twClass";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "none" | "base" | "danger" | "negative";
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { children, className, disabled, onClick, variant = "base", ...rest },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={twClass(
          "flex items-center gap-2 px-1 py-1 w-fit",
          "text-left font-semibold",
          "rounded",
          {
            "bg-lime-500 text-white hover:bg-lime-600 px-2": variant === "base",
            "bg-red-500 text-white hover:bg-red-600 px-2": variant === "danger",
            "hover:text-lime-500": variant === "negative",
          },
          className,
        )}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
