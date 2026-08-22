"use client";

import { useEffect } from "react";
import { CheckFormById } from "@/features/checker";
import {
  getBankruptcyChecks,
  CheckModule,
  getBatchChecks,
  useBankruptcyBatchChecksStore,
  useBankruptcyChecksStore,
} from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function BankruptcyPageContent() {
  const { items, isLoading, isInitialized, setChecks } =
    useBankruptcyChecksStore();
  const { batches, isLoading: isBatchesLoading, isInitialized: areBatchesInitialized, setBatches, setLoading: setBatchesLoading } = useBankruptcyBatchChecksStore();

  useEffect(() => {
    void getBankruptcyChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
    setBatchesLoading(true);
    void getBatchChecks("/checks/bankruptcy", CheckModule.BANKRUPTCY).then(setBatches).finally(() => setBatchesLoading(false));
  }, [setBatches, setBatchesLoading, setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/bank-figure.png">
      <CheckFormById configId="bankruptcy" />
      <ChecksHistory
        items={items}
        batches={batches}
        isLoading={isLoading}
        isInitialized={isInitialized}
        isBatchesLoading={isBatchesLoading}
        areBatchesInitialized={areBatchesInitialized}
      />
    </DashboardPageFrame>
  );
}
