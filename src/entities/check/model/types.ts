import z from "zod";

export enum CheckModule {
  GIBDD = "GIBDD",
  GISTORGI = "GISTORGI",
  FSSP = "FSSP",
  BANKRUPTCY = "BANKRUPTCY",
  INN = "INN",
}

export enum CheckStatus {
  PENDING = "PENDING",
  QUEUED = "QUEUED",
  RUNNING = "RUNNING",
  DONE = "DONE",
  FAILED = "FAILED",
}

export type LegacyCheckStatus = "queued" | "processing" | "done" | "failed";

export type StartCheckResponse = {
  id: string;
  status: LegacyCheckStatus;
  client_reference?: string;
};

export const CheckSchema = z.object({
  id: z.uuid(),
  module: z.nativeEnum(CheckModule),
  status: z.nativeEnum(CheckStatus),
  subject: z.unknown(),
  cost: z.number(),
  result: z.unknown().nullable().optional(),
  error: z.unknown().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  completedAt: z.string().nullable().optional(),
});

export const ChecksResponseSchema = z.array(CheckSchema);

export type Check = z.infer<typeof CheckSchema>;

export type ChecksStore = {
  items: Check[];
  isLoading: boolean;
  isInitialized: boolean;
  setChecks: (items: Check[]) => void;
  upsertCheck: (check: Check) => void;
  setLoading: (isLoading: boolean) => void;
  setInitialized: (isInitialized: boolean) => void;
  reset: () => void;
};
