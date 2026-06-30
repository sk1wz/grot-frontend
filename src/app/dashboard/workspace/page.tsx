import type { Metadata } from "next";
import { ChecksWidget } from "@/widgets/checks";

export const metadata: Metadata = {
  title: "Проверки",
  description: "Проверки",
};

export default function DashboardWorkspacePage() {
  return <ChecksWidget />;
}
