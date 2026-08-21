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
import styles from "./page.module.css";

type TaxiCheck = CheckByModule<CheckModule.TAXI>;

const emptyValue = "—";

export default function TaxiReportPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const isAdmin = useUserStore((state) => state.user?.role === UserRole.ADMIN);
  const [check, setCheck] = useState<TaxiCheck | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isCancelled = false;
    getCheckById(id, isAdmin)
      .then((loadedCheck) => {
        if (isCancelled) return;
        if (loadedCheck.module !== CheckModule.TAXI) {
          setError("Проверка не относится к ФГИС Такси");
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

  if (error) return <main className={styles.error}>{error}</main>;
  if (!check?.result) return null;

  const { vin, records } = check.result;

  return (
    <main className={styles.report}>
      <ReportHeader backHref="/dashboard/taxi" reportId={check.id} />
      <section className={styles.reportFrame}>
        <div className={styles.reportFigure} aria-hidden="true" />
        <div className={styles.stamp}>
          <span>
            Проверено {formatDate(check.completedAt ?? check.updatedAt)}
          </span>
          <strong>autosintes.ru</strong>
        </div>
        <h1>Отчёт о проверке транспортного средства в реестре ФГИС Такси</h1>

        <dl className={styles.table}>
          <div className={styles.row}>
            <dt>VIN</dt>
            <dd>{vin ?? emptyValue}</dd>
          </div>
        </dl>

        {records.length === 0 ? (
          <p className={styles.empty}>Сведения в реестре такси не найдены</p>
        ) : (
          <div className={styles.records}>
            {records.map((record, index) => {
              const rows = [
                ["VIN", record.vin],
                ["Марка", record.brand],
                ["Модель", record.model],
                ["Год выпуска", record.year],
                ["Регион", record.region],
                ["Дата записи", record.record_date],
                ["Номер записи", record.record_number],
                ["Регистрационный номер", record.registration_number],
                ["Статус записи", record.record_status],
                ["Дата внесения в реестр", record.registry_entry_date],
                ["Дата исключения", record.exclusion_date],
                ["Перевозчик", record.carrier_name],
                ["ИНН перевозчика", record.carrier_inn],
                ["Подъёмное устройство", record.lifting_device],
              ] as const;

              return (
                <section
                  className={styles.recordSection}
                  key={`${record.record_number ?? "record"}-${index}`}
                >
                  <h2>Запись реестра {index + 1}</h2>
                  <dl className={styles.table}>
                    {rows.map(([label, value]) => (
                      <div className={styles.row} key={label}>
                        <dt>{label}</dt>
                        <dd>{value ?? emptyValue}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
