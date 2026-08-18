import { z } from "zod";
import { createCheckSchema } from "../../model/base-schema";
import { CheckModule } from "../../model/types";

const TextValueSchema = z.union([z.string(), z.number()]).nullable().optional();

export const LimitationSchema = z.object({
  a_model: TextValueSchema,
  a_year: TextValueSchema,
  a_restriction_date: TextValueSchema,
  a_region: TextValueSchema,
  a_author_name: TextValueSchema,
  a_author_phone: TextValueSchema,
  a_restriction_type: TextValueSchema,
  a_description: TextValueSchema,
  a_gibdd_id: TextValueSchema,
});

export const LimitationResultSchema = z.object({
  vin: z.string(),
  limitations: z.array(LimitationSchema),
});

export const LimitationCheckSchema = createCheckSchema(
  CheckModule.LIMITATION,
  LimitationResultSchema
);

export type LimitationResult = z.infer<typeof LimitationResultSchema>;
export type LimitationCheck = z.infer<typeof LimitationCheckSchema>;
