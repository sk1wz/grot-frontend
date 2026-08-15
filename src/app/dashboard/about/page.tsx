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
  { title: "Публичная оферта", href: "/public-offer" },
  { title: "Политика конфиденциальности", href: "/privacy-policy" },
];

export default function AboutPage() {
  return (
    <DashboardPageFrame
      as="main"
      figureSrc="/images/about-figure.png"
      figurePriority
      figureClassName="pointer-events-none fixed top-0 right-0 z-0 hidden h-[270px] w-[300px] object-cover opacity-50 select-none lg:block"
      wrapperClassName="relative min-h-full overflow-hidden pb-2 text-(--foreground)"
      className="relative z-10 flex min-h-[430px] w-full flex-col gap-9 bg-white px-5 pt-10 pb-20 sm:px-10 md:rounded-[70px_10px_70px_10px] md:border-[5px] md:border-[rgba(201,213,229,0.4)]"
    >
      <section>
        <h1 className="text-[32px] leading-none font-medium">О сервисе</h1>
        <ul className="mt-8 space-y-1 pl-[27px] text-[18px] leading-6 font-semibold uppercase">
          {benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </section>

      <section className="mt-auto pt-2" aria-labelledby="documents-title">
        <h2
          id="documents-title"
          className="text-[24px] leading-none font-medium"
        >
          Документация
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-[60px]">
          {documents.map((document) => (
            <a
              key={document.title}
              href={document.href}
              className="flex min-h-[70px] items-center justify-between gap-4 rounded-[20px] bg-[#f4f7fa] px-4 py-3 text-[18px] leading-[22px] shadow-[0_4px_5px_#d4ddea] transition-shadow hover:shadow-[0_6px_8px_#c7d2df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3e3c4b]"
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
