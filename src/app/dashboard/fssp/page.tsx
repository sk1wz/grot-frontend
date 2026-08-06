import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";

export const metadata: Metadata = {
  title: "ФССП",
};

export default function FsspPage() {
  return (
    <div className="border-4 p-10 border-[#d7e2ed] rounded-[100px_40px_100px_40px]">
      <CheckFormById configId="fssp" />
      <ChecksHistory module={CheckModule.FSSP} />
    </div>
  );
}
