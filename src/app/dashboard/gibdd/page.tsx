import type { Metadata } from "next";
import { GibddPageContent } from "./GibddPageContent";

export const metadata: Metadata = {
  title: "ГИБДД",
};

export default function GibddPage() {
  return <GibddPageContent />;
}
