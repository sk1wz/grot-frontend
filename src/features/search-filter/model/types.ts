export type FilterOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

export type SearchFn<TItem> = (item: TItem, normalizedQuery: string) => boolean;

export type FilterFn<TItem, TFilter extends string> = (
  item: TItem,
  filter: TFilter
) => boolean;

export type UseSearchAndFilterOptions<
  TItem,
  TFilter extends string = string,
> = {
  initialSearch?: string;
  initialFilter?: TFilter;
  allFilterValue?: TFilter;
  searchFn?: SearchFn<TItem>;
  filterFn?: FilterFn<TItem, TFilter>;
  onChange?: () => void;
};
