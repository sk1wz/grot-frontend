import { z } from "zod";
import type { FieldValues } from "./types";

const dobRegex = /^\d{2}\.\d{2}\.\d{4}$/;

export const fioSchema = z.object({
  fio: z.string().trim().min(3, "Укажите ФИО"),
});

export const fioDobSchema = z.object({
  fio: z.string().trim().min(3, "Укажите ФИО"),
  dob: z
    .string()
    .trim()
    .regex(dobRegex, "Дата в формате ДД.ММ.ГГГГ"),
});

export const innSchema = z.object({
  inn: z
    .string()
    .trim()
    .regex(/^\d{10}$|^\d{12}$/, "ИНН: 10 или 12 цифр"),
});

export const vinSchema = z.object({
  vin: z
    .string()
    .trim()
    .min(17, "VIN: 17 символов")
    .max(17, "VIN: 17 символов"),
});

export const gibddSchema = vinSchema.extend({
  osago: z.boolean().optional(),
});

export const ipSchema = z.object({
  ip: z.string().trim().min(3, "Укажите номер ИП"),
});

export const docIdSchema = z.object({
  doc_id: z.string().trim().min(3, "Укажите номер исполнительного листа"),
});

export const innPassportSchema = z.object({
  fio: z.string().trim().min(3, "Укажите ФИО"),
  dob: z
    .string()
    .trim()
    .regex(dobRegex, "Дата в формате ДД.ММ.ГГГГ"),
  passport: z.string().trim().min(5, "Укажите паспорт"),
});

export const innTextSchema = z.object({
  text: z.string().trim().min(10, "Укажите данные для поиска"),
});

export function pickString(values: FieldValues, key: string): string {
  const value = values[key];
  return typeof value === "string" ? value.trim() : "";
}
