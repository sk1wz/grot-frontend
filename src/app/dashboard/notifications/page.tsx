import type { Metadata } from "next";
import { Text } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Уведомления",
  description: "Системные уведомления",
};

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Text className="text-(--muted)">
        Пока уведомлений нет. Здесь будут появляться новые системные события.
      </Text>
    </div>
  );
}
