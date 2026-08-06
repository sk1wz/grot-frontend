import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Банкротства",
};

export default function BankruptcyPage() {
  return (
    <div className="relative">
      <Image
        src="/checksImages/bank-figure.png"
        width={300}
        height={200}
        alt=""
        loading="eager"
        className="pointer-events-none select-none fixed top-0 right-0"
      />

      <div className="md:border-4 md:p-8 md:border-[#d7e2ed] md:bg-white md:rounded-[100px_40px_100px_40px] relative">
        <CheckFormById configId="bankruptcy" />
        <ChecksHistory module={CheckModule.BANKRUPTCY} />
      </div>
    </div>
  );
}
