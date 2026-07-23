import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";

export const metadata: Metadata = {
  title: "ГИС торги",
};

export default function GisTorgiPage() {
  return <ChecksHistory module={CheckModule.GISTORGI} />;
}
