import { z } from "zod";
import { GibddResultSchema } from "./gibdd-result/schema";
import { InnResultSchema } from "./inn-result/schema";
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
const textOrNumberSchema = z.union([z.string(), z.number()]).nullable();

const gibddFineSchema = z
  .object({
    автосинтез_УИН: z.string().nullable(),
    автосинтез_Дата: z.string().nullable(),
    автосинтез_Время: z.string().nullable(),
    автосинтез_Адрес: z.string().nullable(),
    автосинтез_Сумма: textOrNumberSchema,
    автосинтез_Статус: z.string().nullable(),
    автосинтез_Статья: z.string().nullable(),
    автосинтез_Основание: z.string().nullable(),
    "автосинтез*Кем*выписан": z.string().nullable(),
  })
  .partial()
  .passthrough();

const gibddOwnerSchema = z
  .object({
    автосинтез_from: z.string().nullable(),
    автосинтез_to: z.string().nullable(),
    автосинтез_type: z.string().nullable(),
  })
  .partial()
  .passthrough();

const gibddAccidentSchema = z
  .object({
    автосинтез_Год: textOrNumberSchema,
    автосинтез_Тип: z.string().nullable(),
    автосинтез_Дата: z.string().nullable(),
    автосинтез_Время: z.string().nullable(),
    автосинтез_Город: z.string().nullable(),
    автосинтез_Марка: z.string().nullable(),
    автосинтез_Модель: z.string().nullable(),
    автосинтез_Регион: z.string().nullable(),
    автосинтез_Состояние: z.string().nullable(),
    автосинтез_Повреждения: z.string().nullable(),
  })
  .partial()
  .passthrough();

const gibddSummarySchema = z
  .object({
    автосинтез_VIN: z.string().nullable(),
    автосинтез_Год: textOrNumberSchema,
    автосинтез_Цвет: z.string().nullable(),
    автосинтез_Модель: z.string().nullable(),
    "автосинтез*В*розыске": z.string().nullable(),
    "автосинтез*Кол*во_ДТП": textOrNumberSchema,
    "автосинтез*Рег*номер": z.string().nullable(),
    "автосинтез*Сумма*штрафов": textOrNumberSchema,
    "автосинтез*Кол*во_залогов": textOrNumberSchema,
    "автосинтез*Кол*во_штрафов": textOrNumberSchema,
    "автосинтез*Кол*во_владельцев": textOrNumberSchema,
    "автосинтез*Кол*во_ограничений": textOrNumberSchema,
  })
  .partial()
  .passthrough();

export const gibddResultSchema = z
  .object({
    автосинтез_summary: gibddSummarySchema,
    автосинтез_fines: z.array(gibddFineSchema),
    автосинтез_owners: z.array(gibddOwnerSchema),
    автосинтез_accidents: z.array(gibddAccidentSchema),
  })
  .partial()
  .passthrough();
export const gisTorgiResultSchema = z.unknown();
export const fsspResultSchema = z.unknown();
export const bankruptcyResultSchema = z.unknown();

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
  [CheckModule.GIBDD]: createCheckSchema(CheckModule.GIBDD, GibddResultSchema),
  [CheckModule.GISTORGI]: createCheckSchema(
    CheckModule.GISTORGI,
    gisTorgiResultSchema
  ),
  [CheckModule.FSSP]: createCheckSchema(CheckModule.FSSP, fsspResultSchema),
  [CheckModule.BANKRUPTCY]: createCheckSchema(
    CheckModule.BANKRUPTCY,
    bankruptcyResultSchema
  ),
  [CheckModule.INN]: createCheckSchema(CheckModule.INN, InnResultSchema),
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
