import type { Metadata } from "next";
import { DepositHistory } from "@/widgets/dashboard/deposit-history";

export const metadata: Metadata = {
  title: "История транзакций",
  description: "История операций по балансу",
};

export default function DepositHistoryPage() {
  return <DepositHistory />;
}
