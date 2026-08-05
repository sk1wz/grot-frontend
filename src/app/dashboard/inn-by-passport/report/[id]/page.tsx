import Link from "next/link";
import styles from "./page.module.css";

export default function InnReportPage() {
  return <main className={styles.report}>
    {/* Действия отчёта */}
    <div className={styles.actions}><Link href="/dashboard/inn-by-passport">← Вернуться назад</Link><button type="button">Скачать</button></div>
    {/* Шапка отчёта */}
    <section className={styles.hero}>
      <div className={styles.stamp}>Проверено 21.07.2026, 13:30<strong>autosintes.ru</strong></div>
      <div className={styles.reportFigure} aria-hidden="true" />
      <div className={styles.heroTitle}>Отчёт о проверке ИНН</div>
      <div className={styles.fields}>
        <div><span>ID</span><strong>1</strong></div>
        <div><span>ФИО</span><strong>Иванов Иван Иванович</strong></div>
        <div><span>Дата рождения</span><strong>ДД.ММ.ГГГГ</strong></div>
        <div><span>Дата возбуждения</span><strong>ДД.ММ.ГГГГ</strong></div>
        <div><span>Номер паспорта</span><strong>1111222222</strong></div>
        <div><span>ИНН</span><strong>111111111111</strong></div>
      </div>
    </section>
  </main>;
}
