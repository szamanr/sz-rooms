import React from "react";
import Icon from "@/components/Icon";
import Link from "next/link";

type Props = {
  id?: number;
};

export const NavigateBack: React.FC<Props> = ({ id }) => {
  if (!id) return null;
  return (
    <div className="absolute left-8 h-screen flex items-center justify-center">
      <Link href={`/requests/${id}`}>
        <Icon
          className="rounded-full bg-gray-600 hover:bg-amber-600 text-white p-3"
          name="chevron_left"
          size="2xl"
        />
      </Link>
    </div>
  );
};

export const NavigateForward: React.FC<Props> = ({ id }) => {
  if (!id) return null;
  return (
    <div className="absolute right-8 h-screen flex items-center justify-center">
      <Link href={`/requests/${id}`}>
        <Icon
          className="rounded-full bg-gray-600 hover:bg-amber-600 text-white p-3"
          name="chevron_right"
          size="2xl"
        />
      </Link>
    </div>
  );
};
