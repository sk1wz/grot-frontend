"use client";
import { connectRealtime } from "@/shared/api/connectRealTime";
import { UserProvider } from "../UserProvider/UserProvider";
import { useUserStore } from "@/entities/user";
import { useEffect } from "react";
import {
  BalanceTransactionStatus,
  useBalanceTransactionsStore,
} from "@/entities/balance";
import {
  NotificationSchema,
  syncNotifications,
  useNotificationsStore,
} from "@/entities/notification";
import { playSound } from "@/shared/lib";

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
    if (!userId) {
      return;
    }

    void syncNotifications();

    const sockets = connectRealtime(userId);

    sockets.check.on("check.updated", (checkDto) => {
      console.log(checkDto);
    });
    sockets.balance.on("balance.updated", (payload: BalanceUpdatedPayload) => {
      const { user, setUser } = useUserStore.getState();
      const { setTransaction } = useBalanceTransactionsStore.getState();
      if (!user) return;

      const rawReason = payload.transaction.status;
      const normalizedReason = Object.values(BalanceTransactionStatus).includes(
        rawReason as BalanceTransactionStatus
      )
        ? (rawReason as BalanceTransactionStatus)
        : BalanceTransactionStatus.BALANCE_FAILED;

      setTransaction({
        ...payload.transaction,
        status: normalizedReason,
      });
      setUser({ ...user, balance: payload.balance });
      console.log(payload);
    });
    sockets.notifications.on("notification.updated", (notification) => {
      const parsed = NotificationSchema.safeParse(notification);
      if (!parsed.success) return;

      useNotificationsStore.getState().upsertNotification(parsed.data);

      if (parsed.data.isRead) return;

      playSound("/notify-sound.mp3");
    });

    return () => {
      sockets.check.disconnect();
      sockets.balance.disconnect();
      sockets.notifications.disconnect();
    };
  }, [userId]);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <UserProvider>{children}</UserProvider>
    </div>
  );
};
