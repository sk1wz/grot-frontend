import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ГИБДД",
};

export default function GibddPage() {
  return (
    <div className="relative">
      <Image
        src="/checksImages/gibdd-figure.png"
        width={300}
        height={200}
        alt=""
        loading="eager"
        className="pointer-events-none select-none fixed -top-[2%] right-[18%]"
      />

      <div className="border-4 p-8 border-[#d7e2ed] bg-white rounded-[100px_40px_100px_40px] relative">
        <CheckFormById configId="gibdd" />
        <ChecksHistory module={CheckModule.GIBDD} />
      </div>
    </div>
  );
}
