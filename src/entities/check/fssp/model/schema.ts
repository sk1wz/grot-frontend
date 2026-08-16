import { z } from "zod";
import { createCheckSchema } from "../../model/base-schema";
import { CheckModule } from "../../model/types";

const nullableText = z.union([z.string(), z.number()]).nullable().optional();

export const FsspSummarySchema = z.object({
  id: nullableText,
  date: nullableText,
  service: nullableText,
  initiationDate: nullableText,
  bailiffContacts: nullableText,
  enforcementSubject: nullableText,
  enforcementFee: nullableText,
  bailiffDepartment: nullableText,
  consolidatedProceedingNumber: nullableText,
  bailiff: nullableText,
  debtAmount: nullableText,
  enforcementProceedingNumber: nullableText,
  bailiffDepartmentAddress: nullableText,
  terminationReason: nullableText,
  debtor: nullableText,
  executiveDocumentDetails: nullableText,
});

export const FsspResultSchema = z.object({
  summary: FsspSummarySchema,
});
export const FsspCheckSchema = createCheckSchema(
  CheckModule.FSSP,
  FsspResultSchema
);
export type FsspResult = z.infer<typeof FsspResultSchema>;
export type FsspCheck = z.infer<typeof FsspCheckSchema>;
