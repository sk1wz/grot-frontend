import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { fioSchema, innSchema } from "./schema";

export const bankruptcyConfig: CheckConfig = {
  id: "bankruptcy",
  title: "Банкротства",
  endpoint: "/checks/bancrupcy",
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
          placeholder: "Фамилия Имя Отчество",
        },
      ],
      schema: fioSchema,
      buildSubject: (values) => ({ fio: pickString(values, "fio") }),
      requiresFeature: "bankrupt_by_fio",
    },
  ],
};
