"use client";

import { useMemo, useState } from "react";
import {
  type BatchCheck,
  type ChecksHistoryItem,
  CheckStatus,
  CheckStatusLabel,
  isBatchCheck,
} from "@/entities/check";
import {
  CheckCard,
  MultiSelectField,
  Pagination,
  SearchField,
  Skeleton,
  SmartTable,
  Tabs,
  Text,
  TextTitle,
} from "@/shared/ui";
import {
  BatchDownloadAction,
  CheckActions,
  checkColumns,
} from "../lib/check-history-column";

const ITEMS_PER_PAGE = 5;
type HistoryView = "single" | "batch";
const historyTabs = [
  { value: "single", label: "Одиночные" },
  { value: "batch", label: "Пакетные" },
] as const;

export type ChecksHistoryProps = {
  items: ChecksHistoryItem[];
  batches: BatchCheck[];
  isLoading: boolean;
  isInitialized: boolean;
  isBatchesLoading: boolean;
  areBatchesInitialized: boolean;
  className?: string;
};

export function ChecksHistory({
  items,
  batches,
  isLoading,
  isInitialized,
  isBatchesLoading,
  areBatchesInitialized,
  className = "",
}: ChecksHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CheckStatus[]>([]);
  const [view, setView] = useState<HistoryView>("single");
  const displayedItems = view === "single" ? items : batches;
  const currentIsLoading = view === "single" ? isLoading : isBatchesLoading;
  const currentIsInitialized =
    view === "single" ? isInitialized : areBatchesInitialized;
  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return displayedItems.filter(
      (check) =>
        (!normalizedQuery ||
          check.id.toLowerCase().includes(normalizedQuery) ||
          check.subjectBodyText.toLowerCase().includes(normalizedQuery)) &&
        (statusFilter.length === 0 || statusFilter.includes(check.status)),
    );
  }, [displayedItems, searchQuery, statusFilter]);
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, safeCurrentPage]);
  const showCardsSkeleton =
    !currentIsInitialized ||
    (currentIsLoading && paginatedItems.length === 0);

  return (
    <section className={`flex w-full flex-col gap-4 ${className}`}>
      <TextTitle>История проверок</TextTitle>
      <div className="flex flex-col gap-4">
        <Tabs
          value={view}
          options={historyTabs}
          onChange={(nextView) => {
            setView(nextView);
            setCurrentPage(1);
          }}
        />
        <div className="grid gap-3 lg:grid-cols-2">
          <SearchField
            id="check-search"
            label="Поиск"
            placeholder="ID или текст запроса"
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
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
            isLoading={currentIsLoading}
            isInitialized={currentIsInitialized}
            emptyMessage="Нет проверок для отображения"
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
              {paginatedItems.map((check) => (
                <CheckCard
                  key={check.id}
                  check={check}
                  actions={
                    isBatchCheck(check) ? (
                      <BatchDownloadAction batch={check} />
                    ) : (
                      <CheckActions check={check} />
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <Text className="py-10 text-center">Нет проверок для отображения</Text>
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
