"use client";

import {
  getCheckById,
  type CheckByModule,
  CheckModule,
} from "@/entities/check";
import { UserRole, useUserStore } from "@/entities/user";
import { formatDate } from "@/shared/lib";
import { ReportHeader } from "@/shared/ui";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

type BankruptcyCheck = CheckByModule<CheckModule.BANKRUPTCY>;

const emptyValue = "—";

export default function BankruptcyReportPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const isAdmin = useUserStore((state) => state.user?.role === UserRole.ADMIN);
  const [check, setCheck] = useState<BankruptcyCheck | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isCancelled = false;
    getCheckById(id, isAdmin)
      .then((loadedCheck) => {
        if (isCancelled) return;
        if (loadedCheck.module !== CheckModule.BANKRUPTCY) {
          setError("Проверка не относится к банкротствам");
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

  const result = check.result;

  return (
    <main className={styles.report}>
      <ReportHeader backHref="/dashboard/bankruptcy" reportId={check.id} />

      <section className={styles.reportFrame}>
        <div className={styles.stamp}>
          <span>
            Проверено {formatDate(check.completedAt ?? check.updatedAt)}
          </span>
          <strong>autosintes.ru</strong>
        </div>
        <div className={styles.reportFigure} aria-hidden="true" />
        <h1>Отчёт о проверке в реестре сведений о банкротстве</h1>

        {result.cases.length === 0 ? (
          <p className={styles.empty}>Сведения о банкротстве не найдены</p>
        ) : (
          <div className={styles.cases}>
            {result.cases.map((bankruptcyCase, index) => {
              const rows = [
                ["Идентификатор", bankruptcyCase.id],
                ["ИНН", bankruptcyCase.inn],
                ["СНИЛС", bankruptcyCase.snils],
                ["Является ответчиком", bankruptcyCase.is_defendant],
                ["Номер дела", bankruptcyCase.case_number],
                ["Статус дела", bankruptcyCase.case_status],
                ["Должник", bankruptcyCase.debtor_name],
                ["Статус процедуры", bankruptcyCase.procedure_status],
                ["Адрес регистрации", bankruptcyCase.registration_address],
                ["Наименование суда", bankruptcyCase.court_name],
                ["Долг списан", bankruptcyCase.debt_released],
                ["Дата начала процедуры", bankruptcyCase.procedure_start_date],
                ["Дата окончания процедуры", bankruptcyCase.procedure_end_date],
                ["Карточка дела", bankruptcyCase.case_card_url],
                [
                  "Дата подачи заявления о банкротстве",
                  bankruptcyCase.bankruptcy_application_date,
                ],
              ] as const;

              return (
                <section
                  className={styles.caseSection}
                  key={`${bankruptcyCase.id ?? "case"}-${index}`}
                >
                  {result.cases.length > 1 && <h2>Дело {index + 1}</h2>}
                  <dl className={styles.table}>
                    {rows.map(([label, value]) => (
                      <div className={styles.row} key={label}>
                        <dt>{label}</dt>
                        <dd>{label === "Карточка дела" && typeof value === "string" && value ? <a className={styles.externalLink} href={value} target="_blank" rel="noreferrer">{value}</a> : value ?? emptyValue}</dd>
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
