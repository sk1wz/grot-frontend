import { BalanceChangeReason } from "@/entities/balance";
import { formatAmount, formatDate } from "@/shared/lib";
import { Card, Text } from "@/shared/ui";

export type DepositHistoryCardProps = {
  amount: number;
  currency?: string;
  status: BalanceChangeReason;
  createdAt: string | Date;
  action?: string;
  id?: string;
  className?: string;
};

const statusLabels: Record<BalanceChangeReason, string> = {
  BALANCE_TOPUP: "Пополнение",
  BALANCE_REFUND: "Возврат",
  BALANCE_FAILED: "Отклонено",
  BALANCE_PURCHASE: "Списание",
};

export function DepositHistoryCard({
  amount,
  currency = "₽",
  status,
  createdAt,
  action,
  id,
  className = "",
}: DepositHistoryCardProps) {
  return (
    <Card
      className={`flex flex-col gap-3 rounded-2xl border border-(--border) p-4 shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--field) p-2`}
          >
            {action}
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <Text className={`text-base font-semibold`}>
              {formatAmount(amount, currency)}
            </Text>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium`}
        >
          Операция: {statusLabels[status]}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-(--border) pt-3">
        <Text className="text-xs text-(--muted)">{formatDate(createdAt)}</Text>
        {id ? (
          <Text className="truncate text-xs text-(--muted)">ID: {id}</Text>
        ) : null}
      </div>
    </Card>
  );
}
