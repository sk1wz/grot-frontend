import type { Metadata } from "next";
import { BankruptcyPageContent } from "./BankruptcyPageContent";

export const metadata: Metadata = {
  title: "Банкротства",
};

export default function BankruptcyPage() {
  return <BankruptcyPageContent />;
}
