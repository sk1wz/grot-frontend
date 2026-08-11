import { z } from "zod";

const TextValueSchema = z.union([z.string(), z.number()]).nullable().optional();

export const GistorgiResultSchema = z.object({
  autosintes_summary: z.object({
    autosintes_vin: TextValueSchema,
  }),
  autosintes_lots: z.array(
    z.object({
      autosintes_lot_name: TextValueSchema,
      autosintes_lot_link: TextValueSchema,
      autosintes_lot_date: TextValueSchema,
      autosintes_lot_status: TextValueSchema,
    })
  ),
});

export type GistorgiResult = z.infer<typeof GistorgiResultSchema>;
