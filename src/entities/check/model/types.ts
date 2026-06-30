export type CheckStatus = "queued" | "processing" | "done" | "failed";

export type StartCheckResponse = {
  id: string;
  status: CheckStatus;
  client_reference?: string;
};
