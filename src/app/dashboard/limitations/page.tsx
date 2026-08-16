import type { Metadata } from "next";
import { DashboardPageFrame } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Ограничения",
};

export default function LimitationsPage() {
  return (
    <DashboardPageFrame wrapperClassName="relative min-h-full overflow-hidden text-(--foreground)">
      <h1 className="text-[24px] leading-none font-medium md:text-[32px]">
        Ограничения
      </h1>
      <p className="mt-8 text-[16px] leading-6 md:text-[18px]">
        Раздел находится в разработке.
      </p>
    </DashboardPageFrame>
  );
}
