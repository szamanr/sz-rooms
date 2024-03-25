import React from "react";
import NextLink from "next/link";
import { twClass } from "@/utils/twClass";

type Props = React.ComponentProps<typeof NextLink> & {
  variant?: "base" | "negative" | "none";
};

export const Link: React.FC<Props> = ({
  className,
  variant = "negative",
  ...rest
}) => {
  return (
    <NextLink
      className={twClass(
        "flex items-center",
        {
          "text-lime-500 hover:text-lime-600": variant === "base",
          "text-black hover:text-lime-500": variant === "negative",
        },
        className,
      )}
      {...rest}
    />
  );
};
