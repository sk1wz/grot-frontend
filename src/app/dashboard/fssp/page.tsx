import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";
import { DashboardPageFrame } from "@/shared/ui";

export const metadata: Metadata = {
  title: "ФССП",
};

export default function FsspPage() {
  return (
    <DashboardPageFrame figureSrc="/checksImages/fssp-figure.png">
        <CheckFormById configId="fssp" />
        <ChecksHistory module={CheckModule.FSSP} />
    </DashboardPageFrame>
  );
}
