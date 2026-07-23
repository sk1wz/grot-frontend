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

export function Pagination({
  total,
  limit,
  page,
  onPageChange,
  className = "",
  summaryText,
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

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Пагинация"
      className={`flex justify-between items-center gap-2 ${className}`}
    >
      <span className="text-sm text-(--foreground)">
        {summaryText && `${summaryText}: ${total}`}
      </span>

      <div className="flex items-center justify-start gap-1">
        <button
          type="button"
          aria-label="В начало"
          disabled={!canGoPrev}
          onClick={() => handlePageChange(1)}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg bg-(--surface) text-(--foreground) outline-none transition-colors hover:bg-(--field) disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronsLeft size={18} />
        </button>

        <button
          type="button"
          aria-label="Предыдущая страница"
          disabled={!canGoPrev}
          onClick={() => handlePageChange(safePage - 1)}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg bg-(--surface) text-(--foreground) outline-none transition-colors hover:bg-(--field) disabled:cursor-not-allowed disabled:opacity-50"
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
                : "bg-(--surface) text-(--foreground) hover:bg-(--field)",
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
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg bg-(--surface) text-(--foreground) outline-none transition-colors hover:bg-(--field) disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>

        <button
          type="button"
          aria-label="В конец"
          disabled={!canGoNext}
          onClick={() => handlePageChange(totalPages)}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg  bg-(--surface) text-(--foreground) outline-none transition-colors hover:bg-(--field) disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </nav>
  );
}
