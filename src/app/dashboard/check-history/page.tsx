import type { Metadata } from "next";
import { CheckHistory } from "@/widgets/check-history";

export const metadata: Metadata = {
  title: "История проверок",
  description: "История выполненных проверок",
};

export default function CheckHistoryPage() {
  return <CheckHistory />;
}
