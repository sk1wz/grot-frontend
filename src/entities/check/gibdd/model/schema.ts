import { z } from "zod";
import { createCheckSchema } from "../../model/base-schema";
import { CheckModule } from "../../model/types";

const text = z.union([z.string(), z.number()]).nullable().optional();
export const GibddFineSchema = z.object({
  uin: text,
  date: text,
  time: text,
  address: text,
  amount: text,
  status: text,
  article: text,
  reason: text,
  issuer: text,
});
export const GibddOwnerSchema = z.object({ from: text, to: text, type: text });
export const GibddAccidentSchema = z.object({
  year: text,
  accident_type: text,
  date: text,
  time: text,
  city: text,
  brand: text,
  model: text,
  region: text,
  status: text,
  damages: text,
});
export const GibddSummarySchema = z.object({
  VIN: text,
  year: text,
  N_PTS: text,
  N_STS: text,
  color: text,
  model: text,
  date_PTS: text,
  date_STS: text,
  in_rozisk: text,
  reg_number: text,
  engine_volume_cc: text,
  engine_power_hp: text,
  engine_number: text,
  pledges_count: text,
  restrictions_count: text,
  total_fine: text,
  osago_seria: text,
  osago_number: text,
  osago_contract_status: text,
  osago_usage_period: text,
  osago_straxovka: text,
  osago_extended_rb: text,
});
const AutosintesGibddFineSchema = z.object({
  uin: text,
  date: text,
  time: text,
  address: text,
  amount: text,
  status: text,
  article: text,
  reason: text,
  issuer: text,
});
const AutosintesGibddOwnerSchema = z.object({
  from: text,
  to: text,
  type: text,
});
const AutosintesGibddAccidentSchema = z.object({
  year: text,
  accident_type: text,
  date: text,
  time: text,
  city: text,
  brand: text,
  model: text,
  region: text,
  status: text,
  damages: text,
});
const AutosintesGibddSummarySchema = z.object({
  VIN: text,
  year: text,
  N_PTS: text,
  N_STS: text,
  color: text,
  model: text,
  date_PTS: text,
  date_STS: text,
  in_rozisk: text,
  reg_number: text,
  engine_volume_cc: text,
  engine_power_hp: text,
  engine_number: text,
  pledges_count: text,
  restrictions_count: text,
  total_fine: text,
  osago_seria: text,
  osago_number: text,
  osago_contract_status: text,
  osago_usage_period: text,
  osago_straxovka: text,
  osago_extended_rb: text,
});
export const GibddResultSchema = z.object({
  fines: z.array(AutosintesGibddFineSchema),
  owners: z.array(AutosintesGibddOwnerSchema),
  summary: AutosintesGibddSummarySchema,
  accidents: z.array(AutosintesGibddAccidentSchema),
});
export const GibddCheckSchema = createCheckSchema(
  CheckModule.GIBDD,
  GibddResultSchema
);
export type GibddResult = z.infer<typeof GibddResultSchema>;
export type GibddCheck = z.infer<typeof GibddCheckSchema>;
