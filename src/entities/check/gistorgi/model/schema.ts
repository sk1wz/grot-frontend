import { z } from "zod";
import { createCheckSchema } from "../../model/base-schema";
import { CheckModule } from "../../model/types";

const text = z.union([z.string(), z.number()]).nullable().optional();
export const GistorgiResultSchema = z.object({
  summary: z.object({ vin: text }),
  lots: z.array(
    z.object({
      lot_name: text,
      lot_link: text,
      lot_date: text,
      lot_status: text,
    })
  ),
});
export const GistorgiCheckSchema = createCheckSchema(
  CheckModule.GISTORGI,
  GistorgiResultSchema
);
export type GistorgiResult = z.infer<typeof GistorgiResultSchema>;
export type GistorgiCheck = z.infer<typeof GistorgiCheckSchema>;
