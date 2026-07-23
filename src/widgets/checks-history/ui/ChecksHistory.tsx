"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckModule, getChecks, useChecksStore } from "@/entities/check";
import { Pagination, TableCheck } from "@/shared/ui";

const ITEMS_PER_PAGE = 10;

export type ChecksHistoryProps = {
  module: CheckModule;
  className?: string;
};

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

  useEffect(() => {
    const fetchChecks = async () => {
      const response = await getChecks();
      if (response) {
        useChecksStore.getState().setChecks(response);
      }
    };

    fetchChecks();
  }, []);

  return (
    <section className={`flex w-full flex-col gap-4 ${className}`}>
      <div className="border border-(--border) bg-(--surface) p-4">
        <div className="flex flex-col gap-4">
          <TableCheck
            items={paginatedItems}
            isLoading={isLoading && items.length === 0}
            isInitialized={isInitialized}
            emptyMessage="Нет проверок для отображения"
          />

          <Pagination
            total={totalItems}
            limit={ITEMS_PER_PAGE}
            page={safeCurrentPage}
            onPageChange={setCurrentPage}
            summaryText="Всего проверок"
          />
        </div>
      </div>
    </section>
  );
}
