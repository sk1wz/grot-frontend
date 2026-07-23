import type { Metadata } from "next";
import { ChecksHistory } from "@/widgets/checks-history";
import { CheckModule } from "@/entities/check";

export const metadata: Metadata = {
  title: "ИНН по паспорту",
};

export default function InnByPassportPage() {
  return <ChecksHistory module={CheckModule.INN} />;
}
