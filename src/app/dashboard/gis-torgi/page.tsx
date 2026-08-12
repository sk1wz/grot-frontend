import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";
import { DashboardPageFrame } from "@/shared/ui";

export const metadata: Metadata = {
  title: "ГИС торги",
};

export default function GisTorgiPage() {
  return (
    <DashboardPageFrame figureSrc="/checksImages/torgi-figure.png">
        <CheckFormById configId="gistorgi" />
        <ChecksHistory module={CheckModule.GISTORGI} />
    </DashboardPageFrame>
  );
}
