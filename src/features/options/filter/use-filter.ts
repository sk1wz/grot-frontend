"use client";

import { useCallback, useMemo, useState } from "react";
import { filterItems } from "./filter-items";
import type { FilterMatch } from "./filter-items";

type UseFilterOptions<TValue> = {
  initialValue?: TValue;
  onChange?: () => void;
};

export function useFilter<TItem, TValue extends string>(
  items: TItem[],
  allValue: TValue,
  match: FilterMatch<TItem, TValue>,
  { initialValue, onChange }: UseFilterOptions<TValue> = {}
) {
  const [value, setValueState] = useState(initialValue ?? allValue);

  const setValue = useCallback(
    (nextValue: TValue) => {
      setValueState(nextValue);
      onChange?.();
    },
    [onChange]
  );

  const result = useMemo(
    () => filterItems(items, value, allValue, match),
    [items, value, allValue, match]
  );

  const isActive = value !== allValue;

  return {
    value,
    setValue,
    items: result,
    isActive,
  };
}
