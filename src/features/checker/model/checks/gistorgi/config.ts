import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { gistorgiSchema } from "./schema";

export const gistorgiConfig: CheckConfig = {
  id: "gistorgi",
  title: "ГИС Торги",
  endpoint: "/checks/gistorgi",
  batchEndpoint: "/checks/gistorgi/batch",
  templateUrl: "/templates/vin.xlsx",
  fields: [
    {
      name: "vin",
      label: "VIN",
      placeholder: "Введите VIN",
    },
  ],
  schema: gistorgiSchema,
  buildSubjectBody: (values) => ({ vin: pickString(values, "vin") }),
};
