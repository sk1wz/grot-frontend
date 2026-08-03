import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { docIdSchema, fioDobSchema, innSchema, ipSchema } from "./schema";

export const fsspConfig: CheckConfig = {
  id: "fssp",
  title: "ФССП",
  endpoint: "/checks/fssp",
  includeModeInBody: true,
  modes: [
    {
      id: "fio_dob",
      label: "ФИО + дата рождения",
      fields: [
        {
          name: "fio",
          label: "ФИО",
          placeholder: "Фамилия Имя Отчество",
        },
        {
          name: "dob",
          label: "Дата рождения",
          placeholder: "дд.мм.гггг",
          type: "date",
        },
      ],
      schema: fioDobSchema,
      buildSubject: (values) => ({
        fio: pickString(values, "fio"),
        dob: pickString(values, "dob"),
      }),
    },
    {
      id: "inn",
      label: "ИНН",
      fields: [
        {
          name: "inn",
          label: "ИНН",
          placeholder: "ИНН (10 или 12 цифр)",
        },
      ],
      schema: innSchema,
      buildSubject: (values) => ({ inn: pickString(values, "inn") }),
    },
    {
      id: "ip",
      label: "Номер ИП",
      fields: [
        {
          name: "ip",
          label: "Номер ИП",
          placeholder: "12345/20/123456-ИП",
        },
      ],
      schema: ipSchema,
      buildSubject: (values) => ({ ip: pickString(values, "ip") }),
    },
    {
      id: "doc_id",
      label: "Номер ИЛ",
      fields: [
        {
          name: "doc_id",
          label: "Номер ИЛ",
          placeholder: "ФС-012345678",
        },
      ],
      schema: docIdSchema,
      buildSubject: (values) => ({ doc_id: pickString(values, "doc_id") }),
    },
  ],
};
