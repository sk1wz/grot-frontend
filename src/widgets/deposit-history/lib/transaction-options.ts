import {
  BalanceTransactionStatus,
  type BalanceTransaction,
} from "@/entities/balance";
import type { FilterOption } from "@/features/options";

export const ALL_TRANSACTIONS_FILTER = "all" as const;

export type TransactionFilter =
  | typeof ALL_TRANSACTIONS_FILTER
  | BalanceTransactionStatus;

export const transactionFilterOptions: FilterOption<TransactionFilter>[] = [
  { value: ALL_TRANSACTIONS_FILTER, label: "Все" },
  { value: BalanceTransactionStatus.BALANCE_TOPUP, label: "Пополнения" },
  { value: BalanceTransactionStatus.BALANCE_PURCHASE, label: "Списания" },
  { value: BalanceTransactionStatus.BALANCE_REFUND, label: "Возвраты" },
  { value: BalanceTransactionStatus.BALANCE_FAILED, label: "Ошибка" },
];

export function matchTransactionFilter(
  transaction: BalanceTransaction,
  filter: TransactionFilter
) {
  return transaction.status === filter;
}
