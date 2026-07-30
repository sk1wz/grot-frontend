import {
  BalanceTransactionStatus,
  type BalanceTransactionType,
} from "@/entities/balance";
import { formatAmount, formatDate } from "@/shared/lib";
import { BadgeTransaction, type TableColumn } from "@/shared/ui";

export function formatTransactionAmount(transaction: BalanceTransactionType) {
  const amount = formatAmount(Math.abs(transaction.amount));

  if (transaction.status === BalanceTransactionStatus.BALANCE_TOPUP) {
    return `+${amount}`;
  }

  if (transaction.status === BalanceTransactionStatus.BALANCE_PURCHASE) {
    return `-${amount}`;
  }

  return amount;
}

export function transactionAmountClassName(
  transaction: BalanceTransactionType
) {
  if (transaction.status === BalanceTransactionStatus.BALANCE_TOPUP) {
    return "text-emerald-700";
  }

  if (transaction.status === BalanceTransactionStatus.BALANCE_PURCHASE) {
    return "text-rose-700";
  }

  return "text-(--foreground)";
}

export const transactionColumns: TableColumn<BalanceTransactionType>[] = [
  {
    key: "createdAt",
    title: "Дата и время",
    width: "20%",
    render: (transaction) => formatDate(transaction.createdAt),
  },
  {
    key: "id",
    title: "ID транзакции",
    width: "22%",
    className: "truncate",
    render: (transaction) => transaction.id,
  },
  {
    key: "status",
    title: "Тип операции",
    width: "20%",
    render: (transaction) => <BadgeTransaction status={transaction.status} />,
  },
  {
    key: "action",
    title: "Действие",
    width: "23%",
    className: "truncate",
    render: (transaction) => transaction.meta?.action ?? "—",
  },
  {
    key: "amount",
    title: "Сумма",
    width: "15%",
    className: "whitespace-nowrap text-right font-semibold",
    render: (transaction) => (
      <span className={transactionAmountClassName(transaction)}>
        {formatTransactionAmount(transaction)}
      </span>
    ),
  },
];
