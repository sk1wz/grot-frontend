import Link from "next/link";
import styles from "./page.module.css";

export default function GisTorgiReportPage() {
  return <main className={styles.report}>
    {/* Действия отчёта */}
    <div className={styles.actions}><Link href="/dashboard/gis-torgi">← Вернуться назад</Link><button type="button" className={styles.download} onClick={() => window.print()}><span>Скачать</span><span className={styles.pdfLabel}>PDF</span></button></div>
    {/* Шапка отчёта */}
    <section className={styles.hero}><div className={styles.stamp}>Проверено 21.07.2026, 13:30<strong>autosintes.ru</strong></div><div className={styles.reportFigure} aria-hidden="true" /><div className={styles.heroTitle}>Отчёт о проверке транспортных средств в реестре ГИС Торги</div><h1>VIN A11A111AAAA111111</h1><div className={styles.fields}><div><span>ID</span><strong>1</strong></div><div><span>Статус лота</span><strong>Определение победителя</strong></div><div><span>Наименование лота</span><strong>Автотранспортное средство, VOLKSWAGEN PASSAT, 2024 года выпуска, VIN A11A111AAAA111111</strong></div><div><span>Дата</span><strong>ДД.ММ.ГГГГ</strong></div><div><span>Ссылка</span><strong>https://torgi.gov.ru/</strong></div></div></section>
  
  </main>;
}
