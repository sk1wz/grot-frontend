import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { gibddSchema } from "./schema";

export const gibddConfig: CheckConfig = {
  id: "gibdd",
  title: "Транспорт",
  endpoint: "/checks/gibdd",
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
  buildBody: (values) => {
    const subject: Record<string, unknown> = {
      vin: pickString(values, "vin"),
    };

    if (values.osago === true) {
      subject.osago = true;
    }

    return subject;
  },
};
