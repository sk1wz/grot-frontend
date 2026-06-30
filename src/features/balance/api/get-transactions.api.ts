import {
  BalanceTransactionsResponseSchema,
  useBalanceTransactionsStore,
} from "@/entities/balance";
import type { BalanceTransactionsResponse } from "@/entities/balance";
import { baseURL } from "@/shared/api/config";

export async function getBalanceTransactions(): Promise<
  BalanceTransactionsResponse | undefined
> {
  try {
    useBalanceTransactionsStore.getState().setLoading(true);
    const response = await fetch(`${baseURL}/balance/transactions`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить историю операций");
    }

    const data = await response.json();
    const parsed = BalanceTransactionsResponseSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Некорректный ответ сервера");
    }

    return parsed.data;
  } catch {
  } finally {
    useBalanceTransactionsStore.getState().setLoading(false);
  }
}
