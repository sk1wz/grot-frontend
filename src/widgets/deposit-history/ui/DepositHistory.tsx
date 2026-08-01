"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BalanceTransactionStatus,
  BalanceTransactionStatusLabel,
  getBalanceTransactions,
  useBalanceTransactionsStore,
} from "@/entities/balance";
import { filterItems, searchItems } from "@/features/options";
import {
  DepositCard,
  Pagination,
  SearchField,
  SelectField,
  Skeleton,
  SmartTable,
  TextTitle,
} from "@/shared/ui";
import { transactionColumns } from "../lib/transaction-columns";
import { DepositHistoryStats } from "./DepositHistoryStats";

const ITEMS_PER_PAGE = 10;
const ALL_STATUSES = "all";

type StatusFilter = BalanceTransactionStatus | typeof ALL_STATUSES;

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: ALL_STATUSES, label: "Все статусы" },
  ...Object.values(BalanceTransactionStatus).map((status) => ({
    value: status,
    label: BalanceTransactionStatusLabel[status],
  })),
];

export function DepositHistory() {
  const items = useBalanceTransactionsStore((state) => state.items);
  const isLoading = useBalanceTransactionsStore((state) => state.isLoading);
  const isInitialized = useBalanceTransactionsStore(
    (state) => state.isInitialized
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(ALL_STATUSES);

  const filteredItems = useMemo(() => {
    const foundItems = searchItems(items, searchQuery, (transaction, query) =>
      transaction.id.toLowerCase().includes(query)
    );

    return filterItems(
      foundItems,
      statusFilter,
      ALL_STATUSES,
      (transaction, status) => transaction.status === status
    );
  }, [items, searchQuery, statusFilter]);

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const safeCurrentPage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, safeCurrentPage]);
  const showCardsSkeleton = !isInitialized || (isLoading && items.length === 0);
  const showStatsSkeleton = !isInitialized || (isLoading && items.length === 0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await getBalanceTransactions();

      if (response) {
        useBalanceTransactionsStore.getState().setTransactions(response);
      }
    };

    fetchTransactions();
  }, []);

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  function handleStatusChange(value: StatusFilter) {
    setStatusFilter(value);
    setCurrentPage(1);
  }

  return (
    <section className="flex w-full flex-col gap-4">
      <DepositHistoryStats
        items={items}
        isLoading={showStatsSkeleton}
      />
      <TextTitle>История транзакций</TextTitle>
      <div className="flex flex-col gap-4 md:flex-row">
        <SearchField
          id="transaction-id-search"
          label="Поиск по ID"
          placeholder="Введите ID транзакции"
          value={searchQuery}
          onChange={handleSearchChange}
          className="md:max-w-md"
        />
        <SelectField
          id="transaction-status-filter"
          label="Статус"
          value={statusFilter}
          options={statusOptions}
          onChange={handleStatusChange}
          className="md:max-w-xs"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="hidden md:block">
          <SmartTable
            items={paginatedItems}
            columns={transactionColumns}
            getRowKey={(transaction) => transaction.id}
            isLoading={isLoading}
            isInitialized={isInitialized}
            emptyMessage="Нет операций для отображения"
          />
        </div>

        <div className="md:hidden">
          {showCardsSkeleton ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="rounded-lg border border-(--border) p-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-3 h-6 w-24" />
                </div>
              ))}
            </div>
          ) : paginatedItems.length > 0 ? (
            <div className="space-y-3">
              {paginatedItems.map((transaction) => (
                <DepositCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-(--foreground)">
              Нет операций для отображения
            </p>
          )}
        </div>

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
