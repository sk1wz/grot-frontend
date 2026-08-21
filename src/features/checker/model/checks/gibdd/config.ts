import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { gibddSchema } from "./schema";

export const gibddConfig: CheckConfig = {
  id: "gibdd",
  title: "Транспорт",
  endpoint: "/checks/gibdd",
  batchEndpoint: "/checks/gibdd/batch",
  fields: [
    {
      name: "vin",
      label: "VIN",
      placeholder: "Введите VIN",
    },
    {
      name: "osago",
      label: "Запрашивать ОСАГО (+1-2 мин)",
      type: "checkbox",
    },
  ],
  schema: gibddSchema,
  buildSubjectBody: (values) => {
    const subjectBody: Record<string, unknown> = {
      vin: pickString(values, "vin"),
    };

    if (values.osago === true) {
      subjectBody.osago = true;
    }

    return subjectBody;
  },
};
