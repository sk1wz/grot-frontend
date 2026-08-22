import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { taxiSchema } from "./schema";

export const taxiConfig: CheckConfig = {
  id: "taxi",
  title: "ФГИС Такси",
  endpoint: "/checks/taxi",
  batchEndpoint: "/checks/taxi/batch",
  templateUrl: "/templates/vin.xlsx",
  fields: [
    {
      name: "vin",
      label: "VIN",
      placeholder: "Введите VIN",
    },
  ],
  schema: taxiSchema,
  buildSubjectBody: (values) => ({ vin: pickString(values, "vin") }),
};
