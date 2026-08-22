import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { gibddSchema } from "./schema";

export const gibddConfig: CheckConfig = {
  id: "gibdd",
  title: "Транспорт",
  endpoint: "/checks/gibdd",
  batchEndpoint: "/checks/gibdd/batch",
  templateUrl: "/templates/vin.xlsx",
  fields: [
    {
      name: "vin",
      label: "VIN",
      placeholder: "Введите VIN",
    },
  ],
  schema: gibddSchema,
  buildSubjectBody: (values) => {
    const subjectBody: Record<string, unknown> = {
      vin: pickString(values, "vin"),
    };

    return subjectBody;
  },
};
