"use client";
import React, { useState } from "react";
import { Button } from "@/components/buttons/Button";
import { $t } from "@/utils/intl";
import { isUndefined } from "lodash";

type Props = React.ComponentProps<typeof Button> & {
  messages?: {
    no?: React.ReactNode;
    prompt?: React.ReactNode;
    yes?: React.ReactNode;
  };
};

export const ConfirmButton: React.FC<Props> = ({
  className,
  formAction,
  messages,
  onClick,
  ...rest
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return showConfirm ? (
    <div className="flex items-center gap-2">
      <span>
        {isUndefined(messages?.prompt) ? $t("Are you sure?") : messages?.prompt}
      </span>
      <Button className={className} formAction={formAction} onClick={onClick}>
        {messages?.yes ?? $t("Yes")}
      </Button>
      <Button
        className={className}
        onClick={() => setShowConfirm(false)}
        variant="negative"
      >
        {messages?.no ?? $t("No")}
      </Button>
    </div>
  ) : (
    <Button
      className={className}
      onClick={() => setShowConfirm(true)}
      {...rest}
    />
  );
};
