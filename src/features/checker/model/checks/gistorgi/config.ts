import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { gistorgiSchema } from "./schema";

export const gistorgiConfig: CheckConfig = {
  id: "gistorgi",
  title: "ГИС Торги",
  endpoint: "/checks/gistorgi",
  fields: [
    {
      name: "vin",
      label: "VIN",
      placeholder: "Введите VIN",
    },
  ],
  schema: gistorgiSchema,
  buildBody: (values) => ({ vin: pickString(values, "vin") }),
};
