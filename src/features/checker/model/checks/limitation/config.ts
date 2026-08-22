import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { limitationSchema } from "./schema";

export const limitationConfig: CheckConfig = {
  id: "limitation",
  title: "Ограничения",
  endpoint: "/checks/limitation",
  batchEndpoint: "/checks/limitation/batch",
  templateUrl: "/templates/vin.xlsx",
  fields: [
    {
      name: "vin",
      label: "VIN",
      placeholder: "Введите VIN",
    },
  ],
  schema: limitationSchema,
  buildSubjectBody: (values) => ({ vin: pickString(values, "vin") }),
};
