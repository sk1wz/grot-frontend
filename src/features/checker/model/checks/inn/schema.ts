import { z } from "zod";

const dobRegex = /^\d{2}\.\d{2}\.\d{4}$/;

export const innPassportSchema = z.object({
  fio: z.string().trim().min(3, "Укажите ФИО"),
  dob: z.string().trim().regex(dobRegex, "Дата в формате ДД.ММ.ГГГГ"),
  passport: z.string().trim().min(5, "Укажите паспорт"),
});

export const innTextSchema = z.object({
  text: z.string().trim().min(10, "Укажите данные для поиска"),
});
