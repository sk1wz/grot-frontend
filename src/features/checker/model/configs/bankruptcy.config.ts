import type { CheckConfig } from "../types";
import { fioSchema, innSchema, pickString } from "../schemas";

export const bankruptcyConfig: CheckConfig = {
  id: "bankruptcy",
  title: "Банкротства",
  description: "Проверка на банкротство",
  endpoint: "/checks/bancrupcy",
  price: 10,
  eta: "~10с",
  modes: [
    {
      id: "inn",
      label: "По ИНН",
      fields: [
        {
          name: "inn",
          label: "ИНН",
          placeholder: "ИНН или ОГРН",
        },
      ],
      schema: innSchema,
      buildSubject: (values) => ({ inn: pickString(values, "inn") }),
    },
    {
      id: "fio",
      label: "По ФИО",
      fields: [
        {
          name: "fio",
          label: "ФИО",
          placeholder: "ФИО (Фамилия Имя Отчество)",
        },
      ],
      schema: fioSchema,
      buildSubject: (values) => ({ fio: pickString(values, "fio") }),
      requiresFeature: "bankrupt_by_fio",
    },
  ],
};
