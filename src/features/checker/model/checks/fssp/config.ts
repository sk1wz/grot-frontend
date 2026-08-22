import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { docIdSchema, fioDobSchema, innSchema, ipSchema } from "./schema";

export const fsspConfig: CheckConfig = {
  id: "fssp",
  title: "ФССП",
  endpoint: "/checks/fssp",
  batchEndpoint: "/checks/fssp/batch",
  templateUrl: "/templates/fssp.xlsx",
  modes: [
    {
      id: "for_fio_dob",
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
      buildSubjectBody: (values) => ({
        fio: pickString(values, "fio"),
        dob: pickString(values, "dob"),
      }),
    },
    {
      id: "for_inn",
      label: "ИНН",
      fields: [
        {
          name: "inn",
          label: "ИНН",
          placeholder: "ИНН (10 или 12 цифр)",
        },
      ],
      schema: innSchema,
      buildSubjectBody: (values) => ({ inn: pickString(values, "inn") }),
    },
    {
      id: "for_ip",
      label: "Номер ИП",
      fields: [
        {
          name: "ip",
          label: "Номер ИП",
          placeholder: "12345/20/123456-ИП",
        },
      ],
      schema: ipSchema,
      buildSubjectBody: (values) => ({ ip: pickString(values, "ip") }),
    },
    {
      id: "for_doc_id",
      label: "Номер ИЛ",
      fields: [
        {
          name: "doc_id",
          label: "Номер ИЛ",
          placeholder: "ФС-012345678",
        },
      ],
      schema: docIdSchema,
      buildSubjectBody: (values) => ({ doc_id: pickString(values, "doc_id") }),
    },
  ],
};
