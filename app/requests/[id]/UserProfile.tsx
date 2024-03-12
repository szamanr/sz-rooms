import React from "react";
import { $t } from "@/utils/intl";
import { twClass } from "@/utils/twClass";

const Tag: React.FC<{ children?: React.ReactNode; highlight?: boolean }> = ({
  children,
  highlight,
}) => (
  <span
    className={twClass("px-1.5 py-1 rounded-full border border-slate-200", {
      "text-amber-500 border-amber-500": highlight,
    })}
  >
    {children}
  </span>
);

type Props = {};

export const UserProfile: React.FC<Props> = ({}) => {
  return (
    <div className="border rounded border-slate-300 border-2 p-2 w-full">
      <h3>{$t("Profile questions")}</h3>
      <div className="text-justify space-y-2">
        <p className="space-x-1">
          <span>🎪 hobbies:</span>
          <Tag highlight>{$t("football")}</Tag>
          <Tag highlight>{$t("music")}</Tag>
          <Tag>{$t("running")}</Tag>
        </p>
        <p>🤼 socialising: sometimes</p>
        <p>🏘️ favourite area: eixample</p>
        <p>📌 favourite place: ovella negra</p>
      </div>
    </div>
  );
};
