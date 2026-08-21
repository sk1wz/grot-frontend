import type { Metadata } from "next";
import { TaxiPageContent } from "./TaxiPageContent";

export const metadata: Metadata = {
  title: "ФГИС Такси",
};

export default function TaxiPage() {
  return <TaxiPageContent />;
}
