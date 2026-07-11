import type { Metadata } from "next";
import { ChecksGrid } from "@/features/checker";

export const metadata: Metadata = {
  title: "Проверки",
  description: "Доступные проверки",
};

export default function DashboardPage() {
  return (
    <div>
      <ChecksGrid />
    </div>
  );
}
