import React from "react";
import { twClass } from "@/utils/twClass";
import { Show } from "@/components/controlFlow/Show/Show";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
};

export const Input: React.FC<Props> = ({
  children,
  className,
  id,
  label,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <Show when={label}>
        <label htmlFor={id}>{label}</label>
      </Show>
      <input
        className={twClass(
          "px-2 py-1 rounded border border-gray-200",
          className,
        )}
        id={id}
        {...rest}
      >
        {children}
      </input>
    </div>
  );
};
