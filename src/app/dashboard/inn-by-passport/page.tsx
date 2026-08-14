import type { Metadata } from "next";
import { InnByPassportPageContent } from "./InnByPassportPageContent";

export const metadata: Metadata = {
  title: "ИНН по паспорту",
};

export default function InnByPassportPage() {
  return <InnByPassportPageContent />;
}
