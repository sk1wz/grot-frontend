import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";

export const metadata: Metadata = {
  title: "Банкротства",
};

export default function BankruptcyPage() {
  return (
    <>
      <CheckFormById configId="bankruptcy" />
      <ChecksHistory module={CheckModule.BANKRUPTCY} />
    </>
  );
}
