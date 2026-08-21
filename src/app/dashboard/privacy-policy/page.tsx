import type { Metadata } from "next";
import { PrivacyPolicyContent } from "@/shared/content/privacy-policy";
import { LegalDocument } from "@/shared/ui";

export const metadata: Metadata = { title: "Политика конфиденциальности" };

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument title="Политика конфиденциальности" showBackButton>
      <PrivacyPolicyContent />
    </LegalDocument>
  );
}
