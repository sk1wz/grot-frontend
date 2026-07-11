export type SearchMatch<TItem> = (
  item: TItem,
  normalizedQuery: string
) => boolean;

export function searchItems<TItem>(
  items: TItem[],
  query: string,
  match: SearchMatch<TItem>
) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return items;
  }

  return items.filter((item) => match(item, normalizedQuery));
}
