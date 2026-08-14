"use client";

import {
  getCheckById,
  type CheckByModule,
  CheckModule,
} from "@/entities/check";
import { formatDate } from "@/shared/lib";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ReportHeader } from "@/shared/ui";

type InnCheck = CheckByModule<CheckModule.INN>;

export default function InnReportPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [check, setCheck] = useState<InnCheck | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isCancelled = false;

    getCheckById(id)
      .then((loadedCheck) => {
        if (isCancelled) return;

        if (loadedCheck.module !== CheckModule.INN) {
          setError("Проверка не относится к ИНН");
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

  const { summary: summary } = check.result;
  const rows = [
    ["ФИО", summary.full_name ?? "—"],
    ["Дата рождения", summary.birth_date ?? "—"],
    ["Номер паспорта", summary.passport_number ?? "—"],
    ["ИНН", summary.inn ?? "—"],
  ];

  return (
    <main className={styles.report}>
      <ReportHeader backHref="/dashboard/inn-by-passport" reportId={check.id} />

      <section className={styles.reportFrame}>
        <div className={styles.stamp}>
          <span>
            Проверено {formatDate(check.completedAt ?? check.updatedAt)}
          </span>
          <strong>autosintes.ru</strong>
        </div>

        <div className={styles.reportFigure} aria-hidden="true" />
        <h1>Отчёт о проверке ИНН</h1>

        <dl className={styles.table}>
          {rows.map(([label, value]) => (
            <div className={styles.row} key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
