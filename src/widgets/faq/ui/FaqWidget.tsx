"use client";

import { ChevronDown } from "lucide-react";
import { Text, TextTitle } from "@/shared/ui";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqWidgetProps = {
  items: FaqItem[];
  title?: string;
};

export function FaqWidget({ items, title = "FAQ" }: FaqWidgetProps) {
  return (
    <section className="mx-auto w-full max-w-[1440px] rounded-4xl border border-(--border) bg-(--surface) p-6 md:p-8">
      <div className="flex flex-col gap-4">
        <TextTitle className="text-2xl font-semibold tracking-tight">
          {title}
        </TextTitle>

        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-(--border) bg-(--surface) p-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <Text className="text-sm font-semibold">{item.question}</Text>
                <ChevronDown className="h-4 w-4 shrink-0 text-(--muted) transition-transform group-open:rotate-180" />
              </summary>

              <Text className="mt-3 block text-sm text-(--muted)">
                {item.answer}
              </Text>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
