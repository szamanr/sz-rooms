import React from "react";
import { twClass } from "@/utils/twClass";
import { Link } from "@/components/navigation/Link";
import { Url } from "next/dist/shared/lib/router/router";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  // do not pass onClick to links!
  onClick?: never;
  href: Url;
};

export const ButtonLink: React.FC<Props> = ({
  children,
  className,
  href,
  ...rest
}) => {
  return (
    <Link
      className={twClass(
        "flex items-center gap-2 px-2 py-1 w-fit",
        "text-left font-semibold",
        "bg-lime-500 text-white rounded hover:bg-lime-600",
        className,
      )}
      href={href}
      {...rest}
    >
      {children}
    </Link>
  );
};
