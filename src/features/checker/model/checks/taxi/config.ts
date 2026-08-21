import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { taxiSchema } from "./schema";

export const taxiConfig: CheckConfig = {
  id: "taxi",
  title: "ФГИС Такси",
  endpoint: "/checks/taxi",
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
