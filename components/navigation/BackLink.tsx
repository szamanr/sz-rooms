"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

type Props = Pick<React.ComponentProps<typeof Icon>, "size">;

export const BackLink: React.FC<Props> = ({ size }) => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <Icon name="chevron_left" size={size} />
    </button>
  );
};
