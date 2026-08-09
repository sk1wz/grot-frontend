import { z } from "zod";
import { CheckModule, CheckStatus } from "./types";

/** Object-схема: известные поля валидируются, лишние сохраняются и не ломают парсинг. */
function schemaObject<T extends z.ZodRawShape>(shape: T) {
  return z.looseObject(shape);
}

const checkBaseSchema = schemaObject({
  id: z.uuid(),
  status: z.nativeEnum(CheckStatus),
  cost: z.number(),
  error: z.unknown().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  completedAt: z.string().nullable().optional(),
});

/*
 * Реальные схемы результатов
 * Спарсятся в нужные схемы, лишние поля сохранятся и не сломают парсинг.
 */
export const gibddResultSchema = z.unknown();
export const gisTorgiResultSchema = z.unknown();
export const fsspResultSchema = z.unknown();
export const bankruptcyResultSchema = z.unknown();
export const innResultSchema = z.unknown();

function createCheckSchema<
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

export const checkSchemasByModule = {
  [CheckModule.GIBDD]: createCheckSchema(CheckModule.GIBDD, gibddResultSchema),
  [CheckModule.GISTORGI]: createCheckSchema(
    CheckModule.GISTORGI,
    gisTorgiResultSchema
  ),
  [CheckModule.FSSP]: createCheckSchema(CheckModule.FSSP, fsspResultSchema),
  [CheckModule.BANKRUPTCY]: createCheckSchema(
    CheckModule.BANKRUPTCY,
    bankruptcyResultSchema
  ),
  [CheckModule.INN]: createCheckSchema(CheckModule.INN, innResultSchema),
} as const;

export const CheckSchema = z.discriminatedUnion("module", [
  checkSchemasByModule[CheckModule.GIBDD],
  checkSchemasByModule[CheckModule.GISTORGI],
  checkSchemasByModule[CheckModule.FSSP],
  checkSchemasByModule[CheckModule.BANKRUPTCY],
  checkSchemasByModule[CheckModule.INN],
]);

export const ChecksResponseSchema = z.array(CheckSchema);

export type Check = z.infer<typeof CheckSchema>;

export type CheckByModule<TModule extends CheckModule> = Extract<
  Check,
  { module: TModule }
>;

export function isCheckModule<TModule extends CheckModule>(
  module: TModule
): (check: Check) => check is CheckByModule<TModule> {
  return (check): check is CheckByModule<TModule> => check.module === module;
}
