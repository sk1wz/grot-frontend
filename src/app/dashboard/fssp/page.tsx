import type { Metadata } from "next";
import { FsspPageContent } from "./FsspPageContent";

export const metadata: Metadata = {
  title: "ФССП",
};

export default function FsspPage() {
  return <FsspPageContent />;
}
