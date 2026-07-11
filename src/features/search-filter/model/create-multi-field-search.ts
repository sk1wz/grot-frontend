import type { SearchFn } from "./types";

type SearchableValue = string | number | null | undefined;

export function createMultiFieldSearchFn<TItem>(
  getFields: (item: TItem) => SearchableValue[]
): SearchFn<TItem> {
  return (item, normalizedQuery) =>
    getFields(item).some((field) =>
      String(field ?? "")
        .toLowerCase()
        .includes(normalizedQuery)
    );
}
