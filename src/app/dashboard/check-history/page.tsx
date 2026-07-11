import type { Metadata } from "next";
import { Text } from "@/shared/ui";

export const metadata: Metadata = {
  title: "История проверок",
  description: "История выполненных проверок",
};

export default function CheckHistoryPage() {
  return (
    <div className=" flex flex-col gap-4">
      <Text className="text-(--muted)">
        Здесь будет отображаться история ваших проверок.
      </Text>
    </div>
  );
}
