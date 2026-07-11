import type { Metadata } from "next";
import { Text } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Статистика",
  description: "Статистика проверок и использования",
};

export default function StatisticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Text className="text-(--muted)">
        Здесь будет отображаться статистика по проверкам и активности.
      </Text>
    </div>
  );
}
