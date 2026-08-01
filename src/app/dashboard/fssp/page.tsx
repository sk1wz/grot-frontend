import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";

export const metadata: Metadata = {
  title: "ФССП",
};

export default function FsspPage() {
  return (
    <>
      <CheckFormById configId="fssp" />
      <ChecksHistory module={CheckModule.FSSP} />
    </>
  );
}
