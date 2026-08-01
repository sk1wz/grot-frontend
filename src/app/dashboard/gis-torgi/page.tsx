import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";

export const metadata: Metadata = {
  title: "ГИС торги",
};

export default function GisTorgiPage() {
  return (
    <>
      <CheckFormById configId="gistorgi" />
      <ChecksHistory module={CheckModule.GISTORGI} />
    </>
  );
}
