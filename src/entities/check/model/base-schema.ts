import { z } from "zod";
import { CheckModule, CheckStatus } from "./types";

const checkBaseSchema = z.looseObject({
  id: z.uuid(),
  status: z.nativeEnum(CheckStatus),
  cost: z.number(),
  error: z.unknown().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  completedAt: z.string().nullable().optional(),
});

export const batchCheckBaseSchema = z.looseObject({
  id: z.uuid(),
  status: z.nativeEnum(CheckStatus),
  totalItems: z.number(),
  successfulItems: z.number(),
  failedItems: z.number(),
  currentChunk: z.number(),
  cost: z.number(),
  subjectBodyText: z.string(),
  createdAt: z.string(),
  completedAt: z.string().nullable().optional(),
});

export const BatchCheckSchema = z.discriminatedUnion("module", [
  batchCheckBaseSchema.extend({ module: z.literal(CheckModule.GIBDD) }),
  batchCheckBaseSchema.extend({ module: z.literal(CheckModule.GISTORGI) }),
  batchCheckBaseSchema.extend({ module: z.literal(CheckModule.LIMITATION) }),
  batchCheckBaseSchema.extend({ module: z.literal(CheckModule.FSSP) }),
  batchCheckBaseSchema.extend({ module: z.literal(CheckModule.BANKRUPTCY) }),
  batchCheckBaseSchema.extend({ module: z.literal(CheckModule.INN) }),
  batchCheckBaseSchema.extend({ module: z.literal(CheckModule.TAXI) }),
]);

export type BatchCheck = z.infer<typeof BatchCheckSchema>;
export type BatchCheckByModule<TModule extends CheckModule> = Extract<
  BatchCheck,
  { module: TModule }
>;

export function createCheckSchema<
  TModule extends CheckModule,
  TResult extends z.ZodType
>(module: TModule, result: TResult) {
  return checkBaseSchema
    .extend({
      module: z.literal(module),
      subjectBody: z.record(z.string(), z.unknown()),
      subjectBodyText: z.string(),
      result: result.nullable().optional(),
    })
    .loose();
}
