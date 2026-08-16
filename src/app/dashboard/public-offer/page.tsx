import type { Metadata } from "next";
import { publicOfferLines } from "@/shared/content/public-offer";
import { LegalDocument, LegalText } from "@/shared/ui";

export const metadata: Metadata = { title: "Публичная оферта" };

export default function PublicOfferPage() {
  return (
    <LegalDocument title="Публичная оферта" showBackButton>
      <LegalText lines={publicOfferLines} />
    </LegalDocument>
  );
}
