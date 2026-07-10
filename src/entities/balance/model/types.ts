import z from "zod";

export enum BalanceChangeReason {
  BALANCE_PURCHASE = "BALANCE_PURCHASE",
  BALANCE_REFUND = "BALANCE_REFUND",
  BALANCE_TOPUP = "BALANCE_TOPUP",
  BALANCE_FAILED = "BALANCE_FAILED",
}

const BalanceTransactionInputSchema = z.object({
  id: z.uuid().optional(),
  userId: z.uuid().optional(),
  amount: z.number(),
  status: z.enum(BalanceChangeReason).optional(),
  meta: z
    .object({
      action: z.string().optional(),
    })
    .passthrough()
    .optional(),
  createdAt: z.string(),
});

export const BalanceTransactionSchema = BalanceTransactionInputSchema.transform(
  (transaction) => ({
    ...transaction,
    status: transaction.status as BalanceChangeReason,
  })
);

export const BalanceTransactionsResponseSchema = z.object({
  items: z.array(BalanceTransactionSchema),
  total: z.number().optional(),
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
  setTransaction: (transaction: BalanceTransaction) => void;
  setLoading: (isLoading: boolean) => void;
};
