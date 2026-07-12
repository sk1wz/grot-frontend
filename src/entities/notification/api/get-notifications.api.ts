import { NotificationsResponseSchema, useNotificationsStore } from "../model";
import type { Notification } from "../model";
import { baseURL } from "@/shared/api/config";

export async function getNotifications(): Promise<Notification[] | undefined> {
  try {
    useNotificationsStore.getState().setLoading(true);

    const response = await fetch(`${baseURL}/notifications`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить уведомления");
    }

    const data = await response.json();
    const parsed = NotificationsResponseSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Некорректный ответ сервера");
    }

    return parsed.data;
  } catch {
  } finally {
    const store = useNotificationsStore.getState();
    store.setLoading(false);
    store.setInitialized(true);
  }
}

export async function syncNotifications(): Promise<void> {
  const notifications = await getNotifications();
  if (notifications) {
    useNotificationsStore.getState().setNotifications(notifications);
  }
}
