import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";

export const metadata: Metadata = {
  title: "Банкротства",
};

export default function BankruptcyPage() {
  return <ChecksHistory module={CheckModule.BANKRUPTCY} />;
}
