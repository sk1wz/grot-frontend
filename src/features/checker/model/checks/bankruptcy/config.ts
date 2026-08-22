import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { fioSchema, innSchema } from "./schema";

export const bankruptcyConfig: CheckConfig = {
  id: "bankruptcy",
  title: "Банкротства",
  endpoint: "/checks/bankruptcy",
  batchEndpoint: "/checks/bankruptcy/batch",
  templateUrl: "/templates/bankruptcy.xlsx",
  modes: [
    {
      id: "for_inn",
      label: "По ИНН",
      fields: [
        {
          name: "inn",
          label: "ИНН",
          placeholder: "ИНН",
        },
      ],
      schema: innSchema,
      buildSubjectBody: (values) => ({ inn: pickString(values, "inn") }),
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
      buildSubjectBody: (values) => ({ fio: pickString(values, "fio") }),
      requiresFeature: "bankrupt_by_fio",
    },
  ],
};
