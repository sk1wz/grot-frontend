"use client";

import { Check } from "lucide-react";
import { FeedbackForm } from "@/features/feedback";
import { DashboardPageFrame } from "@/shared/ui";

export default function SupportPage() {
  return (
    <DashboardPageFrame
      figureSrc="/images/slitok.png"
      figureClassName="pointer-events-none fixed top-0 right-0 z-0 hidden select-none lg:block"
      wrapperClassName="relative min-h-full overflow-hidden"
      className="relative z-10 bg-white p-5 text-[#3e3c4b] md:rounded-[70px_10px_70px_10px] md:border-4 md:border-[#c9d5e5]/40 md:p-10"
    >
      <h1 className="text-2xl font-medium md:text-[32px]">Поддержка</h1>
      <section className="mt-8">
        <h2 className="text-xl font-medium md:text-2xl">
          Форма обратной связи
        </h2>
        <p className="mt-4 flex gap-3 text-lg leading-6">
          <Check className="mt-0.5 size-5 shrink-0" />
          Ваше сообщение будет отправлено на почту поддержки. В среднем ответ
          занимает 24 часа.
        </p>
        <FeedbackForm />
      </section>
    </DashboardPageFrame>
  );
}
