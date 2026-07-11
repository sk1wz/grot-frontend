import type { FilterFn, SearchFn } from "./types";

type FilterItemsOptions<TItem, TFilter extends string> = {
  search?: string;
  filter?: TFilter;
  allFilterValue?: TFilter;
  searchFn?: SearchFn<TItem>;
  filterFn?: FilterFn<TItem, TFilter>;
};

export function filterItems<TItem, TFilter extends string>(
  items: TItem[],
  {
    search,
    filter,
    allFilterValue,
    searchFn,
    filterFn,
  }: FilterItemsOptions<TItem, TFilter>
) {
  let result = items;
  const normalizedSearch = search?.trim().toLowerCase();

  if (
    filterFn &&
    filter !== undefined &&
    allFilterValue !== undefined &&
    filter !== allFilterValue
  ) {
    result = result.filter((item) => filterFn(item, filter));
  }

  if (searchFn && normalizedSearch) {
    result = result.filter((item) => searchFn(item, normalizedSearch));
  }

  return result;
}
