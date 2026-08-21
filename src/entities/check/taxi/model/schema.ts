import { z } from "zod";
import { createCheckSchema } from "../../model/base-schema";
import { CheckModule } from "../../model/types";

const TextValueSchema = z.union([z.string(), z.number()]).nullable().optional();

export const TaxiRecordSchema = z.object({
  year: TextValueSchema,
  brand: TextValueSchema,
  model: TextValueSchema,
  region: TextValueSchema,
  vin: TextValueSchema,
  record_date: TextValueSchema,
  record_number: TextValueSchema,
  registration_number: TextValueSchema,
  record_status: TextValueSchema,
  carrier_inn: TextValueSchema,
  exclusion_date: TextValueSchema,
  lifting_device: TextValueSchema,
  registry_entry_date: TextValueSchema,
  carrier_name: TextValueSchema,
});

export const TaxiResultSchema = z.object({
  vin: TextValueSchema,
  records: z.array(TaxiRecordSchema),
});
export const TaxiCheckSchema = createCheckSchema(
  CheckModule.TAXI,
  TaxiResultSchema
);
export type TaxiResult = z.infer<typeof TaxiResultSchema>;
export type TaxiCheck = z.infer<typeof TaxiCheckSchema>;
