"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { Button } from "@/components/buttons/Button";

type Props = Pick<React.ComponentProps<typeof Icon>, "size">;

export const BackLink: React.FC<Props> = ({ size }) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant="negative">
      <Icon name="chevron_left" size={size} />
    </Button>
  );
};
