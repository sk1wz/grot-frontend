"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getBalanceTransactions,
  useBalanceTransactionsStore,
} from "@/entities/balance";
import { Pagination, SmartTable, TextTitle } from "@/shared/ui";
import { transactionColumns } from "../lib/transaction-columns";
import { DepositHistoryStats } from "./DepositHistoryStats";

const ITEMS_PER_PAGE = 10;

export function DepositHistory() {
  const items = useBalanceTransactionsStore((state) => state.items);
  const isLoading = useBalanceTransactionsStore((state) => state.isLoading);
  const isInitialized = useBalanceTransactionsStore(
    (state) => state.isInitialized
  );
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const safeCurrentPage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [items, safeCurrentPage]);

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
      <TextTitle>История транзакций</TextTitle>
      <div className="flex flex-col gap-4">
        <SmartTable
          items={paginatedItems}
          columns={transactionColumns}
          getRowKey={(transaction) => transaction.id}
          isLoading={isLoading}
          isInitialized={isInitialized}
          emptyMessage="Нет операций для отображения"
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
