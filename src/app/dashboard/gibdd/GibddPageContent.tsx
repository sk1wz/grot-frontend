"use client";

import { useEffect } from "react";
import { CheckFormById } from "@/features/checker";
import { CheckModule, getBatchChecks, getGibddChecks, useGibddBatchChecksStore, useGibddChecksStore } from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function GibddPageContent() {
  const { items, isLoading, isInitialized, setChecks } = useGibddChecksStore();
  const { batches, isLoading: isBatchesLoading, isInitialized: areBatchesInitialized, setBatches, setLoading: setBatchesLoading } = useGibddBatchChecksStore();

  useEffect(() => {
    void getGibddChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
    setBatchesLoading(true);
    void getBatchChecks("/checks/gibdd", CheckModule.GIBDD).then(setBatches).finally(() => setBatchesLoading(false));
  }, [setBatches, setBatchesLoading, setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/gibdd-figure.png">
      <CheckFormById configId="gibdd" />
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
