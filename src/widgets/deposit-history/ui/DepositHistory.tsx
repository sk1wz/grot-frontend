"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getBalanceTransactions,
  useBalanceTransactionsStore,
} from "@/entities/balance";
import type { BalanceTransaction } from "@/entities/balance";
import { useFilter } from "@/features/options";
import {
  DepositHistoryCard,
  Pagination,
  SelectField,
  Skeleton,
} from "@/shared/ui";
import {
  ALL_TRANSACTIONS_FILTER,
  matchTransactionFilter,
  transactionFilterOptions,
  type TransactionFilter,
} from "../lib/transaction-options";

const ITEMS_PER_PAGE = 10;

function DepositHistorySkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index}>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-2 h-3 w-28" />
          </td>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-4 w-36" />
          </td>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-6 w-28 rounded-full" />
          </td>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-4 w-56" />
          </td>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-4 w-24" />
          </td>
        </tr>
      ))}
    </>
  );
}

export function DepositHistory() {
  const items = useBalanceTransactionsStore((state) => state.items);
  const isLoading = useBalanceTransactionsStore((state) => state.isLoading);
  const isInitialized = useBalanceTransactionsStore(
    (state) => state.isInitialized
  );
  const showSkeleton = !isInitialized || (isLoading && items.length === 0);
  const [currentPage, setCurrentPage] = useState(1);

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const {
    value: filter,
    setValue: setFilter,
    items: filteredItems,
    isActive: isFilterActive,
  } = useFilter<BalanceTransaction, TransactionFilter>(
    items,
    ALL_TRANSACTIONS_FILTER,
    matchTransactionFilter,
    {
      initialValue: ALL_TRANSACTIONS_FILTER,
      onChange: resetPage,
    }
  );

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const safeCurrentPage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, safeCurrentPage]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await getBalanceTransactions();
      if (response) {
        useBalanceTransactionsStore.getState().setTransactions(response);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <section className="flex h-full w-full flex-col gap-4">
      <div className="border border-(--border) bg-(--surface) p-4">
        <div className="flex flex-col gap-4">
          <SelectField<TransactionFilter>
            value={filter}
            onChange={setFilter}
            options={transactionFilterOptions}
            label="Тип операции"
            className="max-w-xs"
          />

          <div className="h-full overflow-auto border border-(--border) [scrollbar-gutter:stable]">
            <table className="w-full min-w-[980px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[10%]" />
                <col className="w-[18%]" />
                <col className="w-[14%]" />
                <col className="w-[36%]" />
                <col className="w-[10%]" />
              </colgroup>
              <thead className="sticky top-0 z-10 bg-(--surface)">
                <tr>
                  <th className="border-b border-(--border) bg-(--surface) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--muted)">
                    Тип / Дата
                  </th>
                  <th className="border-b border-(--border) bg-(--surface) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--muted)">
                    ID транзакции
                  </th>
                  <th className="border-b border-(--border) bg-(--surface) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--muted)">
                    Статус
                  </th>
                  <th className="border-b border-(--border) bg-(--surface) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--muted)">
                    Действие
                  </th>
                  <th className="border-b border-(--border) bg-(--surface) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--muted)">
                    Сумма
                  </th>
                </tr>
              </thead>
              <tbody>
                {showSkeleton ? (
                  <DepositHistorySkeletonRows />
                ) : paginatedItems.length ? (
                  paginatedItems.map((deposit) => (
                    <DepositHistoryCard
                      key={deposit.id ?? deposit.createdAt.toString()}
                      amount={deposit.amount}
                      status={deposit.status}
                      createdAt={deposit.createdAt}
                      action={deposit.meta?.action}
                      id={deposit.id}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-sm text-(--muted)"
                    >
                      {isFilterActive
                        ? "Нет операций по выбранному фильтру"
                        : "Нет операций для отображения"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            total={totalItems}
            limit={ITEMS_PER_PAGE}
            page={safeCurrentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
