import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { innPassportSchema, innTextSchema } from "./schema";

export const innConfig: CheckConfig = {
  id: "inn",
  title: "ИНН по паспорту",
  endpoint: "/checks/inn",
  modes: [
    {
      id: "for_structured",
      label: "ФИО + дата рождения + паспорт",
      fields: [
        {
          name: "fio",
          label: "ФИО",
          placeholder: "Фамилия Имя Отчество",
        },
        {
          name: "dob",
          label: "Дата рождения",
          placeholder: "дд.мм.гггг",
          type: "date",
        },
        {
          name: "passport",
          label: "Паспорт",
          placeholder: "Паспорт (серия номер)",
        },
      ],
      schema: innPassportSchema,
      buildSubjectBody: (values) => ({
        fio: pickString(values, "fio"),
        dob: pickString(values, "dob"),
        passport: pickString(values, "passport"),
      }),
    },
    {
      id: "for_text",
      label: "Свободный текст",
      fields: [
        {
          name: "text",
          label: "Данные",
          placeholder: "Иванов Иван 01.01.1980 1234 567890",
        },
      ],
      schema: innTextSchema,
      buildSubjectBody: (values) => ({ text: pickString(values, "text") }),
    },
  ],
};
