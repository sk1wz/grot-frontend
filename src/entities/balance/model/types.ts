import z from "zod";

export enum BalanceTransactionStatus {
  BALANCE_PURCHASE = "BALANCE_PURCHASE",
  BALANCE_REFUND = "BALANCE_REFUND",
  BALANCE_TOPUP = "BALANCE_TOPUP",
  BALANCE_FAILED = "BALANCE_FAILED",
}

const BalanceTransactionSchema = z.object({
  id: z.uuid(),
  userId: z.uuid().optional(),
  amount: z.coerce.number(),
  status: z.enum(BalanceTransactionStatus),
  meta: z
    .object({
      action: z.string().optional(),
    })
    .passthrough()
    .optional(),
  createdAt: z.string(),
});

export const BalanceTransaction = BalanceTransactionSchema.transform(
  (transaction) => ({
    ...transaction,
    status: transaction.status ?? BalanceTransactionStatus.BALANCE_FAILED,
  })
);

export const BalanceTransactionsResponseSchema = z.object({
  items: z.array(BalanceTransactionSchema),
  total: z.number().optional(),
});

export type BalanceTransactionType = z.infer<typeof BalanceTransactionSchema>;
export type BalanceTransactionsResponse = z.infer<
  typeof BalanceTransactionsResponseSchema
>;

export type BalanceTransactionsStore = {
  items: BalanceTransactionType[];
  total: number;
  isLoading: boolean;
  isInitialized: boolean;
  setTransactions: (items: BalanceTransactionsResponse) => void;
  setTransaction: (transaction: BalanceTransactionType) => void;
  setLoading: (isLoading: boolean) => void;
  setInitialized: (isInitialized: boolean) => void;
};
