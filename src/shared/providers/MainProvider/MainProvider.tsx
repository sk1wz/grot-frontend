"use client";
import { connectRealtime } from "@/shared/api/connectRealTime";
import { UserProvider } from "../UserProvider/UserProvider";
import { useUserStore, type UserType } from "@/entities/user";
import { useEffect } from "react";
import {
  BalanceTransactionType,
  useBalanceTransactionsStore,
} from "@/entities/balance";
import { CheckSchema, useChecksStore } from "@/entities/check";

function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const userId = useUserStore((state) => state.user?.id);

  useEffect(() => {
    if (!userId) {
      useChecksStore.getState().reset();
      return;
    }

    const sockets = connectRealtime(userId);

    sockets.check.on("check.updated", (checkDto) => {
      console.log(checkDto);
      const parsed = CheckSchema.safeParse(checkDto);
      if (!parsed.success) return;

      useChecksStore.getState().upsertCheck(parsed.data);
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
