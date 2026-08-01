"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export type PaginationProps = {
  total: number;
  limit: number;
  page: number;
  onPageChange?: (page: number) => void;
  className?: string;
  summaryText?: string;
  summaryClassName?: string;
  compactOnMobile?: boolean;
};

function getTotalPages(total: number, limit: number) {
  if (total <= 0 || limit <= 0) {
    return 0;
  }

  return Math.ceil(total / limit);
}

function getVisiblePages(totalPages: number, page: number): number[] {
  if (totalPages <= 2) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page >= totalPages) {
    return [totalPages - 1, totalPages];
  }

  return [page, page + 1];
}

const controlClassName =
  "flex size-9 cursor-pointer items-center justify-center border border-(--border) rounded-lg bg-(--field) text-(--field-foreground) outline-none transition-colors hover:bg-(--accent)/90 disabled:cursor-not-allowed disabled:opacity-50";

export function Pagination({
  total,
  limit,
  page,
  onPageChange,
  className = "",
  summaryText,
  summaryClassName = "",
  compactOnMobile = false,
}: PaginationProps) {
  const totalPages = getTotalPages(total, limit);
  const safePage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const pageItems = getVisiblePages(totalPages, safePage);

  const canGoPrev = safePage > 1;
  const canGoNext = safePage < totalPages;

  function handlePageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === safePage) {
      return;
    }

    onPageChange?.(nextPage);
  }

  if (total <= 0) {
    return null;
  }

  return (
    <nav
      aria-label="Пагинация"
      className={`grid grid-cols-1 items-center gap-2 rounded-lg bg-(--surface) px-4 py-2 lg:grid-cols-3 ${className}`}
    >
      <span
        className={`hidden justify-self-start text-sm text-(--foreground) lg:block ${summaryClassName}`}
      >
        {summaryText ? `${summaryText}: ${total}` : null}
      </span>

      <div
        className={`flex min-w-0 items-center gap-1 justify-self-center ${compactOnMobile ? "justify-start lg:justify-self-center lg:justify-center" : "justify-center lg:justify-self-center"}`}
      >
        {totalPages > 1 ? (
          <>
            <button
              type="button"
              aria-label="В начало"
              disabled={!canGoPrev}
              onClick={() => handlePageChange(1)}
              className={controlClassName}
            >
              <ChevronsLeft size={18} />
            </button>

            <button
              type="button"
              aria-label="Предыдущая страница"
              disabled={!canGoPrev}
              onClick={() => handlePageChange(safePage - 1)}
              className={controlClassName}
            >
              <ChevronLeft size={18} />
            </button>

            {pageItems.map((item) => (
              <button
                key={item}
                type="button"
                aria-label={`Страница ${item}`}
                aria-current={item === safePage ? "page" : undefined}
                onClick={() => handlePageChange(item)}
                className={[
                  "flex size-9 cursor-pointer items-center justify-center rounded-lg text-sm font-medium outline-none transition-colors",
                  item === safePage
                    ? "bg-(--accent) text-(--accent-foreground)"
                    : "border border-(--border) bg-(--field) text-(--field-foreground) hover:bg-(--accent)/90",
                ].join(" ")}
              >
                {item}
              </button>
            ))}

            <button
              type="button"
              aria-label="Следующая страница"
              disabled={!canGoNext}
              onClick={() => handlePageChange(safePage + 1)}
              className={controlClassName}
            >
              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              aria-label="В конец"
              disabled={!canGoNext}
              onClick={() => handlePageChange(totalPages)}
              className={controlClassName}
            >
              <ChevronsRight size={18} />
            </button>
          </>
        ) : null}
      </div>

      <span className="justify-self-center text-sm text-(--foreground) lg:justify-self-end">
        Страница {safePage} из {Math.max(totalPages, 1)}
      </span>
    </nav>
  );
}
