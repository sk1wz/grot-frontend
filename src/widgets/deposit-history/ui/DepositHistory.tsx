"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getBalanceTransactions,
  useBalanceTransactionsStore,
} from "@/entities/balance";
import type { BalanceTransactionType } from "@/entities/balance";
import { useFilter } from "@/features/options";
import { Pagination, SelectField, TableDeposit } from "@/shared/ui";
import {
  ALL_TRANSACTIONS_FILTER,
  matchTransactionFilter,
  transactionFilterOptions,
  type TransactionFilter,
} from "../lib/transaction-options";
import { DepositHistoryStats } from "./DepositHistoryStats";

const ITEMS_PER_PAGE = 10;

export function DepositHistory() {
  const items = useBalanceTransactionsStore((state) => state.items);
  const isLoading = useBalanceTransactionsStore((state) => state.isLoading);
  const isInitialized = useBalanceTransactionsStore(
    (state) => state.isInitialized
  );
  const [currentPage, setCurrentPage] = useState(1);

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const {
    value: filter,
    setValue: setFilter,
    items: filteredItems,
    isActive: isFilterActive,
  } = useFilter<BalanceTransactionType, TransactionFilter>(
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
    <section className="flex w-full flex-col gap-4">
      <DepositHistoryStats items={items} />
      <div className="flex flex-col gap-4">
        <SelectField<TransactionFilter>
          value={filter}
          onChange={setFilter}
          options={transactionFilterOptions}
          label="Тип транзакции"
          className="max-w-xs"
        />

        <TableDeposit
          items={paginatedItems}
          isLoading={isLoading && items.length === 0}
          isInitialized={isInitialized}
          emptyMessage={
            isFilterActive
              ? "Нет операций по выбранному фильтру"
              : "Нет операций для отображения"
          }
        />

        <Pagination
          total={totalItems}
          limit={ITEMS_PER_PAGE}
          page={safeCurrentPage}
          onPageChange={setCurrentPage}
          summaryText="Всего транзакций"
        />
      </div>
    </section>
  );
}
