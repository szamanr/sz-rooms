"use client";
import React, { Fragment, useState } from "react";
import { Listbox } from "@headlessui/react";
import { For } from "@/components/controlFlow/For/For";
import { twClass } from "@/utils/twClass";
import { useQueryState } from "nuqs";
import { $t } from "@/utils/intl";
import { Show } from "@/components/controlFlow/Show/Show";
import Icon from "@/components/Icon";

type FilterOption = { id: string; label: string };
type Props = {
  name: string;
  value: FilterOption[];
  options: FilterOption[];
};

export const Filter = ({ name, options, value }: Props) => {
  const [, setQuery] = useQueryState(name, { shallow: false });

  const [selectedValue, setSelectedValue] = useState<FilterOption[]>(value);

  const handleSelect = () => {
    setQuery(
      selectedValue.length ? selectedValue.map((v) => v.id).join(",") : null,
    );
  };

  return (
    <Listbox by="id" value={selectedValue} onChange={setSelectedValue} multiple>
      {({ value: selectedOptions }) => (
        <div className="relative">
          <Listbox.Button
            className={twClass("rounded-xl border px-2 py-1 border-gray-400", {
              "bg-lime-100 border-lime-500": selectedValue.length,
            })}
          >
            {name}
          </Listbox.Button>
          <Listbox.Options className="absolute top-9 border border-gray-400 bg-gray-200 rounded min-w-20 max-w-40">
            <For each={options}>
              {(option) => (
                <Listbox.Option value={option} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      key={option.id}
                      className={twClass(
                        "select-none cursor-pointer px-2 py-1 flex items-center",
                        {
                          "bg-lime-300": selected,
                          "bg-lime-100": active,
                        },
                      )}
                    >
                      <Show when={selected}>
                        <Icon name="check" size="xl" />
                      </Show>
                      {option.label}
                    </li>
                  )}
                </Listbox.Option>
              )}
            </For>
            <Listbox.Button className="w-full">
              <div
                className="px-2 py-1 border-t border-black w-full hover:bg-lime-500"
                onClick={handleSelect}
              >
                {$t("filter")}
              </div>
            </Listbox.Button>
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
};
