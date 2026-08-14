"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckModule,
  CheckStatus,
  CheckStatusLabel,
  getBankruptcyChecks,
  getFsspChecks,
  getGibddChecks,
  getGistorgiChecks,
  getInnChecks,
  useBankruptcyChecksStore,
  useFsspChecksStore,
  useGibddChecksStore,
  useGistorgiChecksStore,
  useInnChecksStore,
} from "@/entities/check";
import {
  CheckCard,
  Pagination,
  SearchField,
  Select,
  Skeleton,
  SmartTable,
  Text,
  TextTitle,
} from "@/shared/ui";
import { CheckActions, checkColumns } from "../lib/check-history-column";

const ITEMS_PER_PAGE = 5;

export type ChecksHistoryProps = { module: CheckModule; className?: string };

export function ChecksHistory({ module, className = "" }: ChecksHistoryProps) {
  const gibddState = useGibddChecksStore();
  const fsspState = useFsspChecksStore();
  const gistorgiState = useGistorgiChecksStore();
  const bankruptcyState = useBankruptcyChecksStore();
  const innState = useInnChecksStore();
  const source =
    module === CheckModule.GIBDD
      ? gibddState
      : module === CheckModule.FSSP
        ? fsspState
        : module === CheckModule.GISTORGI
          ? gistorgiState
          : module === CheckModule.BANKRUPTCY
            ? bankruptcyState
            : innState;
  const { items, isLoading, isInitialized } = source;
  const [currentPage, setCurrentPage] = useState(1);
  const [idQuery, setIdQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CheckStatus | "">("");
  const filteredItems = useMemo(() => {
    const normalizedQuery = idQuery.trim().toLowerCase();

    return items.filter(
      (check) =>
        (!normalizedQuery ||
          check.id.toLowerCase().includes(normalizedQuery)) &&
        (!statusFilter || check.status === statusFilter)
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

  useEffect(() => {
    const fetchChecks = async () => {
      if (module === CheckModule.GIBDD) {
        const checks = await getGibddChecks();
        if (checks) useGibddChecksStore.getState().setChecks(checks);
      } else if (module === CheckModule.FSSP) {
        const checks = await getFsspChecks();
        if (checks) useFsspChecksStore.getState().setChecks(checks);
      } else if (module === CheckModule.GISTORGI) {
        const checks = await getGistorgiChecks();
        if (checks) useGistorgiChecksStore.getState().setChecks(checks);
      } else if (module === CheckModule.BANKRUPTCY) {
        const checks = await getBankruptcyChecks();
        if (checks) useBankruptcyChecksStore.getState().setChecks(checks);
      } else {
        const checks = await getInnChecks();
        if (checks) useInnChecksStore.getState().setChecks(checks);
      }
    };
    fetchChecks();
  }, [module]);

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
          <label className="flex w-full flex-col gap-2 text-sm font-medium text-(--foreground)">
            Статус
            <Select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value as CheckStatus | "");
                setCurrentPage(1);
              }}
            >
              <option value="">Все статусы</option>
              {Object.values(CheckStatus).map((status) => (
                <option key={status} value={status}>
                  {CheckStatusLabel[status]}
                </option>
              ))}
            </Select>
          </label>
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
