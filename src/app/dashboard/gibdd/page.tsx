import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";
import { DashboardPageFrame } from "@/shared/ui";

export const metadata: Metadata = {
  title: "ГИБДД",
};

export default function GibddPage() {
  return (
    <DashboardPageFrame figureSrc="/checksImages/gibdd-figure.png">
        <CheckFormById configId="gibdd" />
        <ChecksHistory module={CheckModule.GIBDD} />
    </DashboardPageFrame>
  );
}
