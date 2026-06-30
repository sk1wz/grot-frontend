"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Text } from "../Text/Text";

export type PaginationProps = {
  total: number;
  limit: number;
  page: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

function getTotalPages(total: number, limit: number) {
  if (total <= 0 || limit <= 0) {
    return 0;
  }

  return Math.ceil(total / limit);
}

function getPageItems(
  totalPages: number,
  page: number
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: (number | "ellipsis")[] = [1];

  if (page > 3) {
    items.push("ellipsis");
  }

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  for (let current = start; current <= end; current += 1) {
    items.push(current);
  }

  if (page < totalPages - 2) {
    items.push("ellipsis");
  }

  items.push(totalPages);

  return items;
}

export function Pagination({
  total,
  limit,
  page,
  onPageChange,
  className = "",
}: PaginationProps) {
  const totalPages = getTotalPages(total, limit);
  const safePage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const pageItems = getPageItems(totalPages, safePage);

  const rangeStart = total === 0 ? 0 : (safePage - 1) * limit + 1;
  const rangeEnd = Math.min(safePage * limit, total);

  const canGoPrev = safePage > 1;
  const canGoNext = safePage < totalPages;

  function handlePageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === safePage) {
      return;
    }

    onPageChange?.(nextPage);
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Пагинация"
      className={`flex flex-wrap items-center justify-between gap-3 ${className}`}
    >
      <Text className="text-sm text-(--muted)">
        {rangeStart}–{rangeEnd} из {total} страниц
      </Text>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Предыдущая страница"
          disabled={!canGoPrev}
          onClick={() => handlePageChange(safePage - 1)}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-(--border) bg-(--surface) text-(--foreground) outline-none transition-colors hover:bg-(--field) disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>

        {pageItems.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="flex size-9 items-center justify-center text-sm text-(--muted)"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Страница ${item}`}
              aria-current={item === safePage ? "page" : undefined}
              onClick={() => handlePageChange(item)}
              className={[
                "flex size-9 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium outline-none transition-colors",
                item === safePage
                  ? "border-(--accent-border) bg-(--accent) text-(--accent-foreground)"
                  : "border-(--border) bg-(--surface) text-(--foreground) hover:bg-(--field)",
              ].join(" ")}
            >
              {item}
            </button>
          )
        )}

        <button
          type="button"
          aria-label="Следующая страница"
          disabled={!canGoNext}
          onClick={() => handlePageChange(safePage + 1)}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-(--border) bg-(--surface) text-(--foreground) outline-none transition-colors hover:bg-(--field) disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  );
}
