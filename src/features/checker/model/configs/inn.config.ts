import type { CheckConfig } from "../types";
import { innPassportSchema, innTextSchema, pickString } from "../schemas";

export const innConfig: CheckConfig = {
  id: "inn",
  title: "ИНН по паспорту",
  description: "Поиск ИНН по паспорту и ФИО",
  endpoint: "/checks/inn",
  price: 10,
  eta: "~1с",
  modes: [
    {
      id: "structured",
      label: "ФИО + дата рождения + паспорт",
      fields: [
        {
          name: "fio",
          label: "ФИО",
          placeholder: "ФИО (Фамилия Имя Отчество)",
        },
        {
          name: "dob",
          label: "Дата рождения",
          placeholder: "Дата рождения (ДД.ММ.ГГГГ)",
          type: "date",
        },
        {
          name: "passport",
          label: "Паспорт",
          placeholder: "Паспорт (серия номер)",
        },
      ],
      schema: innPassportSchema,
      buildSubject: (values) => ({
        fio: pickString(values, "fio"),
        dob: pickString(values, "dob"),
        passport: pickString(values, "passport"),
      }),
    },
    {
      id: "text",
      label: "Свободный текст",
      fields: [
        {
          name: "text",
          label: "Данные",
          placeholder: "Иванов Иван 01.01.1980 1234 567890",
        },
      ],
      schema: innTextSchema,
      buildSubject: (values) => ({ text: pickString(values, "text") }),
    },
  ],
};
