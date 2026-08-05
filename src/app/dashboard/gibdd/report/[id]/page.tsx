import Link from "next/link";
import styles from "./page.module.css";

export default function GibddReportPage() {
  return (
    <main className={styles.report}>
      {/* Панель действий */}
      <div className={styles.actions}>
        <Link href="/dashboard/gibdd" className={styles.back}>← Вернуться назад</Link>
        <button type="button" className={styles.download}>Скачать</button>
      </div>

      {/* Основная карточка автомобиля */}
      <section className={styles.hero}>
        <div className={styles.stamp}>
          <span>Проверено 21.07.2026, 13:30</span>
          <strong>autosintes.ru</strong>
        </div>
        <div className={styles.carImage} aria-hidden="true" />
        <div className={styles.heroTitle}>Отчёт о проверке транспортного средства</div>
        <h1>VOLKSWAGEN PASSAT, 2024</h1>

        {/* Реквизиты транспортного средства */}
        <div className={styles.vehicleCard}>
          <div className={styles.primaryFields}>
            <div className={styles.dataField}><span>VIN</span><strong>A11A111AAAA111111</strong></div>
            <div className={styles.dataField}><span>Гос. номер</span><strong>A111AA11</strong></div>
          </div>
          <div className={styles.compactFields}>
            <div className={styles.dataField}><span>Цвет</span><strong>Белый, жёлтый, серый</strong></div>
            <div className={styles.dataField}><span>Объём, см³</span><strong>1111,1</strong></div>
            <div className={styles.dataField}><span>Мощность, л.с.</span><strong>111,1</strong></div>
            <div className={styles.dataField}><span>№ двигателя</span><strong>AAA11111</strong></div>
          </div>
          <div className={styles.primaryFields}>
            <div className={styles.dataField}><span>№ СТС</span><strong>1111111111</strong><small>Дата выдачи: 15.01.2024</small></div>
            <div className={styles.dataField}><span>№ ПТС</span><strong>111111111111111</strong><small>Дата выдачи: 17.01.2024</small></div>
          </div>
        </div>
      </section>

      {/* Краткая сводка */}
      <section className={styles.summary}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryItem}><span>Залоги</span><strong className={styles.danger}>1</strong></div>
          <div className={styles.summaryItem}><span>ДТП</span><strong className={styles.danger}>1</strong></div>
          <div className={styles.summaryItem}><span>Статус</span><strong>Проверено</strong></div>
          <div className={styles.summaryItem}><span>Розыск</span><strong>Нет</strong></div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryItem}><span>Владельцев</span><strong>1</strong></div>
          <div className={styles.summaryItem}><span>Ограничения</span><strong className={styles.danger}>1</strong></div>
          <div className={styles.summaryItem}><span>Штрафы</span><strong>1</strong><small>До суммы 10 000,00 ₽</small></div>
          <div className={styles.summaryItem}><span>ОСАГО</span><strong className={styles.success}>Действует</strong></div>
        </div>
      </section>

      {/* История владения */}
      <section className={styles.section}>
        <div className={styles.vehicleCaption}>VOLKSWAGEN PASSAT, A11A111AAAA111111</div>
        <h2>История владения</h2>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead><tr><th>№</th><th>Тип</th><th>Начало владения</th><th>Окончание владения</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Физическое лицо</td><td>01.01.2000</td><td>01.01.2000</td></tr>
              <tr><td>2</td><td>Физическое лицо</td><td>01.01.2000</td><td>Настоящее время</td></tr>
              <tr><td>3</td><td>Физическое лицо</td><td>01.01.2000</td><td>01.01.2000</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Сведения об ОСАГО */}
      <section className={styles.section}>
        <div className={styles.vehicleCaption}>VOLKSWAGEN PASSAT, A11A111AAAA111111</div>
        <h2>Полис ОСАГО</h2>
        <div className={styles.osago}>
          <div><span>Статус</span><strong className={styles.success}>Действует</strong></div>
          <div><span>Серия / номер</span><strong>AAA 1111111111</strong></div>
          <div><span>Страховая компания</span><strong>Наименование компании</strong></div>
          <div><span>Период</span><strong>Период использования транспортного средства равен сроку страхования.</strong></div>
          <div><span>Расширение на БС</span><strong>Нет</strong></div>
        </div>
      </section>

      {/* Сведения о розыске */}
      <section className={styles.section}>
        <div className={styles.vehicleCaption}>VOLKSWAGEN PASSAT, A11A111AAAA111111</div>
        <h2>Розыск</h2>
        <div className={styles.notice}>В розыске не значится</div>
      </section>

      {/* Ограничения */}
      <section className={styles.section}>
        <div className={styles.vehicleCaption}>VOLKSWAGEN PASSAT, A11A111AAAA111111</div>
        <h2>Ограничения</h2>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead><tr><th>№</th><th>Дата</th><th>Тип</th><th>Постановление</th><th>Регион/Орган</th><th>Основание</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>01.01.2000</td><td className={styles.danger}>Запрет на регистрационные действия</td><td>111111/11/1111 — ИП</td><td>Область, Служебный участок №1</td><td>Документ, ФИО</td></tr>
              <tr><td>2</td><td>01.01.2000</td><td className={styles.danger}>Запрет на регистрационные действия</td><td>111111/11/1111 — ИП</td><td>Область, Служебный участок №1</td><td>Документ, ФИО</td></tr>
              <tr><td>3</td><td>01.01.2000</td><td className={styles.danger}>Запрет на регистрационные действия</td><td>111111/11/1111 — ИП</td><td>Область, Служебный участок №1</td><td>Документ, ФИО</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Реестр залогов */}
      <section className={styles.section}>
        <div className={styles.vehicleCaption}>VOLKSWAGEN PASSAT, A11A111AAAA111111</div>
        <h2>Залоги</h2>
        <div className={styles.osago}>
          <div><span>Дата залога</span><strong>01.01.2000</strong></div>
          <div><span>Реестровый номер</span><strong>2000-111-111111-111</strong></div>
          <div><span>Залогодатель</span><strong>«Фамилия имя отчество (ГПЕМД)»</strong></div>
          <div><span>Залогодержатель</span><strong>Наименование компании</strong></div>
          <div><span>История изменений</span><strong>01.01.2000 — дата возникновения<br />01.01.2000 — дата исключения</strong></div>
        </div>
      </section>

      {/* Штрафы */}
      <section className={styles.section}>
        <div className={styles.vehicleCaption}>VOLKSWAGEN PASSAT, A11A111AAAA111111</div>
        <h2>Штрафы, на сумму 10 000 ₽</h2>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead><tr><th>№</th><th>Дата</th><th>Сумма</th><th>Статус</th><th>Статья</th><th>Адрес</th><th>Кем выписан</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>01.01.2000</td><td>100 ₽</td><td className={styles.success}>Оплачен</td><td>12.9 ч.2</td><td>Область, район, город, улица</td><td>Наименование</td></tr>
              <tr><td>2</td><td>01.01.2000</td><td>100 ₽</td><td className={styles.danger}>Не оплачен</td><td>12.9 ч.2</td><td>Область, район, город, улица</td><td>Наименование</td></tr>
              <tr><td>3</td><td>01.01.2000</td><td>100 ₽</td><td className={styles.success}>Оплачен</td><td>12.9 ч.2</td><td>Область, район, город, улица</td><td>Наименование</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Дорожно-транспортные происшествия */}
      <section className={styles.section}>
        <div className={styles.vehicleCaption}>VOLKSWAGEN PASSAT, A11A111AAAA111111</div>
        <h2>ДТП</h2>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead><tr><th>№</th><th>Дата</th><th>Тип</th><th>Состояние</th><th>Место</th><th>Повреждения</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>01.01.2000</td><td>Столкновение</td><td>Повреждено</td><td>Область, район, город, улица</td><td>110, 111, 112, 120</td></tr>
              <tr><td>2</td><td>01.01.2000</td><td>Наезд на ТС</td><td>Повреждено</td><td>Область, район, город, улица</td><td>110, 111, 112, 120</td></tr>
              <tr><td>3</td><td>01.01.2000</td><td>Столкновение</td><td>Повреждено</td><td>Область, район, город, улица</td><td>110, 111, 112, 120</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
