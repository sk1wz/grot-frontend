import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";
import { CheckFormById } from "@/features/checker";

export const metadata: Metadata = {
  title: "ИНН по паспорту",
};

export default function InnByPassportPage() {
  return (
    <>
      <CheckFormById configId="inn" />
      <ChecksHistory module={CheckModule.INN} />
    </>
  );
}
