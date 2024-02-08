"use client";

import React, { useEffect, useState } from "react";
import { twClass } from "@/utils/twClass";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";

type Props = {
  className?: string;
  param: string;
};

export const Searchbox: React.FC<Props> = ({ className, param }) => {
  const [query, setQuery] = useQueryState(param, {
    shallow: false,
  });
  const [search, setSearch] = useState(query);
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    setQuery(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <input
      className={twClass("bg-gray-50 text-gray-800", className)}
      value={search ?? ""}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
