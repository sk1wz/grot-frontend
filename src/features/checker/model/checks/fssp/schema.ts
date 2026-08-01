import { z } from "zod";

const dobRegex = /^\d{2}\.\d{2}\.\d{4}$/;

export const fioDobSchema = z.object({
  fio: z.string().trim().min(3, "Укажите ФИО"),
  dob: z.string().trim().regex(dobRegex, "Дата в формате ДД.ММ.ГГГГ"),
});

export const innSchema = z.object({
  inn: z.string().trim().regex(/^\d{10}$|^\d{12}$/, "ИНН: 10 или 12 цифр"),
});

export const ipSchema = z.object({
  ip: z.string().trim().min(3, "Укажите номер ИП"),
});

export const docIdSchema = z.object({
  doc_id: z.string().trim().min(3, "Укажите номер исполнительного листа"),
});
