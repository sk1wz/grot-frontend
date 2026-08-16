import type { Metadata } from "next";
import { privacyPolicyLines } from "@/shared/content/privacy-policy";
import { LegalDocument, LegalText } from "@/shared/ui";

export const metadata: Metadata = { title: "Политика конфиденциальности" };

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument title="Политика конфиденциальности" showBackButton>
      <LegalText lines={privacyPolicyLines} />
    </LegalDocument>
  );
}
