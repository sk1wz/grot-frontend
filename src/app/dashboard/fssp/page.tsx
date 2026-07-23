import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";

export const metadata: Metadata = {
  title: "ФССП",
};

export default function FsspPage() {
  return <ChecksHistory module={CheckModule.FSSP} />;
}
