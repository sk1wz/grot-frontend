import type { ReactNode } from "react";

export type TableProps = {
  children: ReactNode;
  minWidth?: string;
  className?: string;
};

export type TableHeadProps = {
  children: ReactNode;
  className?: string;
};

export type TableBodyProps = {
  children: ReactNode;
  className?: string;
};

export function Table({
  children,
  minWidth = "720px",
  className = "",
}: TableProps) {
  return (
    <div
      className={`overflow-x-auto border border-(--border) [scrollbar-gutter:stable] ${className}`}
    >
      <table
        className="w-full table-fixed border-collapse text-left"
        style={{ minWidth }}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, className = "" }: TableHeadProps) {
  return (
    <thead className={`sticky top-0 z-10 bg-(--surface) ${className}`}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className = "" }: TableBodyProps) {
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
      className={`border-b border-(--border) bg-(--surface) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--foreground) ${className}`}
    >
      {children}
    </th>
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
