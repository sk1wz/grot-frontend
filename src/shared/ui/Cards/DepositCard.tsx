import { BalanceTransactionStatus, type BalanceTransactionType } from "@/entities/balance";
import { formatAmount, formatDate } from "@/shared/lib";
import { BadgeTransaction } from "@/shared/ui/Badge/BadgeTransaction";
import { CopyText } from "@/shared/ui/CopyText";

type DepositCardProps = {
  transaction: BalanceTransactionType;
};

function formatTransactionAmount(transaction: BalanceTransactionType) {
  const amount = formatAmount(Math.abs(transaction.amount));

  if (transaction.status === BalanceTransactionStatus.BALANCE_TOPUP) {
    return `+${amount}`;
  }

  if (transaction.status === BalanceTransactionStatus.BALANCE_PURCHASE) {
    return `-${amount}`;
  }

  return amount;
}

function getAmountClassName(transaction: BalanceTransactionType) {
  if (transaction.status === BalanceTransactionStatus.BALANCE_TOPUP) {
    return "text-emerald-700";
  }

  if (transaction.status === BalanceTransactionStatus.BALANCE_PURCHASE) {
    return "text-rose-700";
  }

  return "text-(--foreground)";
}

export function DepositCard({ transaction }: DepositCardProps) {
  return (
    <article className="rounded-lg border border-(--border) bg-(--panel-fill) p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-(--foreground)">Дата</p>
          <p className="mt-1 text-sm font-medium text-(--foreground)">
            {formatDate(transaction.createdAt)}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-(--foreground)">Сумма</p>
          <p
            className={`mt-1 whitespace-nowrap text-sm font-semibold ${getAmountClassName(transaction)}`}
          >
            {formatTransactionAmount(transaction)}
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-3 border-t border-(--border) pt-3">
        <div className="min-w-0">
          <p className="text-xs text-(--foreground)">ID транзакции</p>
          <CopyText
            value={transaction.id}
            title="Скопировать ID транзакции"
            className="mt-1 max-w-full text-sm text-(--foreground)"
          >
            {transaction.id}
          </CopyText>
        </div>
        <div>
          <p className="text-xs text-(--foreground)">Статус</p>
          <div className="mt-1">
            <BadgeTransaction status={transaction.status} />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-(--foreground)">Действие</p>
          <p className="mt-1 truncate text-sm text-(--foreground)">
            {transaction.meta?.action ?? "—"}
          </p>
        </div>
      </div>
    </article>
  );
}
