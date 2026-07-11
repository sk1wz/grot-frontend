import type { Metadata } from "next";
import { Text, TextTitle } from "@/shared/ui";

export const metadata: Metadata = {
  title: "История проверок",
  description: "История выполненных проверок",
};

export default function CheckHistoryPage() {
  return (
    <div className=" flex flex-col gap-4">
      <TextTitle className="text-left text-2xl! md:text-3xl!">
        История проверок
      </TextTitle>
      <Text className="text-(--muted)">
        Здесь будет отображаться история ваших проверок.
      </Text>
    </div>
  );
}
