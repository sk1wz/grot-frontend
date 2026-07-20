import {
  BalanceTransactionsResponseSchema,
  useBalanceTransactionsStore,
} from "../model";
import type { BalanceTransactionsResponse } from "../model";
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
    const normalizedData = Array.isArray(data)
      ? { items: data, total: data.length }
      : {
          items: data?.items ?? [],
          total: data?.total ?? data?.items?.length ?? 0,
        };
    const parsed = BalanceTransactionsResponseSchema.safeParse(normalizedData);

    if (!parsed.success) {
      console.error("Balance transactions parse error:", parsed.error);
      throw new Error("Некорректный ответ сервера");
    }

    return {
      items: parsed.data.items,
      total: parsed.data.total ?? parsed.data.items.length,
    };
  } catch (error) {
    console.error("Failed to load balance transactions:", error);
  } finally {
    const store = useBalanceTransactionsStore.getState();
    store.setLoading(false);
    store.setInitialized(true);
  }
}
