import type { Metadata } from "next";
import { LimitationsPageContent } from "./LimitationsPageContent";

export const metadata: Metadata = { title: "Ограничения" };

export default function LimitationsPage() {
  return <LimitationsPageContent />;
}
