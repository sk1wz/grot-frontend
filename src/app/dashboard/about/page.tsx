import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { DashboardPageFrame } from "@/shared/ui";

export const metadata: Metadata = {
  title: "О сервисе",
};

const benefits = [
  "Все проверки в одном месте",
  "Большое количество реестров",
  "Проверки в один клик",
];

const documents = [
  { title: "Публичная оферта", href: "/dashboard/public-offer" },
  { title: "Политика конфиденциальности", href: "/dashboard/privacy-policy" },
];

export default function AboutPage() {
  return (
    <DashboardPageFrame
      figureSrc="/images/about-figure.png"
      wrapperClassName="relative min-h-full overflow-hidden pb-2 text-(--foreground)"
    >
      <section>
        <h1 className="text-[24px] leading-none font-medium md:text-[32px]">
          О сервисе
        </h1>
        <ul className="mt-8 list-outside list-disc space-y-1 pl-5 text-[14px] leading-6 font-semibold uppercase md:text-[18px]">
          {benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 pt-2" aria-labelledby="documents-title">
        <h2
          id="documents-title"
          className="text-[18px] leading-none font-medium md:text-[24px]"
        >
          Документация
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-[60px]">
          {documents.map((document) => (
            <a
              key={document.title}
              href={document.href}
              className="flex min-h-[54px] items-center justify-between gap-4 rounded-[20px] bg-[#f4f7fa] px-4 py-3 text-[14px] leading-[22px] shadow-[0_4px_5px_#d4ddea] transition-shadow hover:shadow-[0_6px_8px_#c7d2df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3e3c4b] sm:min-h-[70px] md:text-[18px]"
            >
              <span>{document.title}</span>
              <ArrowRight
                className="h-5 w-5 shrink-0"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          ))}
        </div>
      </section>
    </DashboardPageFrame>
  );
}
