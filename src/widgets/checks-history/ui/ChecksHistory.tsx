"use client";

import { useMemo, useState } from "react";
import { type Check, CheckStatus, CheckStatusLabel } from "@/entities/check";
import {
  CheckCard,
  MultiSelectField,
  Pagination,
  SearchField,
  Skeleton,
  SmartTable,
  Text,
  TextTitle,
} from "@/shared/ui";
import { CheckActions, checkColumns } from "../lib/check-history-column";

const ITEMS_PER_PAGE = 5;

export type ChecksHistoryProps = {
  items: Check[];
  isLoading: boolean;
  isInitialized: boolean;
  className?: string;
};

export function ChecksHistory({
  items,
  isLoading,
  isInitialized,
  className = "",
}: ChecksHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [idQuery, setIdQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CheckStatus[]>([]);
  const filteredItems = useMemo(() => {
    const normalizedQuery = idQuery.trim().toLowerCase();

    return items.filter(
      (check) =>
        (!normalizedQuery ||
          check.id.toLowerCase().includes(normalizedQuery)) &&
        (statusFilter.length === 0 || statusFilter.includes(check.status))
    );
  }, [idQuery, items, statusFilter]);
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const safeCurrentPage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, safeCurrentPage]);
  const showCardsSkeleton =
    !isInitialized || (isLoading && paginatedItems.length === 0);

  return (
    <section className={`flex w-full flex-col gap-4 ${className}`}>
      <TextTitle>История проверок</TextTitle>
      <div className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <SearchField
            id="check-id-search"
            label="Поиск по ID"
            placeholder="Введите ID проверки"
            value={idQuery}
            onChange={(value) => {
              setIdQuery(value);
              setCurrentPage(1);
            }}
          />
          <MultiSelectField
            id="check-status-filter"
            label="Статус"
            value={statusFilter}
            options={Object.values(CheckStatus).map((status) => ({
              value: status,
              label: CheckStatusLabel[status],
            }))}
            allLabel="Все статусы"
            onChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="hidden md:block">
          <SmartTable
            items={paginatedItems}
            columns={checkColumns}
            getRowKey={(check) => check.id}
            isLoading={isLoading}
            isInitialized={isInitialized}
            emptyMessage="Нет проверок для отображения"
          />
        </div>
        <div className="md:hidden">
          {showCardsSkeleton ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-(--border) p-3"
                >
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-3 h-6 w-24" />
                </div>
              ))}
            </div>
          ) : paginatedItems.length > 0 ? (
            <div className="space-y-3">
              {paginatedItems.map((check) => (
                <CheckCard
                  key={check.id}
                  check={check}
                  actions={<CheckActions check={check} />}
                />
              ))}
            </div>
          ) : (
            <Text className="py-10 text-center">
              Нет проверок для отображения
            </Text>
          )}
        </div>
        <Pagination
          total={totalItems}
          limit={ITEMS_PER_PAGE}
          page={safeCurrentPage}
          onPageChange={setCurrentPage}
          summaryText="Всего проверок"
          compactOnMobile
        />
      </div>
    </section>
  );
}
