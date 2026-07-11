import type { Metadata } from "next";
import { Text, TextTitle } from "@/shared/ui";

export const metadata: Metadata = {
  title: "История транзакций",
  description: "История операций по балансу",
};

export default function DepositHistoryPage() {
  return (
    <div className="flex flex-col gap-4">
      <TextTitle className="text-left text-2xl! md:text-3xl!">
        История транзакций
      </TextTitle>
      <Text className="text-(--muted)">
        Здесь будет отображаться история пополнений и списаний с баланса.
      </Text>
    </div>
  );
}
