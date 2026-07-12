"use client";
import { connectRealtime } from "@/shared/api/connectRealTime";
import { UserProvider } from "../UserProvider/UserProvider";
import { useUserStore } from "@/entities/user";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  BalanceTransactionStatus,
  useBalanceTransactionsStore,
} from "@/entities/balance";
import {
  CheckSchema,
  CheckStatus,
  getCheckModuleLabel,
  getCheckStatusLabel,
  useChecksStore,
} from "@/entities/check";
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
      useChecksStore.getState().reset();
      return;
    }

    const sockets = connectRealtime(userId);

    sockets.check.on("check.updated", (checkDto) => {
      const parsed = CheckSchema.safeParse(checkDto);
      if (!parsed.success) return;

      useChecksStore.getState().upsertCheck(parsed.data);
      playSound("/notify-sound.mp3");

      const moduleLabel = getCheckModuleLabel(parsed.data.module);
      const statusLabel = getCheckStatusLabel(parsed.data.status);
      const isSuccess = parsed.data.status === CheckStatus.DONE;

      toast.info(
        <div className="flex flex-col gap-1 pr-2">
          <span className="text-sm font-semibold">
            {isSuccess ? "Проверка завершена" : "Проверка не выполнена"}
          </span>
          <span className="text-sm">
            {moduleLabel} · {statusLabel}
          </span>
        </div>,
        {
          toastId: parsed.data.id,
          autoClose: 5000,
        }
      );
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
