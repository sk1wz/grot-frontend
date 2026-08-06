import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ГИС торги",
};

export default function GisTorgiPage() {
  return (
    <div className="relative">
      <Image
        src="/checksImages/torgi-figure.png"
        width={300}
        height={200}
        alt=""
        loading="eager"
        className="pointer-events-none select-none fixed top-0 right-0"
      />

      <div className="border-4 p-8 border-[#d7e2ed] bg-white rounded-[100px_40px_100px_40px] relative">
        <CheckFormById configId="gistorgi" />
        <ChecksHistory module={CheckModule.GISTORGI} />
      </div>
    </div>
  );
}
