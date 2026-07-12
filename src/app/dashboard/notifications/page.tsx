import type { Metadata } from "next";
import { NotificationsList } from "@/widgets/notifications";

export const metadata: Metadata = {
  title: "Уведомления",
  description: "Системные уведомления",
};

export default function NotificationsPage() {
  return <NotificationsList />;
}
