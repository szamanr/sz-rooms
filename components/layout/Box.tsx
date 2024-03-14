import React from "react";
import { twClass } from "@/utils/twClass";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const Box: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={twClass("rounded-md bg-stone-100 p-2.5 w-full", className)}>
      {children}
    </div>
  );
};
