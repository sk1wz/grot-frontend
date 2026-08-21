import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { DashboardPageFrame } from "../DashboardPageFrame";
import styles from "./LegalDocument.module.css";

type LegalDocumentProps = {
  title: string;
  children: ReactNode;
  showBackButton?: boolean;
};

export function LegalDocument({
  title,
  children,
  showBackButton = false,
}: LegalDocumentProps) {
  return (
    <main className={styles.page}>
      {showBackButton && (
        <Link href="/dashboard/about" className={styles.back}>
          <ArrowLeft size={18} aria-hidden />
          Вернуться назад
        </Link>
      )}
      <DashboardPageFrame
        figureSrc="/images/about-figure.png"
        wrapperClassName={styles.frameWrapper}
        className={styles.document}
      >
        <div className={styles.documentation}>Документация</div>
        <h1>{title}</h1>
        <div className={styles.content}>{children}</div>
      </DashboardPageFrame>
    </main>
  );
}
