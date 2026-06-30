import type { Metadata } from "next";
import { DepositHistoryWidget } from "@/widgets/deposit-history";

export const metadata: Metadata = {
  title: "История операций",
  description: "История пополнений баланса",
};

export default function DashboardDepositHistoryPage() {
  return <DepositHistoryWidget />;
}
