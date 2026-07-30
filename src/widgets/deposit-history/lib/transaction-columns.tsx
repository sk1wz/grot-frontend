import {
  BalanceTransactionStatus,
  BalanceTransactionStatusLabel,
  type BalanceTransactionType,
} from "@/entities/balance";
import { formatAmount, formatDate } from "@/shared/lib";
import { Badge, type BadgeVariant, type TableColumn } from "@/shared/ui";

const transactionStatusVariants: Record<
  BalanceTransactionStatus,
  BadgeVariant
> = {
  [BalanceTransactionStatus.BALANCE_TOPUP]: "success",
  [BalanceTransactionStatus.BALANCE_REFUND]: "info",
  [BalanceTransactionStatus.BALANCE_FAILED]: "danger",
  [BalanceTransactionStatus.BALANCE_PURCHASE]: "warning",
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
    render: (transaction) => (
      <Badge variant={transactionStatusVariants[transaction.status]}>
        {BalanceTransactionStatusLabel[transaction.status]}
      </Badge>
    ),
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
      <span
        className={
          transaction.status === BalanceTransactionStatus.BALANCE_TOPUP
            ? "text-emerald-700"
            : transaction.status === BalanceTransactionStatus.BALANCE_PURCHASE
            ? "text-rose-700"
            : undefined
        }
      >
        {formatTransactionAmount(transaction)}
      </span>
    ),
  },
];
