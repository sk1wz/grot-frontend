"use client";

import {
  getCheckById,
  type CheckByModule,
  CheckModule,
} from "@/entities/check";
import { formatDate } from "@/shared/lib";
import { ReportHeader } from "@/shared/ui";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

type FsspCheck = CheckByModule<CheckModule.FSSP>;

const emptyValue = "—";

export default function FsspReportPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [check, setCheck] = useState<FsspCheck | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isCancelled = false;
    getCheckById(id)
      .then((loadedCheck) => {
        if (isCancelled) return;
        if (loadedCheck.module !== CheckModule.FSSP) {
          setError("Проверка не относится к ФССП");
          return;
        }
        setCheck(loadedCheck);
      })
      .catch((loadError: unknown) => {
        if (!isCancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Не удалось загрузить проверку"
          );
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (error) return <main className={styles.error}>{error}</main>;
  if (!check?.result) return null;

  const { summary } = check.result;
  const rows = [
    ["Идентификатор", summary.id],
    ["Дата", summary.date],
    ["Сервис", summary.service],
    ["Дата возбуждения", summary.initiationDate],
    ["Контакты пристава", summary.bailiffContacts],
    ["Предмет исполнения", summary.enforcementSubject],
    ["Исполнительский сбор", summary.enforcementFee],
    ["Отдел судебных приставов", summary.bailiffDepartment],
    ["Номер сводного исполнительного производства", summary.consolidatedProceedingNumber],
    ["Судебный пристав", summary.bailiff],
    ["Сумма задолженности", summary.debtAmount],
    ["Номер исполнительного производства", summary.enforcementProceedingNumber],
    ["Адрес отдела судебных приставов", summary.bailiffDepartmentAddress],
    ["Причина прекращения", summary.terminationReason],
    ["Должник", summary.debtor],
    ["Реквизиты исполнительного документа", summary.executiveDocumentDetails],
  ] as const;

  return (
    <main className={styles.report}>
      <ReportHeader backHref="/dashboard/fssp" reportId={check.id} />

      <section className={styles.reportFrame}>
        <div className={styles.stamp}>
          <span>Проверено {formatDate(check.completedAt ?? check.updatedAt)}</span>
          <strong>autosintes.ru</strong>
        </div>
        <div className={styles.reportFigure} aria-hidden="true" />
        <h1>Отчёт о проверке ФССП</h1>

        <dl className={styles.table}>
          {rows.map(([label, value]) => (
            <div className={styles.row} key={label}>
              <dt>{label}</dt>
              <dd>{value ?? emptyValue}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
