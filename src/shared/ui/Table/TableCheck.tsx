import type { Check } from "@/entities/check";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import {
  Table,
  TableBody,
  TableEmptyRow,
  TableHead,
  TableHeadCell,
} from "./Table";
import { TableCheckRow } from "./TableCheckRow";

export type TableCheckProps = {
  items: Check[];
  isLoading?: boolean;
  isInitialized?: boolean;
  emptyMessage?: string;
  className?: string;
};

function TableCheckSkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index}>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-4 w-36" />
          </td>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-4 w-48" />
          </td>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-6 w-24 rounded-full" />
          </td>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-4 w-16" />
          </td>
        </tr>
      ))}
    </>
  );
}

export function TableCheck({
  items,
  isLoading = false,
  isInitialized = true,
  emptyMessage = "Нет проверок для отображения",
  className = "",
}: TableCheckProps) {
  const showSkeleton = !isInitialized || (isLoading && items.length === 0);

  return (
    <Table minWidth="720px" className={className}>
      <colgroup>
        <col className="w-[24%]" />
        <col className="w-[40%]" />
        <col className="w-[18%]" />
        <col className="w-[18%]" />
      </colgroup>
      <TableHead>
        <tr>
          <TableHeadCell>Дата и время проверки</TableHeadCell>
          <TableHeadCell>Запрос</TableHeadCell>
          <TableHeadCell>Статус</TableHeadCell>
          <TableHeadCell>Действия</TableHeadCell>
        </tr>
      </TableHead>
      <TableBody>
        {showSkeleton ? (
          <TableCheckSkeletonRows />
        ) : items.length ? (
          items.map((check) => (
            <TableCheckRow key={check.id} check={check} />
          ))
        ) : (
          <TableEmptyRow colSpan={4}>{emptyMessage}</TableEmptyRow>
        )}
      </TableBody>
    </Table>
  );
}
