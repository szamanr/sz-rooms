import React from "react";
import { twClass } from "@/utils/twClass";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <input
      className={twClass("px-2 py-1 rounded border border-gray-200", className)}
      {...rest}
    >
      {children}
    </input>
  );
};
