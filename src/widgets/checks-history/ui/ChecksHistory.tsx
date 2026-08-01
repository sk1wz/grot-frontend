"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckModule, getChecks, useChecksStore } from "@/entities/check";
import {
  CheckCard,
  Pagination,
  Skeleton,
  SmartTable,
  Text,
  TextTitle,
} from "@/shared/ui";
import { CheckActions, checkColumns } from "../lib/check-history-column";

const ITEMS_PER_PAGE = 10;

export type ChecksHistoryProps = { module: CheckModule; className?: string };

export function ChecksHistory({ module, className = "" }: ChecksHistoryProps) {
  const items = useChecksStore((state) => state.items);
  const isLoading = useChecksStore((state) => state.isLoading);
  const isInitialized = useChecksStore((state) => state.isInitialized);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredItems = useMemo(
    () => items.filter((check) => check.module === module),
    [items, module]
  );
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

  useEffect(() => {
    const fetchChecks = async () => {
      const response = await getChecks();
      if (response) useChecksStore.getState().setChecks(response);
    };
    fetchChecks();
  }, []);

  return (
    <section className={`flex w-full flex-col gap-4 ${className}`}>
      <TextTitle>История проверок</TextTitle>
      <div className="flex flex-col gap-4">
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
