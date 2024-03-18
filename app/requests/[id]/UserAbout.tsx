import React from "react";
import { $t } from "@/utils/intl";
import { Box } from "@/components/layout/Box";
import { Database } from "@/api/schema.types";
import { Derive } from "@shoooe/derive";
import { Show } from "@/components/controlFlow/Show/Show";
import parse from "html-react-parser";

type User = Derive<
  Database["public"]["Tables"]["user"]["Row"],
  {
    about: true;
  }
>;

type Props = {
  user: User;
};

export const UserAbout: React.FC<Props> = ({ user }) => {
  const { about } = user;

  const fallback = <p className="text-gray-500">{$t("No description")}</p>;

  return (
    <Box>
      <h3>{$t("About me")}</h3>
      <div className="text-justify space-y-2">
        <Show when={about} fallback={fallback}>
          {(about) => <p>{parse(about)}</p>}
        </Show>
      </div>
    </Box>
  );
};
