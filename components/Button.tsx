import React from "react";
import { twClass } from "@/utils/twClass";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({
  children,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={twClass(
        "flex items-center gap-2 px-2 py-1 w-fit",
        "text-left font-semibold",
        "bg-amber-500 text-white rounded hover:bg-amber-600",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
