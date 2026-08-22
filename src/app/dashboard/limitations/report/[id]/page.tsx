"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  CheckModule,
  getCheckById,
  type CheckByModule,
} from "@/entities/check";
import { UserRole, useUserStore } from "@/entities/user";
import { formatDate } from "@/shared/lib";
import { ReportHeader } from "@/shared/ui";
import styles from "../../../gis-torgi/report/[id]/page.module.css";

type LimitationCheck = CheckByModule<CheckModule.LIMITATION>;

export default function LimitationReportPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const isAdmin = useUserStore((state) => state.user?.role === UserRole.ADMIN);
  const [check, setCheck] = useState<LimitationCheck | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let isCancelled = false;

    getCheckById(id, isAdmin)
      .then((loadedCheck) => {
        if (isCancelled) return;
        if (loadedCheck.module !== CheckModule.LIMITATION) {
          setError("Проверка не относится к ограничениям");
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
  const { vin, limitations } = check.result;

  return (
    <main className={styles.report}>
      <ReportHeader backHref="/dashboard/limitations" reportId={check.id} />
      <section className={styles.hero}>
        <div className={styles.stamp}>
          <span>
            Проверено {formatDate(check.completedAt ?? check.updatedAt)}
          </span>
          <strong>autosintes.ru</strong>
        </div>
        <div className={styles.reportFigure} aria-hidden="true" />
        <div className={styles.heroTitle}>
          Отчёт о проверке ограничений транспортного средства
        </div>
        <h1>{vin ? `VIN ${vin}` : "VIN не указан"}</h1>
        <div className={styles.fields}>
          <div>
            <span>VIN</span>
            <strong>{vin || "—"}</strong>
          </div>
        </div>
      </section>
      {limitations.length === 0 ? (
        <section className={styles.section}>
          <p className={styles.empty}>Ограничения не найдены</p>
        </section>
      ) : (
        limitations.map((limitation, index) => (
          <section className={styles.section} key={`${index}`}>
            <h2>Ограничение {index + 1}</h2>
            <div className={styles.list}>
              <div>
                <span>Модель</span>
                <strong>{limitation.model ?? "—"}</strong>
              </div>
              <div>
                <span>Год выпуска</span>
                <strong>{limitation.year ?? "—"}</strong>
              </div>
              <div>
                <span>Дата ограничения</span>
                <strong>{limitation.restriction_date ?? "—"}</strong>
              </div>
              <div>
                <span>Регион</span>
                <strong>{limitation.region ?? "—"}</strong>
              </div>
              <div>
                <span>Тип ограничения</span>
                <strong>{limitation.restriction_type ?? "—"}</strong>
              </div>
              <div>
                <span>Описание</span>
                <strong>{limitation.description ?? "—"}</strong>
              </div>
            </div>
          </section>
        ))
      )}
    </main>
  );
}
