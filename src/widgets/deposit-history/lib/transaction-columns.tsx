import {
  BalanceTransactionStatus,
  type BalanceTransactionType,
} from "@/entities/balance";
import { formatAmount, formatDate } from "@/shared/lib";
import { BadgeTransaction, CopyText, type TableColumn } from "@/shared/ui";

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
    return "text-[#4FCB91]";
  }

  if (transaction.status === BalanceTransactionStatus.BALANCE_PURCHASE) {
    return "text-[#F44E4A]";
  }

  return "text-black";
}

export const transactionColumns: TableColumn<BalanceTransactionType>[] = [
  {
    key: "createdAt",
    title: "Дата и время",
    width: "15%",
    render: (transaction) => formatDate(transaction.createdAt),
  },
  {
    key: "id",
    title: "ID транзакции",
    width: "20%",
    className: "truncate",
    render: (transaction) => (
      <CopyText
        value={transaction.id}
        title="Скопировать ID транзакции"
        className="max-w-full text-sm text-(--foreground)"
      >
        {transaction.id}
      </CopyText>
    ),
  },
  {
    key: "status",
    title: "Тип операции",
    width: "15%",
    render: (transaction) => <BadgeTransaction status={transaction.status} />,
  },
  {
    key: "action",
    title: "Действие",
    width: "35%",
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
