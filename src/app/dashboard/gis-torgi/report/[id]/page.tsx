"use client";

import {
  getCheckById,
  type CheckByModule,
  CheckModule,
} from "@/entities/check";
import { UserRole, useUserStore } from "@/entities/user";
import { formatDate } from "@/shared/lib";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ReportHeader } from "@/shared/ui";

type GistorgiCheck = CheckByModule<CheckModule.GISTORGI>;

export default function GisTorgiReportPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const isAdmin = useUserStore((state) => state.user?.role === UserRole.ADMIN);
  const [check, setCheck] = useState<GistorgiCheck | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let isCancelled = false;

    getCheckById(id, isAdmin)
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
  }, [id, isAdmin]);

  if (error) return <main className={styles.report}>{error}</main>;
  if (!check?.result) return null;

  const { summary: summary, lots: lots } = check.result;

  return (
    <main className={styles.report}>
      <ReportHeader backHref="/dashboard/gis-torgi" reportId={check.id} />
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
      {lots.length === 0 ? (
        <section className={styles.section}>
          <p className={styles.empty}>Лоты не найдены</p>
        </section>
      ) : (
        lots.map((lot, index) => (
          <section
            className={styles.section}
            key={`${lot.lot_name}-${lot.lot_link}-${index}`}
          >
            <h2>Лот</h2>
            <div className={styles.list}>
              <div>
                <span>Статус лота</span>
                <strong>{lot.lot_status ?? "—"}</strong>
              </div>
              <div>
                <span>Наименование лота</span>
                <strong>{lot.lot_name ?? "—"}</strong>
              </div>
              <div>
                <span>Дата</span>
                <strong>{lot.lot_date ?? "—"}</strong>
              </div>
              <div>
                <span>Ссылка</span>
                <strong>{lot.lot_link ?? "—"}</strong>
              </div>
            </div>
          </section>
        ))
      )}
    </main>
  );
}
