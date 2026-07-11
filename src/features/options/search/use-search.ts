"use client";

import { useCallback, useMemo, useState } from "react";
import { searchItems } from "./search-items";
import type { SearchMatch } from "./search-items";

type UseSearchOptions = {
  initialQuery?: string;
  onChange?: () => void;
};

export function useSearch<TItem>(
  items: TItem[],
  match: SearchMatch<TItem>,
  { initialQuery = "", onChange }: UseSearchOptions = {}
) {
  const [query, setQueryState] = useState(initialQuery);

  const setQuery = useCallback(
    (value: string) => {
      setQueryState(value);
      onChange?.();
    },
    [onChange]
  );

  const result = useMemo(
    () => searchItems(items, query, match),
    [items, query, match]
  );

  const hasQuery = Boolean(query.trim());

  return {
    query,
    setQuery,
    items: result,
    hasQuery,
  };
}
