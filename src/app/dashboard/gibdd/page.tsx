import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";

export const metadata: Metadata = {
  title: "ГИБДД",
};

export default function GibddPage() {
  return (
    <>
      <CheckFormById configId="gibdd" />
      <ChecksHistory module={CheckModule.GIBDD} />
    </>
  );
}
