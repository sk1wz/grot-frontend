import type { ReactNode } from "react";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

export type TableColumn<T> = {
  key: string;
  title: string;
  width?: string;
  className?: string;
  render: (item: T) => ReactNode;
};

type SmartTableProps<T> = {
  items: T[];
  columns: TableColumn<T>[];
  getRowKey: (item: T) => string | number;
  isLoading?: boolean;
  isInitialized?: boolean;
  emptyMessage?: string;
  minWidth?: string;
  className?: string;
};

const cellClass = "px-4 py-3 text-sm text-(--foreground)";

export function SmartTable<T>({
  items,
  columns,
  getRowKey,
  isLoading = false,
  isInitialized = true,
  emptyMessage = "Нет данных для отображения",
  minWidth = "720px",
  className = "",
}: SmartTableProps<T>) {
  const showSkeleton = !isInitialized || (isLoading && items.length === 0);

  return (
    <div
      className={`overflow-x-auto rounded-[18px] border border-(--border) [scrollbar-gutter:stable] ${className}`}
    >
      <table
        className="w-full table-fixed border-separate border-spacing-0 text-left"
        style={{ minWidth }}
      >
        <colgroup>
          {columns.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
        </colgroup>

        <thead className="sticky top-0 z-10 bg-(--panel-fill) shadow-(--panel-shadow)">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                scope="col"
                className={[
                  "bg-(--panel-fill) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--foreground)",
                  index === 0 ? "rounded-tl-[18px]" : "",
                  index === columns.length - 1 ? "rounded-tr-[18px]" : "",
                ].join(" ")}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {showSkeleton &&
            Array.from({ length: 5 }, (_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.key} className={cellClass}>
                    <Skeleton className="h-4 w-32" />
                  </td>
                ))}
              </tr>
            ))}

          {!showSkeleton &&
            items.map((item) => (
              <tr
                key={getRowKey(item)}
                className="transition-colors hover:bg-(--field)"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`${cellClass} ${column.className ?? ""}`}
                  >
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))}

          {!showSkeleton && items.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-sm text-(--foreground)"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
