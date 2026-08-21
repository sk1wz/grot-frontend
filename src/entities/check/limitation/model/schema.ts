import { z } from "zod";
import { createCheckSchema } from "../../model/base-schema";
import { CheckModule } from "../../model/types";

const TextValueSchema = z.union([z.string(), z.number()]).nullable().optional();

export const LimitationSchema = z.object({
  model: TextValueSchema,
  year: TextValueSchema,
  restriction_date: TextValueSchema,
  region: TextValueSchema,
  restriction_type: TextValueSchema,
  description: TextValueSchema,
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
