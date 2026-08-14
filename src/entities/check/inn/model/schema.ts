import { z } from "zod";
import { createCheckSchema } from "../../model/base-schema";
import { CheckModule } from "../../model/types";

const text = z.union([z.string(), z.number()]).nullable().optional();
export const InnResultSchema = z.object({
  summary: z.object({
    inn: text,
    full_name: text,
    birth_date: text,
    passport_number: text,
  }),
});
export const InnCheckSchema = createCheckSchema(
  CheckModule.INN,
  InnResultSchema
);
export type InnResult = z.infer<typeof InnResultSchema>;
export type InnCheck = z.infer<typeof InnCheckSchema>;
