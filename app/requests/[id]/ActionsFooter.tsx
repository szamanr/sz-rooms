// "use client";
import { Button } from "@/components/buttons/Button";
import Icon from "@/components/Icon";
import { $t } from "@/utils/intl";
import React from "react";

export const ActionsFooter = () => {
  return (
    <footer className="h-14 sticky bottom-0 left-0 w-screen p-3 flex justify-center gap-4 sm:gap-24 bg-gray-300">
      <Button className="rounded-full px-6" variant="danger">
        <Icon name="thumb_down" size="xl" />
        <span>{$t("nope")}</span>
      </Button>
      <Button
        className="rounded-full px-6 bg-gray-300 hover:bg-gray-400 border border-gray-100 hover:border-gray-400"
        variant="none"
      >
        <Icon name="bookmark" size="xl" />
        <span>{$t("save")}</span>
      </Button>
      <Button className="rounded-full px-6">
        <Icon name="thumb_up" size="xl" />
        <span>{$t("yup")}</span>
      </Button>
    </footer>
  );
};
