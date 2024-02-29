import React from "react";
import { twClass } from "@/utils/twClass";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "base" | "danger" | "negative";
};

export const Button: React.FC<Props> = ({
  children,
  className,
  disabled,
  onClick,
  variant = "base",
  ...rest
}) => {
  return (
    <button
      className={twClass(
        "flex items-center gap-2 px-2 py-1 w-fit",
        "text-left font-semibold",
        "rounded",
        {
          "bg-amber-500 text-white hover:bg-amber-600": variant === "base",
          "bg-red-500 text-white hover:bg-red-600": variant === "danger",
          "hover:text-amber-500": variant === "negative",
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
};
