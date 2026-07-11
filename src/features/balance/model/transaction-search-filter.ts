import {
  BalanceTransactionStatus,
  type BalanceTransaction,
} from "@/entities/balance";
import {
  createMultiFieldSearchFn,
  type FilterFn,
  type FilterOption,
  type SearchFn,
} from "@/features/search-filter";
import { formatAmount, formatDate } from "@/shared/lib";

export const ALL_TRANSACTIONS_FILTER = "all" as const;

export type TransactionFilter =
  | typeof ALL_TRANSACTIONS_FILTER
  | BalanceTransactionStatus;

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

export const transactionFilterOptions: FilterOption<TransactionFilter>[] = [
  { value: ALL_TRANSACTIONS_FILTER, label: "Все" },
  { value: BalanceTransactionStatus.BALANCE_TOPUP, label: "Пополнения" },
  { value: BalanceTransactionStatus.BALANCE_PURCHASE, label: "Списания" },
  { value: BalanceTransactionStatus.BALANCE_REFUND, label: "Возвраты" },
  { value: BalanceTransactionStatus.BALANCE_FAILED, label: "Ошибка" },
];

export const matchTransactionFilter: FilterFn<
  BalanceTransaction,
  TransactionFilter
> = (transaction, filter) => transaction.status === filter;

export const searchTransaction: SearchFn<BalanceTransaction> =
  createMultiFieldSearchFn((transaction) => [
    transaction.id,
    transaction.meta?.action,
    transaction.status,
    statusLabels[transaction.status],
    typeLabels[transaction.status],
    formatAmount(Math.abs(transaction.amount)),
    String(transaction.amount),
    formatDate(transaction.createdAt),
  ]);
