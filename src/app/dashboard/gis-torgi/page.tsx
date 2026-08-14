import type { Metadata } from "next";
import { GisTorgiPageContent } from "./GisTorgiPageContent";

export const metadata: Metadata = {
  title: "ГИС торги",
};

export default function GisTorgiPage() {
  return <GisTorgiPageContent />;
}
