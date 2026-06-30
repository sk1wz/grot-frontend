import z from "zod";

export enum BalanceChangeReason {
  BALANCE_PURCHASE = "BALANCE_PURCHASE",
  BALANCE_REFUND = "BALANCE_REFUND",
  BALANCE_TOPUP = "BALANCE_TOPUP",
  BALANCE_FAILED = "BALANCE_FAILED",
}

export const BalanceTransactionSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  amount: z.number(),
  reason: z.enum(BalanceChangeReason),
  meta: z
    .object({
      action: z.string().optional(),
    })
    .passthrough()
    .optional(),
  createdAt: z.string(),
});

export const BalanceTransactionsResponseSchema = z.object({
  items: z.array(BalanceTransactionSchema),
  total: z.number(),
});

export type BalanceTransaction = z.infer<typeof BalanceTransactionSchema>;
export type BalanceTransactionsResponse = z.infer<
  typeof BalanceTransactionsResponseSchema
>;

export type BalanceTransactionsStore = {
  items: BalanceTransaction[];
  total: number;
  isLoading: boolean;
  setTransactions: (items: BalanceTransactionsResponse) => void;
  setLoading: (isLoading: boolean) => void;
};
