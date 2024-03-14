import React from "react";
import { $t } from "@/utils/intl";
import { twClass } from "@/utils/twClass";
import { Box } from "@/components/layout/Box";

const Tag: React.FC<{ children?: React.ReactNode; highlight?: boolean }> = ({
  children,
  highlight,
}) => (
  <span
    className={twClass("px-2 py-1 rounded-full border border-slate-500", {
      "text-amber-500 border-amber-500": highlight,
    })}
  >
    {children}
  </span>
);

type Props = {};

export const UserProfile: React.FC<Props> = ({}) => {
  return (
    <Box>
      <h3>{$t("Profile questions")}</h3>
      <div className="text-justify space-y-2">
        <p className="space-x-1">
          <span>🎪 hobbies:</span>
          <Tag highlight>{$t("football")}</Tag>
          <Tag highlight>{$t("music")}</Tag>
          <Tag>{$t("running")}</Tag>
        </p>
        <p>🤼 socialising: sometimes</p>
        <p>🏘️ favourite area: Vegueta</p>
        <p>📌 favourite place: Friki Bar</p>
      </div>
    </Box>
  );
};
