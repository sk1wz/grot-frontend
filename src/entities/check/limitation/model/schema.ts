import { z } from "zod";
import { createCheckSchema } from "../../model/base-schema";
import { CheckModule } from "../../model/types";

const text = z.union([z.string(), z.number()]).nullable().optional();

export const LimitationResultSchema = z.object({
  summary: z.object({ vin: text }),
  lots: z.array(
    z.object({
      lot_name: text,
      lot_link: text,
      lot_date: text,
      lot_status: text,
    }),
  ),
});

export const LimitationCheckSchema = createCheckSchema(
  CheckModule.LIMITATION,
  LimitationResultSchema
);

export type LimitationResult = z.infer<typeof LimitationResultSchema>;
export type LimitationCheck = z.infer<typeof LimitationCheckSchema>;
