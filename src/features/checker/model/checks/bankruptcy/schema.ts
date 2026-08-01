import { z } from "zod";

export const innSchema = z.object({
  inn: z.string().trim().regex(/^\d{10}$|^\d{12}$/, "ИНН: 10 или 12 цифр"),
});

export const fioSchema = z.object({
  fio: z.string().trim().min(3, "Укажите ФИО"),
});
