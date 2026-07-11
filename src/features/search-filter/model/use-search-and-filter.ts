"use client";

import { useCallback, useMemo, useState } from "react";
import { filterItems } from "./filter-items";
import type { UseSearchAndFilterOptions } from "./types";

export function useSearchAndFilter<
  TItem,
  TFilter extends string = string,
>(
  items: TItem[],
  {
    initialSearch = "",
    initialFilter,
    allFilterValue,
    searchFn,
    filterFn,
    onChange,
  }: UseSearchAndFilterOptions<TItem, TFilter>
) {
  const defaultFilter = initialFilter ?? allFilterValue;
  const [search, setSearchState] = useState(initialSearch);
  const [filter, setFilterState] = useState<TFilter | undefined>(defaultFilter);

  const setSearch = useCallback(
    (value: string) => {
      setSearchState(value);
      onChange?.();
    },
    [onChange]
  );

  const setFilter = useCallback(
    (value: TFilter) => {
      setFilterState(value);
      onChange?.();
    },
    [onChange]
  );

  const filteredItems = useMemo(
    () =>
      filterItems(items, {
        search,
        filter,
        allFilterValue,
        searchFn,
        filterFn,
      }),
    [items, search, filter, allFilterValue, searchFn, filterFn]
  );

  const hasActiveFilters = useMemo(() => {
    const hasSearch = Boolean(search.trim());
    const hasFilter =
      allFilterValue !== undefined &&
      filter !== undefined &&
      filter !== allFilterValue;

    return hasSearch || hasFilter;
  }, [search, filter, allFilterValue]);

  const reset = useCallback(() => {
    setSearchState(initialSearch);
    setFilterState(defaultFilter);
    onChange?.();
  }, [defaultFilter, initialSearch, onChange]);

  return {
    search,
    setSearch,
    filter,
    setFilter,
    filteredItems,
    hasActiveFilters,
    reset,
  };
}
