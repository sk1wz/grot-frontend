import type { Metadata } from "next";
import { DepositHistory } from "@/widgets/deposit-history";

export const metadata: Metadata = {
  title: "История транзакций",
  description: "История операций по балансу",
};

export default function DepositHistoryPage() {
  return (
    <div className="border-4 p-8 border-[#d7e2ed] rounded-[100px_40px_100px_40px]">
      <DepositHistory />
    </div>
  );
}
