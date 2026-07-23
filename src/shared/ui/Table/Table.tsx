import type { ReactNode } from "react";

export type TableProps = {
  children: ReactNode;
  minWidth?: string;
  className?: string;
};

export function Table({
  children,
  minWidth = "720px",

  className = "",
}: TableProps) {
  return (
    <div
      className={`overflow-x-auto rounded-[18px] border border-(--border) [scrollbar-gutter:stable] ${className}`}
    >
      <table
        className="w-full table-fixed border-separate border-spacing-0 text-left"
        style={{ minWidth }}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <thead
      className={`sticky top-0 z-10 bg-(--panel-fill) shadow-(--panel-shadow) [&_th:first-child]:rounded-tl-[18px] [&_th:last-child]:rounded-tr-[18px] ${className}`}
    >
      {children}
    </thead>
  );
}

export function TableBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableHeadCell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`bg-(--panel-fill) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--foreground) ${className}`}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 text-sm text-(--foreground) ${className}`}>
      {children}
    </td>
  );
}

export function TableRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr className={`transition-colors hover:bg-(--field) ${className}`}>
      {children}
    </tr>
  );
}

export function TableEmptyRow({
  colSpan,
  children,
}: {
  colSpan: number;
  children: ReactNode;
}) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-4 py-10 text-center text-sm text-(--foreground)"
      >
        {children}
      </td>
    </tr>
  );
}
