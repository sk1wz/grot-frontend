"use client";

import {
  getCheckById,
  type CheckByModule,
  CheckModule,
} from "@/entities/check";
import { formatDate } from "@/shared/lib";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

type GistorgiCheck = CheckByModule<CheckModule.GISTORGI>;

export default function GisTorgiReportPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [check, setCheck] = useState<GistorgiCheck | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let isCancelled = false;

    getCheckById(id)
      .then((loadedCheck) => {
        if (isCancelled) return;
        if (loadedCheck.module !== CheckModule.GISTORGI) {
          setError("Проверка не относится к ГИС Торги");
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

  if (error) return <main className={styles.report}>{error}</main>;
  if (!check?.result) return null;

  const { summary, lots } = check.result;

  return (
    <main className={styles.report}>
      <div className={styles.actions}>
        <Link href="/dashboard/gis-torgi">← Вернуться назад</Link>
        <button type="button" className={styles.download}>
          <span>Скачать</span>
          <span className={styles.pdfLabel}>PDF</span>
        </button>
      </div>
      <section className={styles.hero}>
        <div className={styles.stamp}>
          <span>
            Проверено {formatDate(check.completedAt ?? check.updatedAt)}
          </span>
          <strong>autosintes.ru</strong>
        </div>
        <div className={styles.reportFigure} aria-hidden="true" />
        <div className={styles.heroTitle}>
          Отчёт о проверке транспортных средств в реестре ГИС Торги
        </div>
        <h1>{summary.vin ? `VIN ${summary.vin}` : "VIN не указан"}</h1>
        <div className={styles.fields}>
          <div>
            <span>VIN</span>
            <strong>{summary.vin ?? "—"}</strong>
          </div>
        </div>
      </section>
      {lots.map((lot, index) => (
        <section
          className={styles.section}
          key={`${lot.lotName}-${lot.lotLink}-${index}`}
        >
          <h2>Лот</h2>
          <div className={styles.list}>
            <div>
              <span>Статус лота</span>
              <strong>{lot.lotStatus ?? "—"}</strong>
            </div>
            <div>
              <span>Наименование лота</span>
              <strong>{lot.lotName ?? "—"}</strong>
            </div>
            <div>
              <span>Дата</span>
              <strong>{lot.lotDate ?? "—"}</strong>
            </div>
            <div>
              <span>Ссылка</span>
              <strong>{lot.lotLink ?? "—"}</strong>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
