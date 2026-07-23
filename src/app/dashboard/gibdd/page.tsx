import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";

export const metadata: Metadata = {
  title: "ГИБДД",
};

export default function GibddPage() {
  return <ChecksHistory module={CheckModule.GIBDD} />;
}
