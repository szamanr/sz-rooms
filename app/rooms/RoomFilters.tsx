import React from "react";
import { For } from "@/components/controlFlow/For/For";
import { twClass } from "@/utils/twClass";
import { Filter } from "@/components/Filter";
import { $t } from "@/utils/intl";

type Props = {
  className?: string;
};

export const RoomFilters: React.FC<Props> = ({ className }) => {
  const filters = [
    {
      id: "type",
      name: "type",
      options: [
        { id: "room", label: $t("Room") },
        { id: "flat", label: $t("Flat") },
      ],
      value: [],
    },
  ];

  return (
    <div className={twClass("flex gap-2", className)}>
      <For each={filters}>
        {({ name, options, value }) => (
          <Filter name={name} options={options} value={value} />
        )}
      </For>
    </div>
  );
};
