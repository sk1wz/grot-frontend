import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";
import { DashboardPageFrame } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Банкротства",
};

export default function BankruptcyPage() {
  return (
    <DashboardPageFrame figureSrc="/checksImages/bank-figure.png">
        <CheckFormById configId="bankruptcy" />
        <ChecksHistory module={CheckModule.BANKRUPTCY} />
    </DashboardPageFrame>
  );
}
