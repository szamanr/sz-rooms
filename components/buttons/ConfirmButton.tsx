"use client";
import React, { useState } from "react";
import { Button } from "@/components/buttons/Button";
import { $t } from "@/utils/intl";

type Props = React.ComponentProps<typeof Button> & {
  message?: React.ReactNode;
};

export const ConfirmButton: React.FC<Props> = ({
  formAction,
  message,
  onClick,
  ...rest
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return showConfirm ? (
    <div className="flex items-center gap-2">
      <span>{message ?? $t("Are you sure?")}</span>
      <Button formAction={formAction} onClick={onClick}>
        {$t("Yes")}
      </Button>
      <Button onClick={() => setShowConfirm(false)} variant="negative">
        {$t("No")}
      </Button>
    </div>
  ) : (
    <Button onClick={() => setShowConfirm(true)} {...rest} />
  );
};
