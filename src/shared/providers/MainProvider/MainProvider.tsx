"use client";
import { connectRealtime } from "@/shared/api/connectRealTime";
import { UserProvider } from "../UserProvider/UserProvider";
import { useUserStore } from "@/entities/user";
import { useEffect } from "react";
import {
  BalanceChangeReason,
  useBalanceTransactionsStore,
} from "@/entities/balance";

type BalanceUpdatedPayload = {
  balance: number;
  transaction: {
    id: string;
    userId: string;
    amount: number;
    status?: string;
    meta?: { action?: string };
    createdAt: string;
  };
};

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const userId = useUserStore((state) => state.user?.id);

  useEffect(() => {
    if (userId) {
      const sockets = connectRealtime(userId);

      sockets.check.on("check.updated", (checkDto) => {
        console.log(checkDto);
      });
      sockets.balance.on(
        "balance.updated",
        (payload: BalanceUpdatedPayload) => {
          const { user, setUser } = useUserStore.getState();
          const { setTransaction } = useBalanceTransactionsStore.getState();
          if (!user) return;

          const rawReason = payload.transaction.status;
          const normalizedReason = Object.values(BalanceChangeReason).includes(
            rawReason as BalanceChangeReason
          )
            ? (rawReason as BalanceChangeReason)
            : BalanceChangeReason.BALANCE_FAILED;

          setTransaction({
            ...payload.transaction,
            status: normalizedReason,
          });
          setUser({ ...user, balance: payload.balance });
          console.log(payload);
        }
      );
      sockets.notifications.on("notification.created", (notification) => {
        console.log(notification);
      });
      return () => {
        sockets.check.disconnect();
        sockets.balance.disconnect();
        sockets.notifications.disconnect();
      };
    }
  }, [userId]);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <UserProvider>{children}</UserProvider>
    </div>
  );
};
