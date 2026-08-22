"use client";
import { connectRealtime } from "@/shared/api/connectRealTime";
import { UserProvider } from "../UserProvider/UserProvider";
import { useUserStore, type UserType } from "@/entities/user";
import { useEffect } from "react";
import {
  BalanceTransactionType,
  useBalanceTransactionsStore,
} from "@/entities/balance";
import {
  CheckModule,
  CheckSchema,
  BatchCheckSchema,
  useBankruptcyChecksStore,
  useFsspChecksStore,
  useGibddChecksStore,
  useGistorgiChecksStore,
  useLimitationChecksStore,
  useInnChecksStore,
  useTaxiChecksStore,
  useGibddBatchChecksStore,
  useFsspBatchChecksStore,
  useGistorgiBatchChecksStore,
  useLimitationBatchChecksStore,
  useBankruptcyBatchChecksStore,
  useInnBatchChecksStore,
  useTaxiBatchChecksStore,
} from "@/entities/check";

function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const userId = useUserStore((state) => state.user?.id);

  useEffect(() => {
    if (!userId) {
      useGibddChecksStore.getState().reset();
      useFsspChecksStore.getState().reset();
      useGistorgiChecksStore.getState().reset();
      useLimitationChecksStore.getState().reset();
      useBankruptcyChecksStore.getState().reset();
      useInnChecksStore.getState().reset();
      useTaxiChecksStore.getState().reset();
      useGibddBatchChecksStore.getState().reset();
      useFsspBatchChecksStore.getState().reset();
      useGistorgiBatchChecksStore.getState().reset();
      useLimitationBatchChecksStore.getState().reset();
      useBankruptcyBatchChecksStore.getState().reset();
      useInnBatchChecksStore.getState().reset();
      useTaxiBatchChecksStore.getState().reset();
      return;
    }

    const sockets = connectRealtime(userId);

    sockets.check.on("check.updated", (checkDto) => {
      const parsed = CheckSchema.safeParse(checkDto);
      if (!parsed.success) return;

      switch (parsed.data.module) {
        case CheckModule.GIBDD:
          useGibddChecksStore.getState().upsertCheck(parsed.data);
          break;
        case CheckModule.FSSP:
          useFsspChecksStore.getState().upsertCheck(parsed.data);
          break;
        case CheckModule.GISTORGI:
          useGistorgiChecksStore.getState().upsertCheck(parsed.data);
          break;
        case CheckModule.LIMITATION:
          useLimitationChecksStore.getState().upsertCheck(parsed.data);
          break;
        case CheckModule.BANKRUPTCY:
          useBankruptcyChecksStore.getState().upsertCheck(parsed.data);
          break;
        case CheckModule.INN:
          useInnChecksStore.getState().upsertCheck(parsed.data);
          break;
        case CheckModule.TAXI:
          useTaxiChecksStore.getState().upsertCheck(parsed.data);
          break;
      }
    });

    sockets.batch.on("batch.updated", (batchDto) => {
      const parsed = BatchCheckSchema.safeParse(batchDto);
      if (!parsed.success) return;

      switch (parsed.data.module) {
        case CheckModule.GIBDD:
          useGibddBatchChecksStore.getState().upsertBatch(parsed.data);
          break;
        case CheckModule.FSSP:
          useFsspBatchChecksStore.getState().upsertBatch(parsed.data);
          break;
        case CheckModule.GISTORGI:
          useGistorgiBatchChecksStore.getState().upsertBatch(parsed.data);
          break;
        case CheckModule.LIMITATION:
          useLimitationBatchChecksStore.getState().upsertBatch(parsed.data);
          break;
        case CheckModule.BANKRUPTCY:
          useBankruptcyBatchChecksStore.getState().upsertBatch(parsed.data);
          break;
        case CheckModule.INN:
          useInnBatchChecksStore.getState().upsertBatch(parsed.data);
          break;
        case CheckModule.TAXI:
          useTaxiBatchChecksStore.getState().upsertBatch(parsed.data);
          break;
      }
    });

    sockets.balance.on("balance.updated", (payload: unknown) => {
      const { user, setUser } = useUserStore.getState();
      const { setTransaction } = useBalanceTransactionsStore.getState();

      if (!user) return;

      const status = (payload as { transaction: BalanceTransactionType })
        .transaction.status;
      setTransaction({
        ...(payload as { transaction: BalanceTransactionType }).transaction,
        status: status,
      });
      setUser({
        ...user,
        balance: (payload as { balance: number }).balance ?? 0,
      });
    });

    return () => {
      sockets.check.disconnect();
      sockets.batch.disconnect();
      sockets.balance.disconnect();
    };
  }, [userId]);

  return children;
}

export const MainProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserType | null;
}) => {
  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
      <UserProvider initialUser={initialUser}>
        <RealtimeProvider>{children}</RealtimeProvider>
      </UserProvider>
    </div>
  );
};
