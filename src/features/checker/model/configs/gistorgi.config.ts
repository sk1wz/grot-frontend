import type { CheckConfig } from "../types";
import { pickString, vinSchema } from "../schemas";

export const gistorgiConfig: CheckConfig = {
  id: "gistorgi",
  title: "ГИС Торги",
  description: "Проверка по VIN в реестре торгов",
  endpoint: "/checks/gistorgi",
  price: 10,
  eta: "~2с",
  fields: [
    {
      name: "vin",
      label: "VIN",
      placeholder: "VIN",
    },
  ],
  schema: vinSchema,
  buildSubject: (values) => ({ vin: pickString(values, "vin") }),
};
