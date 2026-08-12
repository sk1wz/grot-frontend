"use client";

import {
  getCheckById,
  type CheckByModule,
  CheckModule,
} from "@/entities/check";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { formatDate } from "@/shared/lib";

type GibddCheck = CheckByModule<CheckModule.GIBDD>;

export default function GibddReportPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [check, setCheck] = useState<GibddCheck | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isCancelled = false;

    getCheckById(id)
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
  }, [id]);

  if (error) return <main className={styles.report}>{error}</main>;
  if (!check?.result) return null;

  const { autosintes_accidents, autosintes_fines, autosintes_owners } =
    check.result;
  const summary = check.result.autosintes_summary;
  const vehicleName =
    [summary.autosintes_model, summary.autosintes_year]
      .filter(Boolean)
      .join(", ") || "Транспортное средство";
  const vehicleCaption = [summary.autosintes_model, summary.autosintes_VIN]
    .filter(Boolean)
    .join(", ");

  return (
    <main className={styles.report}>
      <div className={styles.actions}>
        <Link href="/dashboard/gibdd" className={styles.back}>
          ← Вернуться назад
        </Link>
        <button
          type="button"
          className={styles.download}
          onClick={() => window.print()}
        >
          <span>Скачать</span>
          <span className={styles.pdfLabel}>PDF</span>
        </button>
      </div>

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
              <strong>{summary.autosintes_VIN ?? "—"}</strong>
            </div>
            <div className={styles.dataField}>
              <span>Гос. номер</span>
              <strong>{summary.autosintes_reg_number ?? "—"}</strong>
            </div>
          </div>
          <div className={styles.compactFields}>
            <div className={styles.dataField}>
              <span>Цвет</span>
              <strong>{summary.autosintes_color ?? "—"}</strong>
            </div>
            <div className={styles.dataField}>
              <span>Объём, см³</span>
              <strong>{summary.autosintes_engine_volume_cc ?? "—"}</strong>
            </div>
            <div className={styles.dataField}>
              <span>Мощность, л.с.</span>
              <strong>{summary.autosintes_engine_power_hp ?? "—"}</strong>
            </div>
            <div className={styles.dataField}>
              <span>№ двигателя</span>
              <strong>{summary.autosintes_engine_number ?? "—"}</strong>
            </div>
          </div>
          <div className={styles.primaryFields}>
            <div className={styles.dataField}>
              <span>№ СТС</span>
              <strong>{summary.autosintes_N_STS ?? "—"}</strong>
              <small>Дата выдачи: {summary.autosintes_date_STS ?? "—"}</small>
            </div>
            <div className={styles.dataField}>
              <span>№ ПТС</span>
              <strong>{summary.autosintes_N_PTS ?? "—"}</strong>
              <small>Дата выдачи: {summary.autosintes_date_PTS ?? "—"}</small>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.summary}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryItem}>
            <span>Залоги</span>
            <strong>{summary.autosintes_pledges_count ?? "—"}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>ДТП</span>
            <strong>{autosintes_accidents.length}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>Статус</span>
            <strong>{check.status}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>Розыск</span>
            <strong>{summary.autosintes_in_rozisk ?? "—"}</strong>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryItem}>
            <span>Владельцев</span>
            <strong>{autosintes_owners.length}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>Ограничения</span>
            <strong>{summary.autosintes_restrictions_count ?? "—"}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>Штрафы</span>
            <strong>{autosintes_fines.length}</strong>
            <small>На сумму: {summary.autosintes_total_fine ?? "—"}</small>
          </div>
          <div className={styles.summaryItem}>
            <span>ОСАГО</span>
            <strong>{summary.autosintes_osago_contract_status ?? "—"}</strong>
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
              {autosintes_owners.map((owner, index) => (
                <tr
                  key={`${owner.autosintes_from}-${owner.autosintes_to}-${index}`}
                >
                  <td>{index + 1}</td>
                  <td>{owner.autosintes_type ?? "—"}</td>
                  <td>{owner.autosintes_from ?? "—"}</td>
                  <td>{owner.autosintes_to ?? "—"}</td>
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
            <strong>{summary.autosintes_osago_contract_status ?? "—"}</strong>
          </div>
          <div>
            <span>Серия / номер</span>
            <strong>
              {[summary.autosintes_osago_seria, summary.autosintes_osago_number]
                .filter(Boolean)
                .join(" ") || "—"}
            </strong>
          </div>
          <div>
            <span>Страховая компания</span>
            <strong>{summary.autosintes_osago_straxovka ?? "—"}</strong>
          </div>
          <div>
            <span>Период</span>
            <strong>{summary.autosintes_osago_usage_period ?? "—"}</strong>
          </div>
          <div>
            <span>Расширение на БС</span>
            <strong>{summary.autosintes_osago_extended_rb ?? "—"}</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.vehicleCaption}>{vehicleCaption}</div>
        <h2>Розыск</h2>
        <div className={styles.notice}>
          {summary.autosintes_in_rozisk ?? "—"}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.vehicleCaption}>{vehicleCaption}</div>
        <h2>Штрафы</h2>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>№</th>
                <th>Дата</th>
                <th>Время</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Статья</th>
                <th>Адрес</th>
                <th>Кем выписан</th>
              </tr>
            </thead>
            <tbody>
              {autosintes_fines.map((fine, index) => (
                <tr key={fine.autosintes_uin?.toString() ?? index}>
                  <td>{index + 1}</td>
                  <td>{fine.autosintes_date ?? "—"}</td>
                  <td>{fine.autosintes_time ?? "—"}</td>
                  <td>{fine.autosintes_amount ?? "—"}</td>
                  <td>{fine.autosintes_status ?? "—"}</td>
                  <td>{fine.autosintes_article ?? "—"}</td>
                  <td>{fine.autosintes_address ?? "—"}</td>
                  <td>{fine.autosintes_issuer ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
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
              {autosintes_accidents.map((accident, index) => (
                <tr
                  key={`${accident.autosintes_date}-${accident.autosintes_time}-${index}`}
                >
                  <td>{index + 1}</td>
                  <td>{accident.autosintes_date ?? "—"}</td>
                  <td>{accident.autosintes_time ?? "—"}</td>
                  <td>{accident.autosintes_accident_type ?? "—"}</td>
                  <td>{accident.autosintes_status ?? "—"}</td>
                  <td>
                    {[accident.autosintes_city, accident.autosintes_region]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </td>
                  <td>{accident.autosintes_damages ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
