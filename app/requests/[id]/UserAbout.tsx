import React from "react";
import { $t } from "@/utils/intl";

type Props = {};

export const UserAbout: React.FC<Props> = ({}) => {
  return (
    <div className="border rounded border-slate-300 border-2 p-2 w-full">
      <h3>{$t("About me")}</h3>
      <div className="text-justify space-y-2">
        <p>
          voluptatem necessitatibus magni qui aliquam sequi enim aut nostrum
          reprehenderit vel aut commodi aperiam ut et quas nostrum id
          repudiandae quod rem error ratione repudiandae ut explicabo aperiam
          voluptatem neque.
        </p>
        <p>vel aut commodi aperiam ut et quas nostrum.</p>
      </div>
    </div>
  );
};
