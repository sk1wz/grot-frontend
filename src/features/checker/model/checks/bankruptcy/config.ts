import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { fioSchema, innSchema } from "./schema";

export const bankruptcyConfig: CheckConfig = {
  id: "bankruptcy",
  title: "Банкротства",
  endpoint: "/checks/bancrupcy",
  modes: [
    {
      id: "for_inn",
      label: "По ИНН",
      fields: [
        {
          name: "inn",
          label: "ИНН",
          placeholder: "ИНН или ОГРН",
        },
      ],
      schema: innSchema,
      buildBody: (values) => ({ inn: pickString(values, "inn") }),
    },
    {
      id: "for_fio",
      label: "По ФИО",
      fields: [
        {
          name: "fio",
          label: "ФИО",
          placeholder: "Фамилия Имя Отчество",
        },
      ],
      schema: fioSchema,
      buildBody: (values) => ({ fio: pickString(values, "fio") }),
      requiresFeature: "bankrupt_by_fio",
    },
  ],
};
