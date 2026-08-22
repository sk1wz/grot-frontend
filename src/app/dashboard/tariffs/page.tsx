import type { Metadata } from "next";
import { TariffsPageContent } from "./TariffsPageContent";

export const metadata: Metadata = {
  title: "Тарифы",
};

export default function TariffsPage() {
  return <TariffsPageContent />;
}
