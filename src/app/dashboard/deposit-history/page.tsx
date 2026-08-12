import type { Metadata } from "next";
import { DepositHistory } from "@/widgets/deposit-history";
import { DashboardPageFrame } from "@/shared/ui";

export const metadata: Metadata = {
  title: "История транзакций",
  description: "История операций по балансу",
};

export default function DepositHistoryPage() {
  return (
    <DashboardPageFrame figureSrc="/checksImages/deposit-figure.png">
      <DepositHistory />
    </DashboardPageFrame>
  );
}
