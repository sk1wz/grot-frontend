"use client";

import { ClipboardList } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getChecks, useChecksStore, type Check } from "@/entities/check";
import { Pagination, Skeleton, Text } from "@/shared/ui";
import { CheckHistoryRow } from "./CheckHistoryRow";
import { CheckResultModal } from "./CheckResultModal";

const ITEMS_PER_PAGE = 10;

function CheckHistorySkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index}>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-2 h-3 w-24" />
          </td>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-4 w-28" />
          </td>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-4 w-full max-w-md" />
          </td>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-6 w-24 rounded-full" />
          </td>
          <td className="border-b border-(--border) px-4 py-3">
            <Skeleton className="h-8 w-20" />
          </td>
        </tr>
      ))}
    </>
  );
}

function CheckHistoryEmptyState() {
  return (
    <tr>
      <td colSpan={5} className="px-4 py-14">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-(--field) text-(--muted)">
            <ClipboardList className="size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <Text className="text-sm font-medium text-(--foreground)">
              История проверок пуста
            </Text>
            <Text className="max-w-sm text-sm text-(--muted)">
              Запустите проверку на главной странице — она появится здесь
            </Text>
          </div>
        </div>
      </td>
    </tr>
  );
}

export function CheckHistory() {
  const items = useChecksStore((state) => state.items);
  const isLoading = useChecksStore((state) => state.isLoading);
  const isInitialized = useChecksStore((state) => state.isInitialized);
  const showSkeleton = !isInitialized || (isLoading && items.length === 0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCheck, setSelectedCheck] = useState<Check | null>(null);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const safeCurrentPage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [items, safeCurrentPage]);

  useEffect(() => {
    const fetchChecks = async () => {
      const checks = await getChecks();
      if (checks) {
        useChecksStore.getState().setChecks(checks);
      }
    };

    void fetchChecks();
  }, []);

  const handleViewResult = (check: Check) => {
    setSelectedCheck(check);
  };

  return (
    <>
      <section className="flex w-full flex-col gap-4">
        <div className="border border-(--border) bg-(--surface) p-4">
          <div className="flex flex-col gap-4">
            <div className="overflow-x-auto border border-(--border) [scrollbar-gutter:stable]">
              <table className="w-full min-w-[980px] table-fixed border-collapse text-left">
                <colgroup>
                  <col className="w-[18%]" />
                  <col className="w-[14%]" />
                  <col className="w-[36%]" />
                  <col className="w-[14%]" />
                  <col className="w-[10%]" />
                </colgroup>
                <thead className="sticky top-0 z-10 bg-(--surface)">
                  <tr>
                    <th className="border-b border-(--border) bg-(--surface) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--muted)">
                      Дата / время
                    </th>
                    <th className="border-b border-(--border) bg-(--surface) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--muted)">
                      Тип проверки
                    </th>
                    <th className="border-b border-(--border) bg-(--surface) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--muted)">
                      Subject
                    </th>
                    <th className="border-b border-(--border) bg-(--surface) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--muted)">
                      Статус
                    </th>
                    <th className="border-b border-(--border) bg-(--surface) px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--muted)">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {showSkeleton ? (
                    <CheckHistorySkeletonRows />
                  ) : paginatedItems.length ? (
                    paginatedItems.map((check) => (
                      <CheckHistoryRow
                        key={check.id}
                        check={check}
                        onViewResult={handleViewResult}
                      />
                    ))
                  ) : (
                    <CheckHistoryEmptyState />
                  )}
                </tbody>
              </table>
            </div>

            {!showSkeleton && items.length > 0 ? (
              <Pagination
                total={totalItems}
                limit={ITEMS_PER_PAGE}
                page={safeCurrentPage}
                onPageChange={setCurrentPage}
                summaryText="Всего проверок"
              />
            ) : null}
          </div>
        </div>
      </section>

      <CheckResultModal
        isOpen={selectedCheck != null}
        checkId={selectedCheck?.id}
        result={selectedCheck?.result ?? null}
        onClose={() => setSelectedCheck(null)}
      />
    </>
  );
}
