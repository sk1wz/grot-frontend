"use client";
import { useEffect } from "react";
import { useBalanceTransactionsStore } from "@/entities/balance";
import {
  DepositHistoryCard,
  Pagination,
  Skeleton,
  Text,
  TextTitle,
} from "@/shared/ui";
import { getBalanceTransactions } from "@/features/balance";

function DepositHistorySkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 rounded-2xl border border-(--border) p-4"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-xl!" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

export function DepositHistoryWidget() {
  const items = useBalanceTransactionsStore((state) => state.items);
  const isLoading = useBalanceTransactionsStore((state) => state.isLoading);
  const total = useBalanceTransactionsStore((state) => state.total);
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
    <section className="mx-auto flex w-full max-w-[1440px] h-full flex-col gap-4">
      <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <TextTitle className="text-2xl font-semibold tracking-tight">
              История операций
            </TextTitle>
            <Text className="text-sm text-(--muted)">
              История всех операций с балансом вашего аккаунта
            </Text>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto h-140">
            {isLoading && !items.length ? (
              <DepositHistorySkeleton />
            ) : (
              items.map((deposit) => (
                <DepositHistoryCard
                  key={deposit.id ?? deposit.createdAt.toString()}
                  amount={deposit.amount}
                  status={deposit.reason}
                  createdAt={deposit.createdAt}
                  action={deposit.meta?.action}
                  id={deposit.id}
                />
              ))
            )}
          </div>
          <Pagination total={total} limit={5} page={1} />
        </div>
      </div>
    </section>
  );
}
