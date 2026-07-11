export type FilterOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

export type FilterMatch<TItem, TValue> = (
  item: TItem,
  value: TValue
) => boolean;

export function filterItems<TItem, TValue>(
  items: TItem[],
  value: TValue,
  allValue: TValue,
  match: FilterMatch<TItem, TValue>
) {
  if (value === allValue) {
    return items;
  }

  return items.filter((item) => match(item, value));
}
