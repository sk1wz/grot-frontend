import type { Metadata } from "next";
import { DepositHistory } from "@/widgets/deposit-history";
import Image from "next/image";

export const metadata: Metadata = {
  title: "История транзакций",
  description: "История операций по балансу",
};

export default function DepositHistoryPage() {
  return (
    <div className="relative">
      <Image
        src="/checksImages/deposit-figure.png"
        width={300}
        height={200}
        alt=""
        loading="eager"
        className="pointer-events-none select-none fixed top-0 right-0"
      />

      <div className="md:border-4 md:p-8 md:border-[#d7e2ed] md:bg-white md:rounded-[100px_40px_100px_40px] relative">
        <DepositHistory />
      </div>
    </div>
  );
}
