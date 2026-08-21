import type { Metadata } from "next";
import { PublicOfferContent } from "@/shared/content/public-offer";
import { LegalDocument } from "@/shared/ui";

export const metadata: Metadata = { title: "Публичная оферта" };

export default function PublicOfferPage() {
  return (
    <LegalDocument title="Публичная оферта" showBackButton>
      <PublicOfferContent />
    </LegalDocument>
  );
}
