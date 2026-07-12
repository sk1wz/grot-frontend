import type { CheckConfig } from "../types";
import { gibddSchema, pickString } from "../schemas";

export const gibddConfig: CheckConfig = {
  id: "gibdd",
  title: "Транспорт",
  description: "Проверка транспорта по VIN",
  endpoint: "/checks/gibdd",
  price: 50,
  eta: "1–3 мин",
  fields: [
    {
      name: "vin",
      label: "VIN",
      placeholder: "VIN",
    },
    {
      name: "osago",
      label: "Запрашивать ОСАГО (+1–2 мин)",
      type: "checkbox",
    },
  ],
  schema: gibddSchema,
  buildSubject: (values) => {
    const subject: Record<string, unknown> = {
      vin: pickString(values, "vin"),
    };
    if (values.osago === true) {
      subject.osago = true;
    }
    return subject;
  },
};
