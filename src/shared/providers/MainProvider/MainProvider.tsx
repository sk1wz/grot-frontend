"use client";
import { connectRealtime } from "@/shared/api/connectRealTime";
import { UserProvider } from "../UserProvider/UserProvider";
import { useUserStore } from "@/entities/user";
import { useEffect } from "react";
import {
  BalanceTransactionType,
  useBalanceTransactionsStore,
} from "@/entities/balance";
import { CheckSchema, useChecksStore } from "@/entities/check";
import { playSound } from "@/shared/lib";

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const userId = useUserStore((state) => state.user?.id);

  useEffect(() => {
    if (!userId) {
      useChecksStore.getState().reset();
      return;
    }

    const sockets = connectRealtime(userId);

    sockets.check.on("check.updated", (checkDto) => {
      const parsed = CheckSchema.safeParse(checkDto);

      if (!parsed.success) return;

      useChecksStore.getState().upsertCheck(parsed.data);
      playSound("/notify-sound.mp3");
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

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
      <UserProvider>{children}</UserProvider>
    </div>
  );
};
