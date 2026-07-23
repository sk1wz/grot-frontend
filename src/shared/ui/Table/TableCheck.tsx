import type { Check } from "@/entities/check";
import { CheckModuleLabel, CheckStatusLabel } from "@/entities/check";
import { formatDate } from "@/shared/lib";
import { Badge } from "@/shared/ui/Badge/Badge";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableEmptyRow,
  TableHead,
  TableHeadCell,
  TableRow,
} from "./Table";
import { checkStatusVariants } from "./lib/check-status";
import { formatCheckSubject } from "./lib/format-check-subject";

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
          <TableCell>
            <Skeleton className="h-4 w-36" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-28" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-48" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-24 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
        </tr>
      ))}
    </>
  );
}

function TableCheckRow({ check }: { check: Check }) {
  return (
    <TableRow>
      <TableCell>{formatDate(check.createdAt)}</TableCell>
      <TableCell>{CheckModuleLabel[check.module]}</TableCell>
      <TableCell className="truncate">
        {formatCheckSubject(check.subject)}
      </TableCell>
      <TableCell>
        <Badge variant={checkStatusVariants[check.status]}>
          {CheckStatusLabel[check.status]}
        </Badge>
      </TableCell>
      <TableCell>{null}</TableCell>
    </TableRow>
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
    <Table minWidth="840px" className={className}>
      <colgroup>
        <col className="w-[22%]" />
        <col className="w-[18%]" />
        <col className="w-[28%]" />
        <col className="w-[16%]" />
        <col className="w-[16%]" />
      </colgroup>
      <TableHead>
        <tr>
          <TableHeadCell>Дата и время</TableHeadCell>
          <TableHeadCell>Модуль</TableHeadCell>
          <TableHeadCell>Тело запроса</TableHeadCell>
          <TableHeadCell>Статус</TableHeadCell>
          <TableHeadCell>Действия</TableHeadCell>
        </tr>
      </TableHead>
      <TableBody>
        {showSkeleton ? (
          <TableCheckSkeletonRows />
        ) : items.length ? (
          items.map((check) => <TableCheckRow key={check.id} check={check} />)
        ) : (
          <TableEmptyRow colSpan={5}>{emptyMessage}</TableEmptyRow>
        )}
      </TableBody>
    </Table>
  );
}
