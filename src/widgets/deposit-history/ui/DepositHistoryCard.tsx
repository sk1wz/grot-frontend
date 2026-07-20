import { BalanceTransactionStatus } from "@/entities/balance";
import { formatAmount, formatDate } from "@/shared/lib";
import { Badge, BadgeVariant } from "@/shared/ui";

export type DepositHistoryCardProps = {
  amount: number;
  currency?: string;
  status?: BalanceTransactionStatus;
  createdAt: string | Date;
  action?: string;
  id?: string;
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

export function DepositHistoryCard({
  amount,
  currency = "₽",
  status = BalanceTransactionStatus.BALANCE_FAILED,
  createdAt,
  action,
  id,
  className = "",
}: DepositHistoryCardProps) {
  const absoluteFormattedAmount = formatAmount(Math.abs(amount), currency);
  const formattedDate = formatDate(createdAt);
  const statusLabel = statusLabels[status];
  const typeLabel = typeLabels[status];
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
    <tr className={`transition-colors hover:bg-(--field) ${className}`}>
      <td className="border-b border-(--border) px-4 py-3">
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-(--foreground)">
            {typeLabel}
          </span>
          <span className="mt-0.5 text-xs text-(--foreground)">
            {formattedDate}
          </span>
        </div>
      </td>
      <td className="truncate border-b border-(--border) px-4 py-3 text-sm text-(--foreground)">
        {id ?? "—"}
      </td>
      <td className="border-b border-(--border) px-4 py-3 text-sm">
        <Badge variant={statusVariants[status]}>{statusLabel}</Badge>
      </td>
      <td className="truncate border-b border-(--border) px-4 py-3 text-sm text-(--foreground)">
        {action ?? "—"}
      </td>
      <td
        className={`whitespace-nowrap border-b border-(--border) px-4 py-3 text-sm font-semibold ${amountClassName}`}
      >
        {signedAmount}
      </td>
    </tr>
  );
}
