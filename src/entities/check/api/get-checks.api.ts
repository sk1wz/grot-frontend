import { ChecksResponseSchema, useChecksStore } from "../model";
import type { Check } from "../model";
import { baseURL } from "@/shared/api/config";

export async function getChecks(): Promise<Check[] | undefined> {
  try {
    useChecksStore.getState().setLoading(true);

    const response = await fetch(`${baseURL}/checks`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить историю проверок");
    }

    const data = await response.json();
    const parsed = ChecksResponseSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Некорректный ответ сервера");
    }

    return parsed.data;
  } catch {
  } finally {
    const store = useChecksStore.getState();
    store.setLoading(false);
    store.setInitialized(true);
  }
}
