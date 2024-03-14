import React from "react";
import Icon from "@/components/Icon";
import { Link } from "@/components/navigation/Link";

type Props = {
  href?: string;
  icon?: React.ComponentProps<typeof Icon>["name"];
};

export const NavigateBack: React.FC<Props> = ({ href }) => {
  if (!href) return null;
  return (
    <div className="absolute left-8 top-0 h-screen flex items-center justify-center">
      <Link href={href}>
        <Icon
          className="rounded-full bg-gray-500 hover:bg-lime-500 text-white p-3 z-higher"
          name="chevron_left"
          size="2xl"
        />
      </Link>
    </div>
  );
};

export const NavigateForward: React.FC<Props> = ({ href, icon }) => {
  if (!href) return null;
  return (
    <div className="absolute right-8 top-0 h-screen flex items-center justify-center">
      <Link href={href}>
        <Icon
          className="rounded-full bg-gray-500 hover:bg-lime-500 text-white p-3 z-higher"
          name={icon ?? "chevron_right"}
          size="2xl"
        />
      </Link>
    </div>
  );
};
