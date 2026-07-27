import {
  BalanceTransactionStatus,
  type BalanceTransactionType,
} from "@/entities/balance";
import { formatAmount, formatDate } from "@/shared/lib";
import { Badge, type BadgeVariant } from "@/shared/ui/Badge/Badge";
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

export type TableDepositProps = {
  items: BalanceTransactionType[];
  isLoading?: boolean;
  isInitialized?: boolean;
  emptyMessage?: string;
  className?: string;
};

const statusLabels: Record<BalanceTransactionStatus, string> = {
  BALANCE_TOPUP: "Пополнение",
  BALANCE_REFUND: "Возврат",
  BALANCE_FAILED: "Ошибка",
  BALANCE_PURCHASE: "Списание",
};

const typeLabels: Record<BalanceTransactionStatus, string> = {
  BALANCE_TOPUP: "Пополнение средств",
  BALANCE_REFUND: "Возврат средств",
  BALANCE_FAILED: "Ошибка операции",
  BALANCE_PURCHASE: "Списание средств",
};

const statusVariants: Record<BalanceTransactionStatus, BadgeVariant> = {
  BALANCE_TOPUP: "success",
  BALANCE_REFUND: "info",
  BALANCE_FAILED: "danger",
  BALANCE_PURCHASE: "warning",
};

function TableDepositSkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index}>
          <TableCell>
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-2 h-3 w-28" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-36" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-28 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-56" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
        </tr>
      ))}
    </>
  );
}

function TableDepositRow({
  deposit,
}: {
  deposit: BalanceTransactionType;
}) {
  const status = deposit.status ?? BalanceTransactionStatus.BALANCE_FAILED;
  const absoluteFormattedAmount = formatAmount(Math.abs(deposit.amount), "₽");
  const isTopup = status === BalanceTransactionStatus.BALANCE_TOPUP;
  const isPurchase = status === BalanceTransactionStatus.BALANCE_PURCHASE;
  const signedAmount = isTopup
    ? `+${absoluteFormattedAmount}`
    : isPurchase
      ? `-${absoluteFormattedAmount}`
      : absoluteFormattedAmount;
  const amountClassName = isTopup
    ? "text-emerald-700"
    : isPurchase
      ? "text-rose-700"
      : "text-(--foreground)";

  return (
    <TableRow>
      <TableCell>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-(--foreground)">
            {typeLabels[status]}
          </span>
          <span className="mt-0.5 text-xs text-(--foreground)">
            {formatDate(deposit.createdAt)}
          </span>
        </div>
      </TableCell>
      <TableCell className="truncate">{deposit.id ?? "—"}</TableCell>
      <TableCell>
        <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
      </TableCell>
      <TableCell className="truncate">{deposit.meta?.action ?? "—"}</TableCell>
      <TableCell className={`whitespace-nowrap font-semibold ${amountClassName}`}>
        {signedAmount}
      </TableCell>
    </TableRow>
  );
}

export function TableDeposit({
  items,
  isLoading = false,
  isInitialized = true,
  emptyMessage = "Нет операций для отображения",
  className = "",
}: TableDepositProps) {
  const showSkeleton = !isInitialized || (isLoading && items.length === 0);

  return (
    <Table minWidth="980px" className={className}>
      <colgroup>
        <col className="w-[22%]" />
        <col className="w-[18%]" />
        <col className="w-[14%]" />
        <col className="w-[28%]" />
        <col className="w-[18%]" />
      </colgroup>
      <TableHead>
        <tr>
          <TableHeadCell>Тип / Дата</TableHeadCell>
          <TableHeadCell>ID транзакции</TableHeadCell>
          <TableHeadCell>Статус</TableHeadCell>
          <TableHeadCell>Действие</TableHeadCell>
          <TableHeadCell>Сумма</TableHeadCell>
        </tr>
      </TableHead>
      <TableBody>
        {showSkeleton ? (
          <TableDepositSkeletonRows />
        ) : items.length ? (
          items.map((deposit) => (
            <TableDepositRow
              key={deposit.id ?? deposit.createdAt.toString()}
              deposit={deposit}
            />
          ))
        ) : (
          <TableEmptyRow colSpan={5}>{emptyMessage}</TableEmptyRow>
        )}
      </TableBody>
    </Table>
  );
}
