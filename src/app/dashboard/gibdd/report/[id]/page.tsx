"use client";

import {
  getCheckById,
  type CheckByModule,
  CheckModule,
} from "@/entities/check";
import { UserRole, useUserStore } from "@/entities/user";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { formatDate } from "@/shared/lib";
import { ReportHeader } from "@/shared/ui";

type GibddCheck = CheckByModule<CheckModule.GIBDD>;

function getFineStatusClass(status: unknown) {
  const value = String(status ?? "").toLowerCase();
  if (value === "paid" || (value.includes("оплачен") && !value.includes("неоплачен") && !value.includes("не оплачен"))) return styles.finePaid;
  if (value === "unpaid" || value.includes("неоплачен") || value.includes("не оплачен")) return styles.fineUnpaid;
  return "";
}

export default function GibddReportPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const isAdmin = useUserStore((state) => state.user?.role === UserRole.ADMIN);
  const [check, setCheck] = useState<GibddCheck | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isCancelled = false;

    getCheckById(id, isAdmin)
      .then((loadedCheck) => {
        if (isCancelled) return;

        if (loadedCheck.module !== CheckModule.GIBDD) {
          setError("Проверка не относится к ГИБДД");
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

  const { accidents, fines, owners } = check.result;
  const hasAccidents = accidents.length > 0;
  const hasFines = fines.length > 0;
  const summary = check.result.summary;
  const vehicleName =
    [summary.model, summary.year].filter(Boolean).join(", ") ||
    "Транспортное средство";
  const vehicleCaption = [summary.model, summary.VIN]
    .filter(Boolean)
    .join(", ");

  return (
    <main className={styles.report}>
      <ReportHeader backHref="/dashboard/gibdd" reportId={check.id} />

      <section className={styles.hero}>
        <div className={styles.stamp}>
          <span>
            {" "}
            Проверено {formatDate(check.completedAt ?? check.updatedAt)}
          </span>
          <strong>autosintes.ru</strong>
        </div>
        <div className={styles.carImage} aria-hidden="true" />
        <div className={styles.heroTitle}>
          Отчёт о проверке транспортного средства
        </div>
        <h1>{vehicleName}</h1>

        <div className={styles.vehicleCard}>
          <div className={styles.primaryFields}>
            <div className={styles.dataField}>
              <span>VIN</span>
              <strong>{summary.VIN ?? "—"}</strong>
            </div>
            <div className={styles.dataField}>
              <span>Гос. номер</span>
              <strong>{summary.reg_number ?? "—"}</strong>
            </div>
          </div>
          <div className={styles.compactFields}>
            <div className={styles.dataField}>
              <span>Цвет</span>
              <strong>{summary.color ?? "—"}</strong>
            </div>
            <div className={styles.dataField}>
              <span>Объём, см³</span>
              <strong>{summary.engine_volume_cc ?? "—"}</strong>
            </div>
            <div className={styles.dataField}>
              <span>Мощность, л.с.</span>
              <strong>{summary.engine_power_hp ?? "—"}</strong>
            </div>
            <div className={styles.dataField}>
              <span>№ двигателя</span>
              <strong>{summary.engine_number ?? "—"}</strong>
            </div>
          </div>
          <div className={styles.primaryFields}>
            <div className={styles.dataField}>
              <span>№ СТС</span>
              <strong>{summary.N_STS ?? "—"}</strong>
              <small>Дата выдачи: {summary.date_STS ?? "—"}</small>
            </div>
            <div className={styles.dataField}>
              <span>№ ПТС</span>
              <strong>{summary.N_PTS ?? "—"}</strong>
              <small>Дата выдачи: {summary.date_PTS ?? "—"}</small>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.summary}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryItem}>
            <span>Залоги</span>
            <strong>{summary.pledges_count ?? "—"}</strong>
          </div>
          {hasAccidents ? <a href="#accidents" className={`${styles.summaryItem} ${styles.summaryLink}`}><span>ДТП</span><strong className={styles.summaryValueLink}>{accidents.length}</strong></a> : <div className={styles.summaryItem}><span>ДТП</span><strong>{accidents.length}</strong></div>}
          <div className={styles.summaryItem}>
            <span>Статус</span>
            <strong>{check.status}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>Розыск</span>
            <strong>{summary.in_rozisk ?? "—"}</strong>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryItem}>
            <span>Владельцев</span>
            <strong>{owners.length}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>Ограничения</span>
            <strong>{summary.restrictions_count ?? "—"}</strong>
          </div>
          {hasFines ? <a href="#fines" className={`${styles.summaryItem} ${styles.summaryLink}`}><span>Штрафы</span><strong className={styles.summaryValueLink}>{fines.length}</strong><small>На сумму: {summary.total_fine ?? "—"}</small></a> : <div className={styles.summaryItem}><span>Штрафы</span><strong>{fines.length}</strong><small>На сумму: {summary.total_fine ?? "—"}</small></div>}
          <div className={styles.summaryItem}>
            <span>ОСАГО</span>
            <strong>{summary.osago_contract_status ?? "—"}</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.vehicleCaption}>{vehicleCaption}</div>
        <h2>История владения</h2>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>№</th>
                <th>Тип</th>
                <th>Начало владения</th>
                <th>Окончание владения</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner, index) => (
                <tr key={`${owner.from}-${owner.to}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{owner.type ?? "—"}</td>
                  <td>{owner.from ?? "—"}</td>
                  <td>{owner.to ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.vehicleCaption}>{vehicleCaption}</div>
        <h2>Полис ОСАГО</h2>
        <div className={styles.osago}>
          <div>
            <span>Статус</span>
            <strong>{summary.osago_contract_status ?? "—"}</strong>
          </div>
          <div>
            <span>Серия / номер</span>
            <strong>
              {[summary.osago_seria, summary.osago_number]
                .filter(Boolean)
                .join(" ") || "—"}
            </strong>
          </div>
          <div>
            <span>Страховая компания</span>
            <strong>{summary.osago_straxovka ?? "—"}</strong>
          </div>
          <div>
            <span>Период</span>
            <strong>{summary.osago_usage_period ?? "—"}</strong>
          </div>
          <div>
            <span>Расширение на БС</span>
            <strong>{summary.osago_extended_rb ?? "—"}</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.vehicleCaption}>{vehicleCaption}</div>
        <h2>Розыск</h2>
        <div className={styles.notice}>{summary.in_rozisk ?? "—"}</div>
      </section>

      <section id="fines" className={`${styles.section} ${styles.anchorTarget}`}>
        <div className={styles.vehicleCaption}>{vehicleCaption}</div>
        <h2>Штрафы</h2>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>№</th>
                <th>Дата</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Статья</th>
                <th>Адрес</th>
                <th>Кем выписан</th>
              </tr>
            </thead>
            <tbody>
              {fines.map((fine, index) => (
                <tr key={fine.uin?.toString() ?? index}>
                  <td>{index + 1}</td>
                  <td>{fine.date ?? "—"}</td>
                  <td>{fine.amount ?? "—"}</td>
                  <td className={getFineStatusClass(fine.status)}>{fine.status ?? "—"}</td>
                  <td>{fine.article ?? "—"}</td>
                  <td>{fine.address ?? "—"}</td>
                  <td>{fine.issuer ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="accidents" className={`${styles.section} ${styles.anchorTarget}`}>
        <div className={styles.vehicleCaption}>{vehicleCaption}</div>
        <h2>ДТП</h2>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>№</th>
                <th>Дата</th>
                <th>Время</th>
                <th>Тип</th>
                <th>Состояние</th>
                <th>Место</th>
                <th>Повреждения</th>
              </tr>
            </thead>
            <tbody>
              {accidents.map((accident, index) => (
                <tr key={`${accident.date}-${accident.time}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{accident.date ?? "—"}</td>
                  <td>{accident.time ?? "—"}</td>
                  <td>{accident.accident_type ?? "—"}</td>
                  <td>{accident.status ?? "—"}</td>
                  <td>
                    {[accident.city, accident.region]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </td>
                  <td>{accident.damages ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
